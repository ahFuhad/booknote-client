import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing");
const g = globalThis as typeof globalThis & { mongo?: Promise<MongoClient> };
const promise = g.mongo ?? new MongoClient(uri).connect();
if (process.env.NODE_ENV !== "production") g.mongo = promise;
export default promise;
