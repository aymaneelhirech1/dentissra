import type { Request, Response } from "express";
import mongoose from "mongoose";
import MedicalFile from "../models/MedicalFile";
import cloudinary from "../libs/cloudinary";
import streamifier from "streamifier";

export async function uploadMedicalFile(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح لك" });

    const { patient, fileType } = req.body;

    if (!patient || !fileType) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }

    if (!mongoose.Types.ObjectId.isValid(patient)) {
      return res.status(400).json({ message: "معرّف المريض غير صالح" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "الرجاء رفع ملف" });
    }

    // رفع الملف لـ Cloudinary من buffer
    const uploadFromBuffer = (buffer: Buffer) =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "medical_files" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await uploadFromBuffer(req.file.buffer);

    const medicalFile = await MedicalFile.create({
      patient,
      fileUrl: result.secure_url,
      fileType,
      uploadedBy: user._id,
    });

    return res.status(201).json(medicalFile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء رفع الملف" });
  }
}

export async function getAllMedicalFiles(req: Request, res: Response) {
  try {
    const files = await MedicalFile.find()
      .populate("patient", "name phone")
      .populate("uploadedBy", "name role")
      .sort({ createdAt: -1 });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "لا توجد ملفات" });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الملفات" });
  }
}

export async function getMedicalFilesByPatient(req: Request, res: Response) {
  try {
    const { patientId } = req.params;

    if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "معرّف المريض غير صالح" });
    }

    const files = await MedicalFile.find({ patient: patientId }).populate(
      "uploadedBy",
      "name role"
    );

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "لا توجد ملفات لهذا المريض" });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب ملفات المريض" });
  }
}

export async function deleteMedicalFile(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "معرّف غير صالح" });
    }

    const file = await MedicalFile.findById(id);

    if (!file) {
      return res.status(404).json({ message: "الملف غير موجود" });
    }

    const publicId = file.fileUrl.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy("medical_files/" + publicId);
    }

    await file.deleteOne();

    return res.status(200).json({ success: "تم حذف الملف بنجاح" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء حذف الملف" });
  }
}
