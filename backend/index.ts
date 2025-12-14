import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connecDB } from "./libs/connectDB";
import userRouter from "./routes/user.route";
import supplierRouter from "./routes/supplier.route";
import prescriptionRouter from "./routes/prescription.route";
import patientRouter from "./routes/patient.route";
import medicalFileRouter from "./routes/medicalFile.route";
import invoiceRouter from "./routes/invoice.route";
import inventoryRouter from "./routes/inventory.route";
import appointmentRouter from "./routes/appointment.route";
import roleRouter from "./routes/role.route";
import feuilleSoinRouter from "./routes/feuilleSoin.route";
import ordonnanceRouter from "./routes/ordonnance.route";
import factureRouter from "./routes/facture.route";
import { checkUpcomingAppointments } from "./appointmentReminder";
import notificationRouter from "./routes/notification.routes";
import settingsRouter from "./routes/settings.route";
import personnelRouter from "./routes/personnel.route";
import whatsappRouter from "./routes/whatsapp.route";

dotenv.config();
const app = express();

connecDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:5180", "http://localhost:5181", "http://localhost:5182", "http://localhost:5183", "http://localhost:5184", "http://localhost:5185", "http://localhost:5186", "http://localhost:5187"],
    credentials: true,
  })
);
app.use(express.json());

setInterval(() => {
  console.log("Loading...");

  checkUpcomingAppointments().catch(console.error);
}, 60 * 1000);

app.get("/", (req, res) => {
  res.send(
    `<h3 style="font-family: sans-serif">Server is running on port ${port}</h3>`
  );
});

app.use("/api/auth", userRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/prescription", prescriptionRouter);
app.use("/api/patient", patientRouter);
app.use("/api/medicalFile", medicalFileRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/role", roleRouter);
app.use("/api/feuilles", feuilleSoinRouter);
app.use("/api/ordonnances", ordonnanceRouter);
app.use("/api/factures", factureRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/personnel", personnelRouter);
app.use("/api/whatsapp", whatsappRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
