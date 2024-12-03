import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { Cards } from "@/model/projects/cards.entity";
import { CardService } from "./card.service";


export const CardController = {
  async updateCard(req: AuthenticatedRequest, res: Response) {
    const cardId: string | any = req.params.cardId;
    const newData: Cards = req.body;
    try {
      const serviceResponse = await CardService.updateCard(cardId, newData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveCard(req: AuthenticatedRequest, res: Response) {
    const cardId: string | any = req.params.cardId;
    const value: boolean = true;
    try {
      const serviceResponse = await CardService.archiveCard(cardId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archiving card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async unarchiveCard(req: AuthenticatedRequest, res: Response) {
    const cardId: string | any = req.params.cardId;
    const value: boolean = false;
    try {
      const serviceResponse = await CardService.archiveCard(cardId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error unarchiving card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async assignMember(req: AuthenticatedRequest, res: Response) {
    try {
      const cardId: string | any = req.params.cardId;
      const userId: string[] | string = req.body.assignees;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")

      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing assignees with userId(s)")
      const serviceResponse = await CardService.assignMembers(cardId, userIds);
      handleServiceResponse(serviceResponse, res);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: error.message,
        data: null,
      });
    }
  },
  async unassignMember(req: AuthenticatedRequest, res: Response) {
    try {
      const cardId: string | any = req.params.cardId;
      const userId: string[] | string = req.body.unassignees;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")
      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing userId")
      const serviceResponse = await CardService.unassignMembers(cardId, userIds);
      handleServiceResponse(serviceResponse, res);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: error.message,
        data: null,
      });
    }
  },
  async moveCard(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const cardId: string | any = req.params.cardId;
    const data = {
      newPosition: req.body.position,
      newList: req.body.listId,
      newBoard: req.body.boardId
    }
    // if (!boardData.title) 
    //   throw new Error ("Missing some non-nullable field")
    try {
      const serviceResponse = await CardService.moveCard(cardId, data.newList, data.newBoard, data.newPosition);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error moving card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async createComment(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const cardId: string | any = req.params.cardId;
    const content: string = req.body.content;
    if (!content) 
      throw new Error ("Missing comment's content")
    try {
      const serviceResponse = await CardService.addComment(userId, cardId, content);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating comment: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};