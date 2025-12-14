import e from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { updateUserRole } from "../controllers/role.controller";
import { Role } from "../libs/role.enum";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const roleRouter = e.Router();

roleRouter.put('/role/:userId', isAuthenticate, authorizeRoles(Role.Admin), updateUserRole);

export default roleRouter;