import type { Request, Response } from "express";
import mongoose from "mongoose";
import Inventory from "../models/inventory";
import Supplier from "../models/Supplier";

// Créer un nouvel article d'inventaire
export async function createInventoryItem(req: Request, res: Response) {
  try {
    const {
      name,
      category,
      quantity,
      minimumQuantity,
      purchasePrice,
      sellPrice,
      supplier,
      lotNumber,
      expirationDate,
      notes,
    } = req.body;

    if (!name || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Le nom et la quantité sont requis",
      });
    }

    // Nettoyer le supplier si c'est une chaîne vide
    const cleanSupplier = supplier && supplier.trim() !== "" ? supplier : undefined;

    if (cleanSupplier && !mongoose.Types.ObjectId.isValid(cleanSupplier)) {
      return res.status(400).json({
        success: false,
        message: "ID fournisseur invalide",
      });
    }

    if (cleanSupplier) {
      const supplierExists = await Supplier.findById(cleanSupplier);
      if (!supplierExists) {
        return res.status(404).json({
          success: false,
          message: "Fournisseur introuvable",
        });
      }
    }

    const item = await Inventory.create({
      name,
      category: category || "Consommable",
      quantity,
      minimumQuantity: minimumQuantity || 5,
      purchasePrice: purchasePrice || 0,
      sellPrice: sellPrice || 0,
      supplier: cleanSupplier,
      lotNumber,
      expirationDate,
      notes,
    });

    const populatedItem = await Inventory.findById(item._id).populate(
      "supplier",
      "name phone email"
    );

    return res.status(201).json({
      success: true,
      message: "Produit ajouté avec succès",
      data: populatedItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'ajout du produit",
      error,
    });
  }
}

// Obtenir tous les articles avec recherche et filtres
export async function getAllInventory(req: Request, res: Response) {
  try {
    const { search, category, page = 1, limit = 50 } = req.query;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { lotNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const items = await Inventory.find(filter)
      .populate("supplier", "name phone email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Inventory.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'inventaire",
      error,
    });
  }
}

// Obtenir un article par ID
export async function getInventoryById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const item = await Inventory.findById(id).populate(
      "supplier",
      "name phone email address"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Produit introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du produit",
      error,
    });
  }
}

// Mettre à jour un article
export async function updateInventory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { supplier } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    // Nettoyer le supplier si c'est une chaîne vide
    const cleanSupplier = supplier && supplier.trim() !== "" ? supplier : undefined;
    const updateData = { ...req.body, supplier: cleanSupplier };

    if (cleanSupplier && !mongoose.Types.ObjectId.isValid(cleanSupplier)) {
      return res.status(400).json({
        success: false,
        message: "ID fournisseur invalide",
      });
    }

    if (cleanSupplier) {
      const supplierExists = await Supplier.findById(cleanSupplier);
      if (!supplierExists) {
        return res.status(404).json({
          success: false,
          message: "Fournisseur introuvable",
        });
      }
    }

    const updated = await Inventory.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("supplier", "name phone email");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Produit introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Produit modifié avec succès",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la modification du produit",
      error,
    });
  }
}

// Supprimer un article
export async function deleteInventory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const deleted = await Inventory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Produit introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du produit",
      error,
    });
  }
}

// Obtenir les produits en stock faible
export async function getLowStockItems(req: Request, res: Response) {
  try {
    const items = await Inventory.find({
      $expr: { $lt: ["$quantity", "$minimumQuantity"] },
    })
      .populate("supplier", "name phone email")
      .sort({ quantity: 1 });

    return res.status(200).json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits en stock faible",
      error,
    });
  }
}

// Obtenir les produits expirés ou bientôt expirés
export async function getExpiredProducts(req: Request, res: Response) {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const expiredItems = await Inventory.find({
      expirationDate: { $exists: true, $lte: now },
    })
      .populate("supplier", "name phone email")
      .sort({ expirationDate: 1 });

    const expiringItems = await Inventory.find({
      expirationDate: { $exists: true, $gt: now, $lte: thirtyDaysFromNow },
    })
      .populate("supplier", "name phone email")
      .sort({ expirationDate: 1 });

    return res.status(200).json({
      success: true,
      data: {
        expired: expiredItems,
        expiring: expiringItems,
      },
      count: {
        expired: expiredItems.length,
        expiring: expiringItems.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits expirés",
      error,
    });
  }
}
