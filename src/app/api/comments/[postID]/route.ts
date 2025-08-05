import { getClient } from "@/database/dbClient";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return new Response(JSON.stringify({ error: "게시물 ID가 필요합니다." }), {
      status: 400,
    });
  }

  const collectionName = process.env.COMMENT_COLLECTION_NAME;
  if (!collectionName) {
    return new Response(
      JSON.stringify({ error: "유효하지 않은 댓글 컬렉션입니다." }),
      { status: 400 },
    );
  }

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const comments = await collection
      .find(
        { postId: new ObjectId(postId) },
        { projection: { nickname: 1, content: 1, createdAt: 1 } },
      )
      .toArray();

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "댓글을 가져오는 데 실패했습니다." }),
      { status: 500 },
    );
  }
}
