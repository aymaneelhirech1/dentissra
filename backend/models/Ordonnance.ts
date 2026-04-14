import mongoose from "mongoose";

const MedicamentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
  },
  frequence: {
    type: String,
  },
  duree: {
    type: String,
  },
  notes: {
    type: String,
  },
}, { _id: false });

const OrdonnanceSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dateOrdonnance: {
    type: Date,
    default: Date.now,
  },
  medicaments: [MedicamentSchema],
  instructionGenerale: {
    type: String,
  },
  signatureMedecin: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model("Ordonnance", OrdonnanceSchema);
