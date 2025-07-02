import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.NEWS_COLLECTION_NAME;

if (!uri || !dbName || !collectionName) {
  throw new Error(
    "환경변수(MONGODB_URI, DB_NAME, NEWS_COLLECTION_NAME)를 확인하세요.",
  );
}

async function measureSkip(client, skip, limit = 10) {
  const db = client.db(dbName);
  const col = db.collection(collectionName);

  const start = Date.now();
  const result = await col
    .find({}, { projection: { title: 1, content: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  const end = Date.now();

  return { timeMs: end - start, count: result.length };
}

async function measureSkipAvg(client, skip, limit = 10, runs = 5) {
  let total = 0;
  let count = 0;
  for (let i = 0; i < runs; i++) {
    const { timeMs, count: c } = await measureSkip(client, skip, limit);
    total += timeMs;
    count = c;
  }
  return { avgTimeMs: total / runs, count };
}

async function measureCursor(client, afterDate, limit = 10) {
  const db = client.db(dbName);
  const col = db.collection(collectionName);

  const filter = afterDate ? { createdAt: { $lt: afterDate } } : {};

  const start = Date.now();
  const result = await col
    .find(filter, { projection: { title: 1, content: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  const end = Date.now();

  return {
    timeMs: end - start,
    count: result.length,
    lastCreatedAt: result.length ? result[result.length - 1].createdAt : null,
  };
}

async function measureCursorAvg(client, afterDate, limit = 10, runs = 5) {
  let total = 0;
  let count = 0;
  let lastCreatedAt = null;

  for (let i = 0; i < runs; i++) {
    const {
      timeMs,
      count: c,
      lastCreatedAt: last,
    } = await measureCursor(client, afterDate, limit);
    total += timeMs;
    count = c;
    lastCreatedAt = last;
  }
  return { avgTimeMs: total / runs, count, lastCreatedAt };
}

async function runTest() {
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const limit = 10;
    const runs = 30;

    const skips = [0, 50000, 99990];
    console.log("=== SKIP 기반 페이징 성능 테스트 ===");
    for (const skip of skips) {
      const { avgTimeMs, count } = await measureSkipAvg(
        client,
        skip,
        limit,
        runs,
      );
      console.log(
        `skip=${skip}, limit=${limit}, runs=${runs} => avg time: ${avgTimeMs.toFixed(
          1,
        )}ms, items: ${count}`,
      );
    }

    console.log("\n=== 커서 기반 페이징 성능 테스트 ===");
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    const oldestDoc = await col
      .find()
      .sort({ createdAt: 1 })
      .limit(1)
      .toArray();
    const midDoc = await col
      .find()
      .sort({ createdAt: -1 })
      .skip(50000)
      .limit(1)
      .toArray();

    const afterDates = [null, midDoc[0]?.createdAt, oldestDoc[0]?.createdAt];

    for (const afterDate of afterDates) {
      const label = afterDate
        ? afterDate.toISOString()
        : "처음 페이지 (after=null)";
      const { avgTimeMs, count } = await measureCursorAvg(
        client,
        afterDate,
        limit,
        runs,
      );
      console.log(
        `after=${label}, limit=${limit}, runs=${runs} => avg time: ${avgTimeMs.toFixed(
          1,
        )}ms, items: ${count}`,
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

runTest();
