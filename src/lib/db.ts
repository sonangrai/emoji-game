// lib/mongodb.js
import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_DB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("|___ DB Connected ___|");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
