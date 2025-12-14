import type { Request, Response } from "express";
import Personnel from "../models/Personnel";
import mongoose from "mongoose";

// Créer un personnel
export async function createPersonnel(req: Request, res: Response) {
  try {
    const personnel = new Personnel(req.body);
    await personnel.save();
    res.status(201).json(personnel);
  } catch (err: any) {
    // Handle duplicate key errors (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      
      const fieldNames: any = {
        cin: "CIN",
        email: "Email",
        telephone: "Téléphone"
      };
      
      const fieldLabel = fieldNames[field] || field;
      return res.status(400).json({ 
        error: `${fieldLabel} "${value}" est déjà utilisé`,
        field: field
      });
    }
    
    // Handle validation errors
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      }));
      return res.status(400).json({ 
        error: "Erreur de validation", 
        details: errors,
        message: err.message 
      });
    }
    
    res.status(400).json({ error: err.message });
  }
}

// Récupérer tous les personnels
export async function getAllPersonnel(req: Request, res: Response) {
  try {
    const personnel = await Personnel.find().sort({ createdAt: -1 });
    res.json(personnel);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Récupérer un personnel par ID
export async function getPersonnelById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID personnel invalide" });
    }

    const personnel = await Personnel.findById(id);
    
    if (!personnel) {
      return res.status(404).json({ error: "Personnel non trouvé" });
    }
    
    res.json(personnel);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Mettre à jour un personnel
export async function updatePersonnel(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID personnel invalide" });
    }

    const personnel = await Personnel.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!personnel) {
      return res.status(404).json({ error: "Personnel non trouvé" });
    }
    
    res.json(personnel);
  } catch (err: any) {
    // Handle duplicate key errors (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      
      const fieldNames: any = {
        cin: "CIN",
        email: "Email",
        telephone: "Téléphone"
      };
      
      const fieldLabel = fieldNames[field] || field;
      return res.status(400).json({ 
        error: `${fieldLabel} "${value}" est déjà utilisé`,
        field: field
      });
    }
    
    res.status(400).json({ error: err.message });
  }
}

// Supprimer un personnel
export async function deletePersonnel(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID personnel invalide" });
    }

    const personnel = await Personnel.findByIdAndDelete(id);
    
    if (!personnel) {
      return res.status(404).json({ error: "Personnel non trouvé" });
    }
    
    res.json({ message: "Personnel supprimé avec succès" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
