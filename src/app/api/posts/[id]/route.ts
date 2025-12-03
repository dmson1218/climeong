import { getClient } from "@/database/dbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

const DetailSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "유효하지 않은 ID 형식입니다."),
  postType: z.enum(["news", "community", "crew"]).optional().default("news"),
});

const COLLECTION_MAP: Record<string, string | undefined> = {
  news: process.env.NEWS_COLLECTION_NAME,
  community: process.env.COMMUNITY_COLLECTION_NAME,
  crew: process.env.CREW_COLLECTION_NAME,
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const rawId = url.pathname.split("/").pop();
  const rawPostType = url.searchParams.get("postType");

  const validation = DetailSchema.safeParse({
    id: rawId,
    postType: rawPostType,
  });

  if (!validation.success) {
    return NextResponse.json(
      { error: "잘못된 요청입니다.", details: validation.error.flatten() },
      { status: 400 },
    );
  }

  const { id, postType } = validation.data;
  const collectionName = COLLECTION_MAP[postType]!;

  try {
    const client = await getClient();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);

    const post = await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { title: 1, content: 1, createdAt: 1 } },
    );

    if (!post) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "게시물을 가져오는 데 실패했습니다." },
      { status: 500 },
    );
  }
}
