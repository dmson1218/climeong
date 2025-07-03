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
  const limit = Number(url.searchParams.get("limit") || 10);
  const afterId = url.searchParams.get("afterId");

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

    const query = afterId ? { _id: { $lt: new ObjectId(afterId) } } : {};

    const posts = await collection
      .find(query, { projection: { title: 1, content: 1, createdAt: 1 } })
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "게시물을 가져오는 데 실패했습니다." }),
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const postType = url.searchParams.get("postType") || "news";

  try {
    const data = await request.json();

    if (!data.title || !data.content) {
      return new Response(
        JSON.stringify({ error: "필수 필드가 누락되었습니다: 제목 또는 내용" }),
        { status: 400 },
      );
    }

    const collectionName = COLLECTION_MAP[postType];
    if (!collectionName) {
      return new Response(
        JSON.stringify({ error: "유효하지 않은 게시물 타입입니다." }),
        { status: 400 },
      );
    }

    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
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
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "게시물 생성에 실패했습니다." }),
      { status: 500 },
    );
  }
}
