import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI가 정의되지 않았습니다.");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }

  return clientPromise!;
}

export { getClient };
