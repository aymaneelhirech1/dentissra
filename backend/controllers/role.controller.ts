import type { Request, Response } from "express";
import User from "../models/User";

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const allowedRoles = ["Admin", "Dentist", "Receptionist", "user"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "دور غير صالح" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "تم تحديث الدور بنجاح",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
};
