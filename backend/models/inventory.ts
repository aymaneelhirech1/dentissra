import mongoose from "mongoose";

interface IInventory {
  name: string;
  category: string;
  quantity: number;
  minimumQuantity: number;
  purchasePrice: number;
  sellPrice: number;
  supplier?: mongoose.Schema.Types.ObjectId;
  lotNumber?: string;
  expirationDate?: Date;
  notes?: string;
}

const inventorySchema = new mongoose.Schema<IInventory>(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est requis"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Anesthésie",
        "Stérilisation",
        "Consommable",
        "Implant",
        "Produit d'hygiène",
        "Instrumentation",
        "Radiologie",
        "Orthodontie",
        "Prothèse",
        "Endodontie",
        "Autre",
      ],
      default: "Consommable",
    },
    quantity: {
      type: Number,
      required: [true, "La quantité est requise"],
      min: [0, "La quantité ne peut pas être négative"],
      default: 0,
    },
    minimumQuantity: {
      type: Number,
      default: 5,
      min: [0, "Le seuil minimum ne peut pas être négatif"],
    },
    purchasePrice: {
      type: Number,
      default: 0,
      min: [0, "Le prix d'achat ne peut pas être négatif"],
    },
    sellPrice: {
      type: Number,
      default: 0,
      min: [0, "Le prix de vente ne peut pas être négatif"],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    lotNumber: {
      type: String,
      trim: true,
    },
    expirationDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;