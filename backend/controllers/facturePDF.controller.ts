import type { Request, Response } from "express";
import PDFDocument from "pdfkit";
import Facture from "../models/Facture";

export const generateFacturePDF = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findById(id).populate(
      "patientId",
      "nom prenom telephone cin dateNaissance adresse"
    );

    if (!facture) {
      return res.status(404).json({
        success: false,
        message: "Facture non trouvée",
      });
    }

    // Créer le document PDF
    const doc = new PDFDocument({ margin: 50, size: "A4" });

    // Configuration des headers pour le téléchargement
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Facture-${facture.numeroFacture}.pdf`
    );

    // Pipe le PDF vers la réponse
    doc.pipe(res);

    // ===== EN-TÊTE CABINET =====
    doc
      .fontSize(24)
      .fillColor("#E11D48")
      .text("Cabinet Dentaire", 50, 50);

    doc
      .fontSize(10)
      .fillColor("#374151")
      .text("Dr. Mohamed ALAMI", 50, 85)
      .text("Chirurgien-Dentiste", 50, 100)
      .text("123 Avenue Mohammed V, Casablanca 20000", 50, 115)
      .text("Tél: +212 522 123 456", 50, 130)
      .text("Email: contact@cabinet-dentaire.ma", 50, 145);

    // Informations légales (côté droit)
    doc
      .fontSize(9)
      .fillColor("#6B7280")
      .text("IF: 12345678", 400, 85, { align: "right" })
      .text("ICE: 001234567890123", 400, 100, { align: "right" })
      .text("CNSS: 9876543210", 400, 115, { align: "right" });

    // Ligne de séparation
    doc
      .strokeColor("#E11D48")
      .lineWidth(2)
      .moveTo(50, 170)
      .lineTo(545, 170)
      .stroke();

    // ===== TITRE FACTURE =====
    doc
      .fontSize(18)
      .fillColor("#1F2937")
      .text("FACTURE", 50, 190, { align: "center" });

    doc
      .fontSize(12)
      .fillColor("#E11D48")
      .text(`N° ${facture.numeroFacture}`, 50, 215, { align: "center" });

    const dateFacture = new Date(facture.dateFacture).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    doc
      .fontSize(10)
      .fillColor("#6B7280")
      .text(`Date: ${dateFacture}`, 50, 235, { align: "center" });

    // ===== INFORMATIONS PATIENT =====
    doc
      .fontSize(12)
      .fillColor("#1F2937")
      .text("Informations Patient", 50, 270);

    doc
      .fontSize(10)
      .fillColor("#374151")
      .text(
        `Nom: ${(facture.patientId as any).nom} ${(facture.patientId as any).prenom}`,
        50,
        290
      )
      .text(`CIN: ${(facture.patientId as any).cin || "N/A"}`, 50, 305)
      .text(`Téléphone: ${(facture.patientId as any).telephone}`, 50, 320);

    // ===== TABLEAU DES PRESTATIONS =====
    const tableTop = 360;
    
    // En-tête du tableau
    doc
      .fontSize(10)
      .fillColor("#FFFFFF")
      .rect(50, tableTop, 495, 25)
      .fill("#E11D48");

    doc
      .fillColor("#FFFFFF")
      .text("Acte", 60, tableTop + 8, { width: 200 })
      .text("Dent", 260, tableTop + 8, { width: 50 })
      .text("Prix Unit.", 310, tableTop + 8, { width: 70, align: "right" })
      .text("Qté", 390, tableTop + 8, { width: 40, align: "right" })
      .text("Total", 440, tableTop + 8, { width: 95, align: "right" });

    // Lignes du tableau
    let y = tableTop + 30;
    
    facture.prestations.forEach((prestation, index) => {
      const bgColor = index % 2 === 0 ? "#F9FAFB" : "#FFFFFF";
      
      doc
        .rect(50, y - 5, 495, 25)
        .fill(bgColor);

      doc
        .fillColor("#374151")
        .fontSize(9)
        .text(prestation.acte, 60, y, { width: 200 })
        .text(prestation.dent || "-", 260, y, { width: 50 })
        .text(`${prestation.prixUnitaire.toFixed(2)} DH`, 310, y, {
          width: 70,
          align: "right",
        })
        .text(prestation.quantite.toString(), 390, y, {
          width: 40,
          align: "right",
        })
        .text(`${prestation.total.toFixed(2)} DH`, 440, y, {
          width: 95,
          align: "right",
        });

      y += 25;
    });

    // Ligne de séparation après les prestations
    y += 10;
    doc
      .strokeColor("#D1D5DB")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(545, y)
      .stroke();

    // ===== TOTAUX =====
    y += 20;

    doc
      .fontSize(10)
      .fillColor("#6B7280")
      .text("Total HT:", 350, y)
      .fillColor("#1F2937")
      .text(`${facture.totalHT.toFixed(2)} DH`, 440, y, {
        width: 95,
        align: "right",
      });

    y += 20;
    doc
      .fillColor("#6B7280")
      .text("TVA:", 350, y)
      .fillColor("#1F2937")
      .text(`${facture.TVA.toFixed(2)} DH`, 440, y, {
        width: 95,
        align: "right",
      });

    y += 20;
    doc
      .fontSize(12)
      .fillColor("#E11D48")
      .text("Total TTC:", 350, y)
      .fontSize(14)
      .text(`${facture.totalTTC.toFixed(2)} DH`, 440, y, {
        width: 95,
        align: "right",
      });

    y += 25;
    doc
      .fontSize(10)
      .fillColor("#6B7280")
      .text("Montant versé:", 350, y)
      .fillColor("#059669")
      .text(`${facture.montantVerse.toFixed(2)} DH`, 440, y, {
        width: 95,
        align: "right",
      });

    y += 20;
    doc
      .fontSize(12)
      .fillColor("#6B7280")
      .text("Reste à payer:", 350, y)
      .fontSize(14)
      .fillColor(facture.resteAPayer > 0 ? "#DC2626" : "#059669")
      .text(`${facture.resteAPayer.toFixed(2)} DH`, 440, y, {
        width: 95,
        align: "right",
      });

    // ===== MODE DE PAIEMENT =====
    y += 35;
    doc
      .fontSize(10)
      .fillColor("#374151")
      .text(`Mode de paiement: ${facture.modePaiement}`, 50, y);

    // Afficher les détails du chèque si applicable
    if (facture.modePaiement === "Chèque" && facture.numeroCheque) {
      y += 20;
      doc
        .fontSize(9)
        .fillColor("#6B7280")
        .text(`N° Chèque: ${facture.numeroCheque}`, 50, y);
      
      if (facture.dateCheque) {
        const dateCheque = new Date(facture.dateCheque).toLocaleDateString("fr-FR");
        doc.text(`Date Chèque: ${dateCheque}`, 200, y);
      }
    }

    // Afficher l'info du fichier de traçabilité pour carte bancaire et virement
    if ((facture.modePaiement === "Carte" || facture.modePaiement === "Virement") && facture.fichierTracabilite) {
      y += 20;
      doc
        .fontSize(9)
        .fillColor("#6B7280")
        .text("Fichier de traçabilité: Disponible (voir facture en ligne)", 50, y);
    }

    // ===== NOTES =====
    if (facture.notes) {
      y += 25;
      doc
        .fontSize(9)
        .fillColor("#6B7280")
        .text("Notes:", 50, y)
        .text(facture.notes, 50, y + 15, { width: 495 });
    }

    // ===== PIED DE PAGE =====
    doc
      .fontSize(8)
      .fillColor("#9CA3AF")
      .text(
        "Facture générée automatiquement — Cabinet Dentaire",
        50,
        750,
        { align: "center" }
      )
      .text(
        "IF: 12345678 | ICE: 001234567890123 | CNSS: 9876543210",
        50,
        765,
        { align: "center" }
      )
      .text(
        "123 Avenue Mohammed V, Casablanca 20000 | Tél: +212 522 123 456",
        50,
        780,
        { align: "center" }
      );

    // Finaliser le PDF
    doc.end();
  } catch (error: any) {
    console.error("Erreur génération PDF:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la génération du PDF",
    });
  }
};
