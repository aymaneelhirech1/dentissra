import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dropOldIndex() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");
    
    const db = mongoose.connection.db;
    await db.collection('patients').dropIndex('phone_1');
    
    console.log("Successfully dropped old 'phone_1' index");
    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

dropOldIndex();
