import { Router } from "express";
import { ProjectController } from "./project.controller";
import authenticateJWT from "@/middleware/authentication";
import { canAccessProject } from "@/middleware/checkRole";
const projectRouter = Router();

projectRouter.post("/create", authenticateJWT, ProjectController.createProject);
projectRouter.put("/update/:projectId", authenticateJWT, ProjectController.updateProject);
projectRouter.patch("/archive/:projectId", authenticateJWT, ProjectController.archiveProject);

projectRouter.post("/member/:projectId", canAccessProject("member", "admin"), ProjectController.addMember);
projectRouter.delete("/member/:projectId",canAccessProject("admin"), ProjectController.removeMember);



export default projectRouter;
