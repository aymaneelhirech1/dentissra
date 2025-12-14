import express from "express";
import {
  createPersonnel,
  getAllPersonnel,
  getPersonnelById,
  updatePersonnel,
  deletePersonnel,
  createPersonnelWithUser,
} from "../controllers/personnel.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const router = express.Router();

router.post("/create", isAuthenticate, createPersonnel);
// Create personnel + user (Admin only)
router.post("/create-with-user", isAuthenticate, authorizeRoles(Role.Admin), createPersonnelWithUser);
router.get("/", isAuthenticate, getAllPersonnel);
router.get("/:id", isAuthenticate, getPersonnelById);
router.put("/:id", isAuthenticate, updatePersonnel);
router.delete("/:id", isAuthenticate, deletePersonnel);

export default router;
