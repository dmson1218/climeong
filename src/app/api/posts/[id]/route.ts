import { getClient } from "@/database/dbClient";
import { ObjectId } from "mongodb";

const COLLECTION_MAP: Record<string, string | undefined> = {
  news: process.env.NEWS_COLLECTION_NAME,
  community: process.env.COMMUNITY_COLLECTION_NAME,
  crew: process.env.CREW_COLLECTION_NAME,
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postType = url.searchParams.get("postType") || "news";
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response(JSON.stringify({ error: "게시물 ID가 필요합니다." }), {
      status: 400,
    });
  }

  const collectionName = COLLECTION_MAP[postType];
  if (!collectionName) {
    return new Response(
      JSON.stringify({ error: "유효하지 않은 게시물 타입입니다." }),
      { status: 400 },
    );
  }

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const post = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { title: 1, content: 1, createdAt: 1 } },
    );

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "게시물을 가져오는 데 실패했습니다." }),
      { status: 500 },
    );
  }
}
