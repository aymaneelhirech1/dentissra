import type { Request, Response } from "express";
import mongoose from "mongoose";
import Invoice from "../models/Invoice";
import Patient from "../models/Patient";

export async function createInvoice(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { patient, items, status, paidAt } = req.body;

    if (!patient || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "البيانات الأساسية للفاتورة مطلوبة" });
    }

    if (!mongoose.Types.ObjectId.isValid(patient)) {
      return res.status(400).json({ error: "معرف مريض غير صالح" });
    }

    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
      return res.status(404).json({ message: "المريض غير موجود" });
    }

    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.qty,
      0
    );

    const invoice = await Invoice.create({
      patient,
      items,
      total,
      status: status || "غير مدفوع",
      issuedAt: new Date(),
      paidAt: status === "مدفوع" ? new Date() : paidAt,
    });

    return res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء إنشاء الفاتورة" });
  }
}

export async function getAllInvoices(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const invoices = await Invoice.find()
      .populate("patient", "name phone email")
      .sort({ issuedAt: -1 });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "لا يوجد فواتير حتى الآن" });
    }

    return res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الفواتير" });
  }
}

export async function getInvoiceById(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف فاتورة غير صالح" });
    }

    const invoice = await Invoice.findById(id).populate(
      "patient",
      "name phone email"
    );

    if (!invoice) {
      return res.status(404).json({ message: "الفاتورة غير موجودة" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الفاتورة" });
  }
}

export async function updateInvoice(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف فاتورة غير صالح" });
    }

    let updateData = req.body;

    if (updateData.items) {
      updateData.total = updateData.items.reduce(
        (sum: number, item: any) => sum + item.price * item.qty,
        0
      );
    }

    if (updateData.status === "مدفوع") {
      updateData.paidAt = new Date();
    }

    const invoice = await Invoice.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!invoice) {
      return res.status(404).json({ message: "الفاتورة غير موجودة" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء تعديل الفاتورة" });
  }
}

export async function deleteInvoice(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف فاتورة غير صالح" });
    }

    const invoice = await Invoice.findOneAndDelete({ _id: id });

    if (!invoice) {
      return res.status(404).json({ message: "الفاتورة غير موجودة" });
    }

    return res.status(200).json({ success: "تم حذف الفاتورة بنجاح" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء حذف الفاتورة" });
  }
}
