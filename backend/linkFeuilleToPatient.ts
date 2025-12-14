import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function linkFeuilleToPatient() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");

    const db = mongoose.connection.db;
    const patientsCollection = db.collection("patients");
    const feuillesCollection = db.collection("feuillesoins");

    // Find patient with CIN B654321
    const patient = await patientsCollection.findOne({ cin: "B654321" });
    
    if (!patient) {
      console.log("❌ Patient with CIN B654321 not found!");
      process.exit(1);
    }

    console.log("\n✅ Found patient:");
    console.log(`   ID: ${patient._id}`);
    console.log(`   CIN: ${patient.cin}`);
    console.log(`   Name: ${patient.nom} ${patient.prenom}`);

    // Update the example feuille to link to this patient
    const result = await feuillesCollection.updateMany(
      {},
      {
        $set: {
          patientId: patient._id
        }
      }
    );

    console.log(`\n✅ Updated ${result.modifiedCount} feuille(s) to link with patient CIN B654321`);
    
    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

linkFeuilleToPatient();
