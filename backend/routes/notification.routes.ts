import e from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import * as notificationController from "../controllers/notification.controller";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { Role } from "../libs/role.enum";

const notificationRouter = e.Router();

notificationRouter.get(
  "/",
  isAuthenticate,
  notificationController.getUserNotifications
);
notificationRouter.put(
  "/:id/read",
  isAuthenticate,
  authorizeRoles(Role.Admin),
  notificationController.markNotificationRead
);

export default notificationRouter;
