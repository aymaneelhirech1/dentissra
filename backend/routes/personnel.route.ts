import express from "express";
import {
  createPersonnel,
  getAllPersonnel,
  getPersonnelById,
  updatePersonnel,
  deletePersonnel,
} from "../controllers/personnel.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = express.Router();

router.post("/create", isAuthenticate, createPersonnel);
router.get("/", isAuthenticate, getAllPersonnel);
router.get("/:id", isAuthenticate, getPersonnelById);
router.put("/:id", isAuthenticate, updatePersonnel);
router.delete("/:id", isAuthenticate, deletePersonnel);

export default router;
