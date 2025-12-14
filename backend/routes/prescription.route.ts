import e from "express";
import * as prescriptionController from "../controllers/prescription.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { Role } from "../libs/role.enum";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const prescriptionRouter = e.Router();

prescriptionRouter.get(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist),
  prescriptionController.getAllPrescriptions
);
prescriptionRouter.post(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  prescriptionController.createPrescription
);
prescriptionRouter.get(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist),
  prescriptionController.getPrescriptionById
);
prescriptionRouter.put(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  prescriptionController.updatePrescription
);
prescriptionRouter.delete(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  prescriptionController.deletePrescription
);

export default prescriptionRouter;
