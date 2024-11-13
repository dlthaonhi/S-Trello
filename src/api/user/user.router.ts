import { Router } from "express";
import { canAccessBy } from "../../middleware/checkpermission";
import { UserController } from "./user.controller";
import authenticateJWT from "@/middleware/authentication";
const userRouter = Router();

// userRouter.get("/get-me", AuthController.register);
userRouter.put("/update", authenticateJWT, UserController.updateUser);

export default userRouter;
