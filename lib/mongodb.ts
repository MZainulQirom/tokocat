import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL!;
const options = {};
let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URL) {
  throw new Error("Please add your Mongo URL to .env.local");
}

if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };
    
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(url, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(url, options);
    clientPromise = client.connect();
}

export default clientPromise;
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL belum diisi di .env");
}

// cache biar tidak koneksi ulang terus (Next.js penting ini)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "toko_cat", // bebas, bisa ganti
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectDB };