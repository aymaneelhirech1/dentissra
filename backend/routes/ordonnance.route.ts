import { Router } from "express";
import {
  createOrdonnance,
  getOrdonnances,
  getOrdonnanceById,
  updateOrdonnance,
  deleteOrdonnance,
} from "../controllers/ordonnance.controller";

const router = Router();

router.post("/", createOrdonnance);
router.get("/", getOrdonnances);
router.get("/:id", getOrdonnanceById);
router.put("/:id", updateOrdonnance);
router.delete("/:id", deleteOrdonnance);

export default router;
