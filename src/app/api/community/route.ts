import { getClient } from "@/database/dbClient";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const count = Number(url.searchParams.get("count") || 10);

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collectionName = process.env.COMMUNITY_COLLECTION_NAME;
    if (!collectionName) {
      throw new Error("COLLECTION_NAME이 정의되지 않았습니다.");
    }
    const collection = db.collection(collectionName);

    const postList = await collection
      .find({}, { projection: { title: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(count)
      .toArray();

    return new Response(JSON.stringify(postList), { status: 200 });
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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.content) {
      return new Response(
        JSON.stringify({ error: "필수 필드가 누락되었습니다: 제목 또는 내용" }),
        { status: 400 },
      );
    }

    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collectionName = process.env.COMMUNITY_COLLECTION_NAME;
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
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "게시물 생성에 실패했습니다." }),
      {
        status: 500,
      },
    );
  }
}
