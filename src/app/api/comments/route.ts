import { getClient } from "@/database/dbClient";
import { NextResponse } from "next/server";
import { z } from "zod";

const CommentBodySchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
});

const QuerySchema = z.object({
  postId: z.string().optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);

  const result = QuerySchema.safeParse({
    postId: url.searchParams.get("postId") || undefined,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: "잘못된 요청입니다.", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { postId } = result.data;

  const collectionName = process.env.COMMENT_COLLECTION_NAME;
  if (!collectionName) {
    return NextResponse.json(
      { error: "유효하지 않은 댓글 컬렉션입니다." },
      { status: 400 },
    );
  }

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const query: Record<string, unknown> = {};
    if (postId) {
      query.postId = postId;
    }

    const comments = await collection
      .find(query, {
        projection: { postId: 1, nickname: 1, content: 1, createdAt: 1 },
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "댓글을 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const rawPostId = url.searchParams.get("postId");

  const queryResult = QuerySchema.safeParse({ postId: rawPostId });
  if (!queryResult.success || !queryResult.data.postId) {
    return NextResponse.json(
      { error: "유효하지 않은 Post ID입니다." },
      { status: 400 },
    );
  }
  const postId = queryResult.data.postId;

  try {
    const body = await request.json();

    const validation = CommentBodySchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          error: "입력값이 올바르지 않습니다.",
          details: validation.error.flatten(),
        }),
        { status: 400 },
      );
    }

    const { nickname, content } = validation.data;

    const collectionName = process.env.COMMENT_COLLECTION_NAME;
    if (!collectionName) {
      return new Response(
        JSON.stringify({ error: "유효하지 않은 댓글 컬렉션입니다." }),
        { status: 400 },
      );
    }

    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const newComment = {
      postId,
      nickname,
      content,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newComment);

    return new Response(
      JSON.stringify({
        message: "댓글이 성공적으로 생성되었습니다.",
        commentId: result.insertedId,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "댓글 생성에 실패했습니다." }),
      { status: 500 },
    );
  }
}
