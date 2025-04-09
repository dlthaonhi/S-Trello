import { Router } from "express";
import authenticateJWT from "@/middleware/authentication";
import { canAccessBy } from "@/middleware/checkRole";
import { TemplateController } from "./template.controller";

const templateRouter = Router();

templateRouter.post("/",TemplateController.createTemplate);
 
export default templateRouter;