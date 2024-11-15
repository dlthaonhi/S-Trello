import { Router } from "express";
import { UserController } from "./user.controller";
import authenticateJWT from "@/middleware/authentication";
const userRouter = Router();

// userRouter.get("/get-me", AuthController.register);
// userRouter.get("/get-all", UserController.getAllUsers)
userRouter.put("/update", authenticateJWT, UserController.updateUser);

export default userRouter;
