import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function updatePatientWhatsApp() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");

    const db = mongoose.connection.db;
    const patientsCollection = db.collection("patients");

    // Update the second patient (illi arwa) to add WhatsApp
    const result = await patientsCollection.updateOne(
      { nom: "illi", prenom: "arwa" },
      {
        $set: {
          whatsapp: "212608183112"
        }
      }
    );

    console.log(`\n✅ Updated ${result.modifiedCount} patient(s)`);
    
    // Verify
    const patient = await patientsCollection.findOne({ nom: "illi", prenom: "arwa" });
    console.log("\n📋 Patient after update:");
    console.log(`  Name: ${patient.nom} ${patient.prenom}`);
    console.log(`  Phone: ${patient.telephone}`);
    console.log(`  WhatsApp: ${patient.whatsapp}`);

    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updatePatientWhatsApp();
