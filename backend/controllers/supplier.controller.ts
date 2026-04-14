import type { Request, Response } from "express";
import mongoose from "mongoose";
import Supplier from "../models/Supplier";


export async function createSupplier(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { name, phone, email, address } = req.body;

    if (!name || !email || !address) {
      return res
        .status(400)
        .json({ message: "الاسم، الإيميل، والعنوان مطلوبين" });
    }

    const exists = await Supplier.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ message: "مورد بنفس الإيميل موجود بالفعل" });
    }

    const supplier = await Supplier.create({ name, phone, email, address });
    return res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء إنشاء المورد" });
  }
}

export async function getAllSuppliers(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "لا يوجد موردين حتى الآن" });
    }

    return res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الموردين" });
  }
}

export async function getSupplierById(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف مورد غير صالح" });
    }

    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "المورد غير موجود" });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب المورد" });
  }
}

export async function updateSupplier(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف مورد غير صالح" });
    }

    const updates = req.body;

     const exists = await Supplier.findOne(req.body.email);
    if (exists) {
      return res
        .status(409)
        .json({ message: "مورد بنفس الإيميل موجود بالفعل" });
    }


    const supplier = await Supplier.findOneAndUpdate({ _id: id }, updates, {
      new: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: "المورد غير موجود" });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء تعديل المورد" });
  }
}

export async function deleteSupplier(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "معرف مورد غير صالح" });
    }

    const supplier = await Supplier.findOneAndDelete({ _id: id });
    if (!supplier) {
      return res.status(404).json({ message: "المورد غير موجود" });
    }

    return res.status(200).json({ success: "تم حذف المورد بنجاح" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ أثناء حذف المورد" });
  }
}
