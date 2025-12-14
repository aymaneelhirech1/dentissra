import e from "express";
import * as invoiceController from "../controllers/invoice.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const invoiceRouter = e.Router();

invoiceRouter.get(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  invoiceController.getAllInvoices
);
invoiceRouter.post(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  invoiceController.createInvoice
);
invoiceRouter.get(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  invoiceController.getInvoiceById
);
invoiceRouter.put(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  invoiceController.updateInvoice
);
invoiceRouter.delete(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  invoiceController.deleteInvoice
);

export default invoiceRouter;
