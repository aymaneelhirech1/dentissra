import mongoose from "mongoose";
import dotenv from "dotenv";
import { FeuilleDeSoins } from "./models/FeuilleSoin";

dotenv.config();

async function seedFeuilleSoin() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("✓ Connected to database");

    // Supprimer toutes les anciennes feuilles de soins
    await FeuilleDeSoins.deleteMany({});
    console.log("✓ Old feuilles de soins deleted");

    // Créer un exemple de feuille de soin
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
        },
        {
          date: new Date("2024-12-20"),
          acte: "Consultation",
          dent: "",
          code: "C001",
          quantite: 1,
          prixUnitaire: 150,
          total: 150
        }
      ],
      diagnostic: "Tartre important sur toutes les dents",
      traitementEffectue: "Détartrage complet + consultation",
      observations: "Bon état général. Recommandation de brossage 3 fois par jour.",
      facturation: {
        montantTotal: 450,
        partPatient: 150,
        partAssurance: 300,
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
      exportAssurance: {
        cnss: true,
        cnops: false,
        exportDate: new Date("2024-12-20")
      },
      versions: [
        {
          version: 1,
          date: new Date("2024-12-20"),
          modifiePar: "Dr Amina El Idrissi"
        }
      ]
    };

    const feuilleSoin = await FeuilleDeSoins.create(exemple);
    console.log("✓ Example feuille de soin created:", feuilleSoin._id);

    console.log("\n✅ Seed completed successfully!");
    console.log("\nExample document:");
    console.log(JSON.stringify(feuilleSoin, null, 2));

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seedFeuilleSoin();
