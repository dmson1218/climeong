import { ObjectId } from "mongodb";
import { getClient } from "@/database/dbClient";

export async function GET(request: Request) {
    const id = request.url.split("/").pop();
    if (!id) {
        return new Response(JSON.stringify({ error: "최신 소식 ID가 필요합니다." }), {
            status: 400,
        });
    }

    try {
        const client = await getClient();
        const db = client.db(process.env.DB_NAME);
        const collectionName = process.env.COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("COLLECTION_NAME이 정의되지 않았습니다.");
        }
        const collection = db.collection(collectionName);

        const news = await collection.findOne(
            {
                _id: new ObjectId(id),
            },
            { projection: { title: 1, content: 1, createdAt: 1 } }
        );

        return new Response(JSON.stringify(news), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "최신 소식을 가져오는 데 실패했습니다." }), {
            status: 500,
        });
    }
}
