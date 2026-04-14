import type { Request, Response } from "express";
import Facture from "../models/Facture";
import Patient from "../models/Patient";
import cloudinary from "../libs/cloudinary";

// Générer numéro de facture unique
const generateNumeroFacture = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const count = await Facture.countDocuments({
    numeroFacture: new RegExp(`^FAC-${year}-`),
  });
  const index = (count + 1).toString().padStart(4, "0");
  return `FAC-${year}-${index}`;
};

// Créer une facture
export const createFacture = async (req: Request, res: Response) => {
  try {
    const { patientId, modePaiement } = req.body;

    // Parser prestations si c'est une chaîne JSON
    if (typeof req.body.prestations === 'string') {
      req.body.prestations = JSON.parse(req.body.prestations);
    }

    // Vérifier que le patient existe
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient non trouvé",
      });
    }

    // Validation selon le mode de paiement
    if (modePaiement === "Chèque") {
      if (!req.body.numeroCheque || !req.body.dateCheque) {
        return res.status(400).json({
          success: false,
          message: "Le numéro et la date du chèque sont requis",
        });
      }
    }

    // Upload du fichier de traçabilité si carte bancaire ou virement
    let fichierTracabilite = "";
    if ((modePaiement === "Carte" || modePaiement === "Virement") && req.file) {
      try {
        const streamifier = require("streamifier");
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "factures_tracabilite",
            resource_type: "auto",
          },
          (error: any, result: any) => {
            if (error) {
              console.error("Erreur upload Cloudinary:", error);
            } else if (result) {
              fichierTracabilite = result.secure_url || "";
            }
          }
        );

        await new Promise((resolve, reject) => {
          const stream = streamifier.createReadStream(req.file!.buffer);
          stream.pipe(uploadStream);
          uploadStream.on("finish", resolve);
          uploadStream.on("error", reject);
        });
      } catch (uploadError) {
        console.error("Erreur upload:", uploadError);
      }
    }

    // Générer numéro de facture
    const numeroFacture = await generateNumeroFacture();

    // Créer la facture
    const facture = new Facture({
      ...req.body,
      numeroFacture,
      fichierTracabilite,
    });

    await facture.save();

    return res.status(201).json({
      success: true,
      message: "Facture créée avec succès",
      data: facture,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création de la facture",
    });
  }
};

// Obtenir toutes les factures
export const getFactures = async (req: Request, res: Response) => {
  try {
    const factures = await Facture.find()
      .populate("patientId", "nom prenom telephone cin")
      .sort({ dateFacture: -1 });

    return res.status(200).json({
      success: true,
      data: factures,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la récupération des factures",
    });
  }
};

// Obtenir une facture par ID
export const getFactureById = async (req: Request, res: Response) => {
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

    return res.status(200).json({
      success: true,
      data: facture,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la récupération de la facture",
    });
  }
};

// Mettre à jour une facture
export const updateFacture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { modePaiement } = req.body;

    // Parser prestations si c'est une chaîne JSON
    if (typeof req.body.prestations === 'string') {
      req.body.prestations = JSON.parse(req.body.prestations);
    }

    // Validation selon le mode de paiement
    if (modePaiement === "Chèque") {
      if (!req.body.numeroCheque || !req.body.dateCheque) {
        return res.status(400).json({
          success: false,
          message: "Le numéro et la date du chèque sont requis",
        });
      }
    }

    // Upload du fichier de traçabilité si carte bancaire ou virement
    let updateData = { ...req.body };
    if ((modePaiement === "Carte" || modePaiement === "Virement") && req.file) {
      try {
        const streamifier = require("streamifier");
        let fichierTracabilite = "";

        await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "factures_tracabilite",
              resource_type: "auto",
            },
            (error: any, result: any) => {
              if (error) {
                reject(error);
              } else {
                fichierTracabilite = result.secure_url;
                resolve(result);
              }
            }
          );

          const stream = streamifier.createReadStream(req.file!.buffer);
          stream.pipe(uploadStream);
        });

        updateData.fichierTracabilite = fichierTracabilite;
      } catch (uploadError) {
        console.error("Erreur upload:", uploadError);
      }
    }

    const facture = await Facture.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!facture) {
      return res.status(404).json({
        success: false,
        message: "Facture non trouvée",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Facture mise à jour avec succès",
      data: facture,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la mise à jour de la facture",
    });
  }
};

// Supprimer une facture
export const deleteFacture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findByIdAndDelete(id);

    if (!facture) {
      return res.status(404).json({
        success: false,
        message: "Facture non trouvée",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Facture supprimée avec succès",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la suppression de la facture",
    });
  }
};
