import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function updateExamplePatient() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");

    const db = mongoose.connection.db;
    const patientsCollection = db.collection("patients");

    // Update or create example patient with CIN B654321
    const result = await patientsCollection.updateOne(
      { cin: "B654321" },
      {
        $set: {
          cin: "B654321",
          nom: "El Idrissi",
          prenom: "Amina",
          telephone: "0612345678",
          whatsapp: "212612345678",
          email: "amina.elidrissi@example.com",
          dateNaissance: new Date("1985-05-15"),
          adresse: "123 Rue Mohammed V, Casablanca",
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    if (result.upsertedId) {
      console.log("\n✅ Patient example created:");
      console.log(`   ID: ${result.upsertedId}`);
    } else {
      console.log("\n✅ Patient example updated:");
      console.log(`   Matched: ${result.matchedCount}`);
      console.log(`   Modified: ${result.modifiedCount}`);
    }

    console.log("\n📋 Patient Details:");
    console.log("   CIN: B654321");
    console.log("   Name: Amina El Idrissi");
    console.log("   Phone: 0612345678");
    console.log("   WhatsApp: 212612345678");
    
    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updateExamplePatient();
