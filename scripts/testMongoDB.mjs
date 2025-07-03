import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { performance } from "perf_hooks";
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.NEWS_COLLECTION_NAME;
const LIMIT = 10;

async function measureSkipPage(col, skip) {
  const start = performance.now();
  await col
    .find({}, { projection: { title: 1, content: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(LIMIT)
    .toArray();
  const end = performance.now();

  return (end - start).toFixed(2);
}

async function findCursorStartId(col, position) {
  const cursor = col
    .find({}, { projection: { title: 1, content: 1, createdAt: 1 } })
    .sort({ _id: -1 })
    .limit(position + 1); // skip처럼 앞에서 position번째까지 순회

  let count = 0;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (count === position) return doc._id;
    count++;
  }
  throw new Error(`${position}번째 문서를 찾을 수 없습니다.`);
}

async function measureCursorPage(col, position) {
  const startId = await findCursorStartId(col, position);
  const start = performance.now();
  await col
    .find(
      { _id: { $lt: startId } },
      { projection: { title: 1, content: 1, createdAt: 1 } },
    )
    .sort({ _id: -1 })
    .limit(LIMIT)
    .toArray();
  const end = performance.now();

  return (end - start).toFixed(2);
}

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db(dbName).collection(collectionName);

  const positions = [
    { label: "첫 페이지", skip: 0 },
    { label: "중간 페이지", skip: 50000 },
    { label: "마지막 페이지", skip: 99990 },
  ];

  console.log("=== SKIP vs CURSOR 페이지 로딩 성능 비교 ===");
  for (const { label, skip } of positions) {
    const skipTime = await measureSkipPage(col, skip);
    const cursorTime = await measureCursorPage(col, skip);

    console.log(`\n[${label}]`);
    console.log(`- SKIP 기반 소요 시간: ${skipTime}ms`);
    console.log(`- CURSOR 기반 소요 시간: ${cursorTime}ms`);
  }

  await client.close();
}

run().catch(console.error);
