import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");
    
    const db = mongoose.connection.db;
    const collection = db.collection('patients');
    
    // List all indexes
    const indexes = await collection.indexes();
    console.log("\nCurrent indexes:");
    indexes.forEach(index => {
      console.log(`  - ${index.name}:`, index.key);
    });
    
    // Drop old indexes that conflict
    const indexesToDrop = ['phone_1', 'email_1', 'cin_1'];
    
    for (const indexName of indexesToDrop) {
      try {
        await collection.dropIndex(indexName);
        console.log(`✓ Dropped index: ${indexName}`);
      } catch (err: any) {
        if (err.codeName === 'IndexNotFound') {
          console.log(`  (${indexName} not found, skipping)`);
        } else {
          console.log(`  Error dropping ${indexName}:`, err.message);
        }
      }
    }
    
    console.log("\n✓ Index cleanup complete");
    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

fixIndexes();
