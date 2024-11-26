import { Router } from "express";
import { canAccessBy } from "@/middleware/checkRole";
import { ListController } from "./list.controller";

const listRouter = Router();

listRouter.put("/:listId", canAccessBy("list","member", "admin"), ListController.updateList);
listRouter.patch("/archive/:listId", canAccessBy("board","member", "admin"), ListController.archiveList);
listRouter.patch("/unarchive/:listId", canAccessBy("board","member", "admin"), ListController.unarchiveList);

// listRouter.post("/member/:boardId", canAccessBy("board","member", "admin"), BoardController.addMember);
// listRouter.delete("/member/:boardId",canAccessBy("board", "admin"), BoardController.removeMember);

// listRouter.post("/:boardId/list",canAccessBy("board","member", "admin"), BoardController.createList)
export default listRouter;
