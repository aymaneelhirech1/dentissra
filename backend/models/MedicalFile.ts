import mongoose from "mongoose";

type FileType = "image" | "xray" | "pdf";

interface IMedicalFile {
  patient: mongoose.Types.ObjectId;
  fileUrl: string;
  fileType: FileType;
  uploadedBy: mongoose.Schema.Types.ObjectId;
}

const medicalFileSchema = new mongoose.Schema<IMedicalFile>(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["image", "xray", "pdf"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MedicalFile = mongoose.model("MedicalFile", medicalFileSchema);
export default MedicalFile;
