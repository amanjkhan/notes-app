import mongoose from "mongoose";

export default async function connectDb(mongoUri) {
  if (!mongoUri) {
    throw new Error("MongoDB URI is required");
  }

  try {
    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    throw error;
  }
}
