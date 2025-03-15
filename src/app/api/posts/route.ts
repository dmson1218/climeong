import { MongoClient, ServerApiVersion } from "mongodb";

export interface Post {
    _id: string;
    title: string;
    content: string;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI가 정의되지 않았습니다.");
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const count = Number(url.searchParams.get("count") || 10);
    // const page = Number(url.searchParams.get("page") || 1);
    // const skip = (page - 1) * count;

    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collectionName = process.env.COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("COLLECTION_NAME이 정의되지 않았습니다.");
        }
        const collection = db.collection(collectionName);

        const posts = await collection
            .find()
            .sort({ createdAt: -1 })
            // .skip(skip)
            .limit(count)
            .toArray();

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "게시물을 가져오는 데 실패했습니다." }), {
            status: 500,
        });
    } finally {
        await client.close();
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.title || !data.content) {
            return new Response(
                JSON.stringify({ error: "필수 필드가 누락되었습니다: 제목 또는 내용" }),
                { status: 400 }
            );
        }

        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collectionName = process.env.COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("COLLECTION_NAME이 정의되지 않았습니다.");
        }
        const collection = db.collection(collectionName);

        const newPost = {
            title: data.title,
            content: data.content,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(newPost);

        return new Response(
            JSON.stringify({
                message: "게시물이 성공적으로 생성되었습니다.",
                postId: result.insertedId,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "게시물 생성에 실패했습니다." }), {
            status: 500,
        });
    } finally {
        await client.close();
    }
}
