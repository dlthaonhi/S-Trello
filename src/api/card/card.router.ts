import { Router } from "express";
import authenticateJWT from "@/middleware/authentication";
import { canAccessBy } from "@/middleware/checkRole";
import { CardController } from "./card.controller";
const cardRouter = Router();

cardRouter.put("/:cardId", CardController.updateCard);
cardRouter.patch("/archive/:cardId", CardController.archiveCard);
cardRouter.patch("/unarchive/:cardId", CardController.unarchiveCard);

// cardRouter.post("/member/:cardId", canAccessBy("project","member", "admin"), CardController.addMember);
// cardRouter.delete("/member/:cardId",canAccessBy("project","member", "admin"), CardController.removeMember);

// cardRouter.post("/:cardId/board", canAccessBy("project","admin"), CardController.createBoard)



export default cardRouter;
