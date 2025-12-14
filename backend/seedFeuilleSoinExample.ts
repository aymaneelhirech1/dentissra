import mongoose from "mongoose";
import dotenv from "dotenv";
import FeuilleDeSoins from "./models/FeuilleSoin";

dotenv.config();

async function seedExample() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("✓ Connected to database");

    // Clear existing data
    await FeuilleDeSoins.deleteMany({});
    console.log("✓ Old feuilles de soins deleted");

    // Create example document
    const exemple: any = {
      patientId: "665a1c9c1a8f123456789abc",
      actes: [
        {
          date: new Date("2024-12-20"),
          acte: "Détartrage",
          dent: "Toutes",
          code: "D001",
          quantite: 1,
          prixUnitaire: 300,
          total: 300
        }
      ],
      diagnostic: "Tartre léger",
      traitementEffectue: "Détartrage complet",
      observations: "Bon état général",
      facturation: {
        montantTotal: 300,
        partPatient: 100,
        partAssurance: 200,
        modePaiement: "Carte" as const,
        statutPaiement: "Payé" as const
      },
      signature: {
        nomPraticien: "Dr Amina El Idrissi",
        dateSignature: new Date("2024-12-20")
      },
      envoiPatient: true,
      rappelPaiement: false,
      archive: false,
      versions: [
        {
          version: 1,
          date: new Date("2024-12-20"),
          modifiePar: "Dr Amina El Idrissi"
        }
      ],
      exportAssurance: {
        cnss: true,
        cnops: false,
        exportDate: new Date("2024-12-20")
      }
    };

    const result = await FeuilleDeSoins.create(exemple);
    console.log("✓ Example feuille de soin created:", result._id);
    console.log("\n📄 Document details:");
    console.log(JSON.stringify(result, null, 2));
    
    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seedExample();
