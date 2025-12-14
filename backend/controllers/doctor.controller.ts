import type { Request, Response } from "express";
import User from "../models/User";
import Patient from "../models/Patient";
import Appointment from "../models/Appointment";
import FeuilleDeSoins from "../models/FeuilleSoin";
import mongoose from "mongoose";

export async function getDoctorDashboard(req: Request, res: Response) {
  try {
    const doctor = req.user;
    if (!doctor) return res.status(401).json({ error: "غير مصرح بك" });

    // Fetch patients belonging to this doctor
    const patients = await Patient.find({ userId: doctor._id }).sort({ createdAt: -1 });
    const patientIds = patients.map((p: any) => p._id);

    // Stats
    const patientsCount = patients.length;
    const careSheetsCount = await FeuilleDeSoins.countDocuments({ patientId: { $in: patientIds } });

    // Appointments today for this doctor's patients OR matching dentist field
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const appointmentsRaw = await Appointment.find({ date: { $gte: start, $lte: end } }).populate("patient");

    const appointmentsToday = appointmentsRaw.filter((app: any) => {
      // If appointment references a patient, ensure that patient belongs to this doctor
      if (app.patient && app.patient.userId) {
        if (String(app.patient.userId) === String(doctor._id)) return true;
      }
      // Also allow matching by dentiste field (name or id)
      if (app.dentiste) {
        if (String(app.dentiste) === String(doctor.fullname)) return true;
        if (String(app.dentiste) === String(doctor._id)) return true;
      }
      return false;
    });

    // Recent patients (limit 5)
    const recentPatients = patients.slice(0, 5);

    // Recent care sheets for the doctor's patients
    const recentCareSheets = await FeuilleDeSoins.find({ patientId: { $in: patientIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("patientId", "nom prenom");

    res.json({
      doctor: {
        _id: doctor._id,
        fullname: doctor.fullname,
        avatar: doctor.avatar,
        specialization: doctor.specialization,
        email: doctor.email,
      },
      stats: {
        patientsCount,
        careSheetsCount,
      },
      appointmentsToday,
      recentPatients,
      recentCareSheets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في الخادم" });
  }
}
