import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.NEWS_COLLECTION_NAME;

const client = new MongoClient(uri);

function createPost(i) {
  return {
    title: `테스트 제목 ${i}`,
    content: `이것은 ${i}번째 테스트 게시물입니다.`,
    createdAt: new Date(Date.now() - i * 60000),
  };
}

async function run() {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection(collectionName);

  const BATCH = 1000;
  for (let i = 0; i < 100000; i += BATCH) {
    const batch = Array.from({ length: BATCH }, (_, j) => createPost(i + j));
    await col.insertMany(batch);
    console.log(`${i + BATCH}개 완료`);
  }

  await client.close();
  console.log("모든 데이터 삽입 완료");
}

run().catch(console.error);
