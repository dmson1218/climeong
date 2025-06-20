import { getClient } from "@/database/dbClient";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const id = request.url.split("/").pop();
  if (!id) {
    return new Response(JSON.stringify({ error: "게시물 ID가 필요합니다." }), {
      status: 400,
    });
  }

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collectionName = process.env.COMMUNITY_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("COLLECTION_NAME이 정의되지 않았습니다.");
    }
    const collection = db.collection(collectionName);

    const post = await collection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { title: 1, content: 1, createdAt: 1 } },
    );

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "게시물을 가져오는 데 실패했습니다." }),
      {
        status: 500,
      },
    );
  }
}
