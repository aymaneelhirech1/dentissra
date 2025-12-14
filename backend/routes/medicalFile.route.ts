import e from "express";
import * as medicalFileController from "../controllers/medicalFile.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { upload } from "../middlewares/multer";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const medicalFileRouter = e.Router();

medicalFileRouter.get(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist),
  medicalFileController.getAllMedicalFiles
);
medicalFileRouter.post(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  upload.single("file"),
  medicalFileController.uploadMedicalFile
);
medicalFileRouter.get(
  "/:patientId",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist),
  medicalFileController.getMedicalFilesByPatient
);
medicalFileRouter.delete(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  medicalFileController.deleteMedicalFile
);

export default medicalFileRouter;
