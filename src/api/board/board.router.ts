import { Router } from "express";
import { BoardController } from "./board.controller"
import authenticateJWT from "@/middleware/authentication";
import { canAccessBoard } from "@/middleware/checkRole";

const boardRouter = Router();

boardRouter.put("/:boardId", canAccessBoard("admin", "member"), BoardController.updateBoard);
boardRouter.patch("/archive/:boardId", canAccessBoard("admin", "member"), BoardController.archiveBoard);
boardRouter.patch("/unarchive/:boardId", canAccessBoard("admin", "member"), BoardController.unarchiveBoard);

boardRouter.post("/member/:boardId", canAccessBoard("member", "admin"), BoardController.addMember);
boardRouter.delete("/member/:boardId",canAccessBoard("admin"), BoardController.removeMember);

export default boardRouter;
