import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { CommentService } from "./comment.service";

export const CommentController = {
    async updateComment(req: AuthenticatedRequest, res: Response) {
        const commentId: string | any = req.params.commentId;
        const newData: string = req.body.content;
        try {
            const serviceResponse = await CommentService.updateComment(commentId, newData);
            handleServiceResponse(serviceResponse, res);
        } catch (error) {
            const errorMessage = `Error updating comment: ${(error as Error).message}`;
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: ResponseStatus.Failed,
                message: errorMessage,
                data: null,
            });
        }
    },

    async deleteComment(req: AuthenticatedRequest, res: Response) {
        try {
            const commentId: string | any = req.params.commentId;
            const serviceResponse = await CommentService.deleteComment(commentId);
            handleServiceResponse(serviceResponse, res);
        } catch (error) {
            const errorMessage = `Error deleting comment: ${(error as Error).message}`;
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: ResponseStatus.Failed,
                message: errorMessage,
                data: null,
            });
        }
    }

};