import mongoose from "mongoose";

export async function connecDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Fail", error);
  }
}
