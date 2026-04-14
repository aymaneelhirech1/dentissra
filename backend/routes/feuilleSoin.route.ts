import { Router } from "express";
import {
  createFeuilleSoin,
  getAllFeuilles,
  getFeuilleById,
  updateFeuille,
  deleteFeuille,
} from "../controllers/feuilleSoin.controller";

const router = Router();

router.post("/", createFeuilleSoin);
router.get("/", getAllFeuilles);
router.get("/:id", getFeuilleById);
router.put("/:id", updateFeuille);
router.delete("/:id", deleteFeuille);

export default router;
