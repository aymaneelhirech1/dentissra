// controllers/notification.controller.ts
import type { Request, Response } from "express";
import Notification from "../models/Notification";

export async function getUserNotifications(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "غير مصرح بك" });

    const notifications = await Notification.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    console.log("Current user from token:", req.user);

    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ اثناء جلب الإشعارات" });
  }
}

export async function markNotificationRead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    return res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ اثناء تحديث الإشعار" });
  }
}
