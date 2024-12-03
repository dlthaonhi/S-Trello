import { Router } from "express";
import authenticateJWT from "@/middleware/authentication";
import { canAccessBy } from "@/middleware/checkRole";
import { CardController } from "./card.controller";
const cardRouter = Router();

cardRouter.put("/:cardId", CardController.updateCard);
cardRouter.patch("/archive/:cardId", CardController.archiveCard);
cardRouter.patch("/unarchive/:cardId", CardController.unarchiveCard);

cardRouter.post("/:cardId/assign", CardController.assignMember);
cardRouter.delete("/:cardId/unassign", CardController.unassignMember);

cardRouter.post("/:cardId/move", CardController.moveCard);

cardRouter.post("/:cardId/comment", CardController.createComment);


export default cardRouter;
