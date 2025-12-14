import e from "express";
import * as supplierController from "../controllers/supplier.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const supplierRouter = e.Router();

supplierRouter.get(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  supplierController.getAllSuppliers
);
supplierRouter.post(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  supplierController.createSupplier
);
supplierRouter.get(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  supplierController.getSupplierById
);
supplierRouter.put(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  supplierController.updateSupplier
);
supplierRouter.delete(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  supplierController.deleteSupplier
);

export default supplierRouter;
