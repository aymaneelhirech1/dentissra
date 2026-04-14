import e from "express";
import * as patientController from "../controllers/patient.controller";

const patientRouter = e.Router();

patientRouter.post("/", patientController.createPatient);
patientRouter.get("/", patientController.getAllPatients);
patientRouter.get("/:id", patientController.getPatientById);
patientRouter.put("/:id", patientController.updatePatient);
patientRouter.delete("/:id", patientController.deletePatient);

export default patientRouter;
