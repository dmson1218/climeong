import { getClient } from "@/database/dbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

const PostBodySchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
});

const QuerySchema = z.object({
  postType: z.enum(["news", "community", "crew"]).optional().default("news"),
  limit: z.coerce.number().min(1).max(50).default(10),
  afterId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")
    .optional(),
  beforeId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")
    .optional(),
});

const COLLECTION_MAP: Record<string, string | undefined> = {
  news: process.env.NEWS_COLLECTION_NAME,
  community: process.env.COMMUNITY_COLLECTION_NAME,
  crew: process.env.CREW_COLLECTION_NAME,
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const result = QuerySchema.safeParse(Object.fromEntries(url.searchParams));

  if (!result.success) {
    return NextResponse.json(
      { error: "잘못된 요청입니다.", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { postType, limit, afterId, beforeId } = result.data;
  const collectionName = COLLECTION_MAP[postType]!;

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const query: Record<string, unknown> = {};
    if (afterId)
      query._id = { ...(query._id || {}), $lt: new ObjectId(afterId) };
    if (beforeId)
      query._id = { ...(query._id || {}), $gt: new ObjectId(beforeId) };

    const sortOrder = beforeId ? 1 : -1;

    const posts = await collection
      .find(query, { projection: { title: 1, content: 1, createdAt: 1 } })
      .sort({ _id: sortOrder })
      .limit(limit)
      .toArray();

    if (beforeId) posts.reverse();

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "게시물을 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const postTypeParam = url.searchParams.get("postType") || "news";

  if (!Object.keys(COLLECTION_MAP).includes(postTypeParam)) {
    return NextResponse.json(
      { error: "유효하지 않은 게시물 타입입니다." },
      { status: 400 },
    );
  }
  const collectionName = COLLECTION_MAP[postTypeParam]!;

  try {
    const body = await request.json();

    const validation = PostBodySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "입력값이 올바르지 않습니다.",
          details: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { title, content } = validation.data;

    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const newPost = {
      title,
      content,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newPost);

    return NextResponse.json(
      {
        message: "게시물이 성공적으로 생성되었습니다.",
        postId: result.insertedId,
      },
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
