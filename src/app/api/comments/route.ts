import { getClient } from "@/database/dbClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

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
  const postId = url.searchParams.get("postId");

  try {
    const data = await request.json();

    if (!data.nickname || !data.content) {
      return new Response(
        JSON.stringify({
          error: "필수 필드가 누락되었습니다: 닉네임 또는 내용",
        }),
        { status: 400 },
      );
    }

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
      nickname: data.nickname,
      content: data.content,
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
