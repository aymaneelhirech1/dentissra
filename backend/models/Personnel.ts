import mongoose from "mongoose";

const PersonnelSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  cin: { type: String, required: true, unique: true },
  dateNaissance: { type: Date, required: true },
  sexe: { type: String, enum: ["Homme", "Femme", "Autre"], required: true },
  telephone: { type: String, required: true },
  email: { type: String, unique: true },
  adresse: { type: String },
  poste: { 
    type: String, 
    enum: ["Dentiste", "Assistant(e)", "Secrétaire", "Hygiéniste", "Technicien(ne)", "Autre"],
    required: true 
  },
  specialite: { type: String }, // Pour les dentistes
  dateEmbauche: { type: Date, required: true },
  salaire: { type: Number },
  horaireTravail: { type: String },
  statut: { 
    type: String, 
    enum: ["Actif", "Congé", "Inactif"],
    default: "Actif"
  },
  numeroCNSS: { type: String },
  numeroCarteProf: { type: String }, // Carte professionnelle
  photoProfile: { type: String },
  notes: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, { timestamps: true });

export default mongoose.model("Personnel", PersonnelSchema);
