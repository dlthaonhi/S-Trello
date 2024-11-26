import { Router } from "express";
import { BoardController } from "./board.controller"
import { canAccessBy } from "@/middleware/checkRole";

const boardRouter = Router();

boardRouter.put("/:boardId", canAccessBy("board","member", "admin"), BoardController.updateBoard);
boardRouter.patch("/archive/:boardId", canAccessBy("board","member", "admin"), BoardController.archiveBoard);
boardRouter.patch("/unarchive/:boardId", canAccessBy("board","member", "admin"), BoardController.unarchiveBoard);

boardRouter.post("/member/:boardId", canAccessBy("board","member", "admin"), BoardController.addMember);
boardRouter.delete("/member/:boardId",canAccessBy("board", "admin"), BoardController.removeMember);

boardRouter.post("/:boardId/list",canAccessBy("board","member", "admin"), BoardController.createList)
boardRouter.post("/:boardId/lists/sort",canAccessBy("board","member", "admin"), BoardController.sortList)

export default boardRouter;
