import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testWhatsAppField() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to database");

    const db = mongoose.connection.db;
    const patientsCollection = db.collection("patients");

    // Find all patients and check whatsapp field
    const patients = await patientsCollection.find({}).toArray();
    
    console.log(`\n📊 Found ${patients.length} patient(s)\n`);

    patients.forEach((patient: any, index: number) => {
      console.log(`Patient ${index + 1}:`);
      console.log(`  Name: ${patient.nom} ${patient.prenom}`);
      console.log(`  CIN: ${patient.cin || 'N/A'}`);
      console.log(`  Phone: ${patient.telephone}`);
      console.log(`  WhatsApp: ${patient.whatsapp || '❌ NOT SET'}`);
      console.log(`  Email: ${patient.email || 'N/A'}`);
      console.log('---');
    });

    // Check if any patient has whatsapp
    const withWhatsApp = patients.filter((p: any) => p.whatsapp);
    console.log(`\n✅ ${withWhatsApp.length} patient(s) have WhatsApp number`);
    console.log(`❌ ${patients.length - withWhatsApp.length} patient(s) missing WhatsApp number`);

    process.exit(0);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

testWhatsAppField();
