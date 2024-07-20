import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) {
    return console.log("No MongoDB_URL Found");
  }
  if (isConnected) {
    return console.log("is already connected to database");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "devFlow" });
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
}
