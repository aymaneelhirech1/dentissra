import express from "express";
import * as settingsController from "../controllers/settings.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { upload } from "../middlewares/multer";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const settingsRouter = express.Router();

settingsRouter.get(
  "/cabinet",
  isAuthenticate,
  settingsController.getCabinetSettings
);

settingsRouter.post(
  "/cabinet",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  upload.fields([{ name: "logo", maxCount: 1 }]),
  settingsController.updateCabinetSettings
);

settingsRouter.post(
  "/admin",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  upload.fields([{ name: "photo", maxCount: 1 }]),
  settingsController.updateAdminSettings
);

export default settingsRouter;
