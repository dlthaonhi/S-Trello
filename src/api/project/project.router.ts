import { Router } from "express";
// import { canAccessBy } from "../../middleware/checkpermission";
import { ProjectController } from "./project.controller";
import authenticateJWT from "@/middleware/authentication";
const projectRouter = Router();

projectRouter.post("/create", authenticateJWT, ProjectController.createProject);
projectRouter.put("/update/:projectId", authenticateJWT, ProjectController.updateProject);
projectRouter.patch("/archive/:projectId", authenticateJWT, ProjectController.archiveProject);

projectRouter.post("/member/:projectId", ProjectController.addMember);

export default projectRouter;
