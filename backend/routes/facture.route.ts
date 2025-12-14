import express from "express";
import {
  createFacture,
  getFactures,
  getFactureById,
  updateFacture,
  deleteFacture,
} from "../controllers/facture.controller";
import { generateFacturePDF } from "../controllers/facturePDF.controller";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post("/", upload.single("fichierTracabilite"), createFacture);
router.get("/", getFactures);
router.get("/:id", getFactureById);
router.get("/:id/pdf", generateFacturePDF);
router.put("/:id", upload.single("fichierTracabilite"), updateFacture);
router.delete("/:id", deleteFacture);

export default router;
