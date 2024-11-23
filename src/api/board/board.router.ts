import { Router } from "express";
import { BoardController } from "./board.controller"
import authenticateJWT from "@/middleware/authentication";
import { canAccessProject } from "@/middleware/checkRole";

const boardRouter = Router();

boardRouter.put("/:boardId", authenticateJWT, BoardController.updateBoard);
boardRouter.patch("/archive/:boardId", authenticateJWT, BoardController.archiveBoard);
boardRouter.patch("/unarchive/:boardId", authenticateJWT, BoardController.unarchiveBoard);


// projectRouter.post("/member/:projectId", canAccessProject("member", "admin"), ProjectController.addMember);
// projectRouter.delete("/member/:projectId",canAccessProject("admin"), ProjectController.removeMember);

export default boardRouter;
