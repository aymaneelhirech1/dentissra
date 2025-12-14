import e from "express";
import * as inventoryController from "../controllers/inventory.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { Role } from "../libs/role.enum";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const inventoryRouter = e.Router();

// Routes principales
inventoryRouter.get(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  inventoryController.getAllInventory
);

inventoryRouter.post(
  "/",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Receptionist),
  inventoryController.createInventoryItem
);

inventoryRouter.get(
  "/low-stock",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  inventoryController.getLowStockItems
);

inventoryRouter.get(
  "/expired",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  inventoryController.getExpiredProducts
);

inventoryRouter.get(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Dentist, Role.Receptionist),
  inventoryController.getInventoryById
);

inventoryRouter.put(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin, Role.Receptionist),
  inventoryController.updateInventory
);

inventoryRouter.delete(
  "/:id",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  inventoryController.deleteInventory
);

export default inventoryRouter;
