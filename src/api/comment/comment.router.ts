import { Router } from "express";
import { canAccessBy } from "@/middleware/checkRole";
import { CommentController } from "./comment.controller";

const commentRouter = Router();

commentRouter.put("/:commentId", CommentController.updateComment);
commentRouter.delete("/:commentId", CommentController.deleteComment);

export default commentRouter;
