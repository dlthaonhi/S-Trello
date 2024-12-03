import { Comments } from "@/model/projects/comments.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { cardRepository } from "../card/cardRepository";
import { commentRepository } from "./commentRepository";

export const CommentService = {
  updateComment: async (commentId: string, newData: string): Promise<ServiceResponse<Comments | null>> => {
    try {
      const comment = await commentRepository.findByIdAsync(commentId);
      if (!comment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Comment ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      comment.content = newData;

      const updatedComment = await commentRepository.updateCommentByIdAsync(commentId, comment);
      if (!updatedComment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating comment",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Comments>(
        ResponseStatus.Success,
        "Comment updated successfully!",
        updatedComment,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating comment: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  deleteComment: async (commentId: string): Promise<ServiceResponse<Comments|null>> => {
    try {
      const comment = await commentRepository.findByIdAsync(commentId);
      if (!comment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Comment ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const deletedComment = await commentRepository.deleteCommentAsync(commentId);
      if (!deletedComment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error deleting comment",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Comments>(
        ResponseStatus.Success,
        "Comment deleted successfully!",
        deletedComment,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error deleting comment: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};