// import { Router } from "express";
// import { canAccessBy } from "@/middleware/checkRole";
// import { ListController } from "./list.controller";

// const listRouter = Router();

// listRouter.put("/:listId", canAccessBy("list","member", "admin"), ListController.updateList);
// listRouter.patch("/archive/:listId", canAccessBy("list","member", "admin"), ListController.archiveList);
// listRouter.patch("/unarchive/:listId", canAccessBy("list","member", "admin"), ListController.unarchiveList);

// listRouter.post("/:listId/card",canAccessBy("list","member", "admin"), ListController.createCard)
// export default listRouter;
