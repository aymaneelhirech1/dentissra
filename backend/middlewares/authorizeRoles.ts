import type { Request, Response, NextFunction } from "express";
import { Role } from "../libs/role.enum";

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ error: "غير مصرح بك" });
    }

    if (!allowedRoles.includes(userRole as Role)) {
      return res.status(403).json({ error: "ليس لديك صلاحية للدخول" });
    }

    next();
  };
}
