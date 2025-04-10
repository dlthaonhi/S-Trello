import { Router } from "express";
import { UserController } from "./user.controller";
import authenticateJWT from "@/middleware/authentication";
const userRouter = Router();

// userRouter.get("/get-all", UserController.getAllUsers)
userRouter.put("/update", authenticateJWT, UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.patch("/:id/restore", UserController.restoreUser);
userRouter.get("/active", UserController.getActiveUsers);

export default userRouter;
