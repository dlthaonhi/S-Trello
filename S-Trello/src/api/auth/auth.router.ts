import { Router } from "express";
import { AuthController } from "../auth/auth.controller";
import authenticateJWT from "@/middleware/authentication";
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/user/:id",authenticateJWT ,AuthController.getUser);

authRouter.get('/activate', AuthController.activateEmail);

//OAUTH2
authRouter.get('/google', AuthController.redirectGoogleConsentScreen);
// route.get('/google/callback', AuthController.handleGoogleRes);

export default authRouter;
