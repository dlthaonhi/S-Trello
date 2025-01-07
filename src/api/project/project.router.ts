import { Router } from "express";
import { ProjectController } from "./project.controller";
import authenticateJWT from "@/middleware/authentication";
import { canAccessBy } from "@/middleware/checkRole";
const projectRouter = Router();

projectRouter.post("/create", authenticateJWT, ProjectController.createProject);
projectRouter.put("/update/:projectId", authenticateJWT, ProjectController.updateProject);
projectRouter.patch("/archive/:projectId", authenticateJWT, ProjectController.archiveProject);
projectRouter.patch("/unarchive/:projectId", authenticateJWT, ProjectController.unarchiveProject);
projectRouter.delete("/:projectId", ProjectController.deleteProject); // Xóa mềm
projectRouter.patch("/:projectId/restore", ProjectController.restoreProject); // Khôi phục


projectRouter.post("/member/:projectId", canAccessBy("project","member", "admin"), ProjectController.addMember);
projectRouter.delete("/member/:projectId",canAccessBy("project","member", "admin"), ProjectController.removeMember);

projectRouter.post("/:projectId/board", canAccessBy("project","admin"), ProjectController.createBoard)



export default projectRouter;
