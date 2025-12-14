import express from "express";
import { getDoctorDashboard } from "../controllers/doctor.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const router = express.Router();

router.get("/dashboard", isAuthenticate, authorizeRoles(Role.Dentist), getDoctorDashboard);

export default router;
