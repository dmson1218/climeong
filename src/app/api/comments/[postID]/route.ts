import { getClient } from "@/database/dbClient";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  postId: z.string(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawPostId = url.searchParams.get("postId");

  const result = QuerySchema.safeParse({ postId: rawPostId });

  if (!result.success) {
    return NextResponse.json(
      {
        error: "게시물 ID가 유효하지 않습니다.",
        details: result.error.flatten(),
      },
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

    const comments = await collection
      .find(
        { postId: postId },
        { projection: { nickname: 1, content: 1, createdAt: 1 } },
      )
      .toArray();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "댓글을 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}
