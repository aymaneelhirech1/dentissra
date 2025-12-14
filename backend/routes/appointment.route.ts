import e from "express";
import * as appointmentController from "../controllers/appointment.controller";

const appointmentRouter = e.Router();

appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.get("/", appointmentController.getAllAppointments);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.put("/:id", appointmentController.updateAppointment);
appointmentRouter.delete("/:id", appointmentController.deleteAppointment);

export default appointmentRouter;
