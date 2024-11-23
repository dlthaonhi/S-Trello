import { Router } from "express";
import { ProjectController } from "./project.controller";
import authenticateJWT from "@/middleware/authentication";
import { canAccessProject } from "@/middleware/checkRole";
const projectRouter = Router();

projectRouter.post("/create", authenticateJWT, ProjectController.createProject);
projectRouter.put("/update/:projectId", authenticateJWT, ProjectController.updateProject);
projectRouter.patch("/archive/:projectId", authenticateJWT, ProjectController.archiveProject);
projectRouter.patch("/unarchive/:projectId", authenticateJWT, ProjectController.unarchiveProject);

projectRouter.post("/member/:projectId", canAccessProject("member", "admin"), ProjectController.addMember);
projectRouter.delete("/member/:projectId",canAccessProject("admin"), ProjectController.removeMember);

projectRouter.post("/:projectId/board", canAccessProject("member", "admin"), ProjectController.createBoard)



export default projectRouter;
