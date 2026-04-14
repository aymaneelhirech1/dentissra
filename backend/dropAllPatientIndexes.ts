import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dropAllIndexes() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");
    
    const db = mongoose.connection.db;
    const collection = db.collection('patients');
    
    // Get all indexes
    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes);
    
    // Drop all indexes except _id (which is required)
    for (const index of indexes) {
      if (index.name !== '_id_') {
        try {
          await collection.dropIndex(index.name);
          console.log(`Dropped index: ${index.name}`);
        } catch (err: any) {
          console.log(`Could not drop ${index.name}:`, err.message);
        }
      }
    }
    
    console.log("\nAll custom indexes dropped successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

dropAllIndexes();
