import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { BoardService } from "./board.service";
import { Projects } from "../../model/projects/projects.entity";
import { Boards } from "@/model/projects/boards.entity";
import { VisibilityType } from "@/model/base/enumType.entity";
import { Lists } from "@/model/projects/lists.entity";

export const BoardController = {
  async updateBoard(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const boardId: string | any = req.params.boardId;
    const newData: Boards = req.body;
    try {
      const serviceResponse = await BoardService.updateBoard(boardId, newData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating board: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveBoard(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const boardId: string | any = req.params.boardId;
    const value: boolean = true;
    try {
      const serviceResponse = await BoardService.archiveBoard(boardId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archiving board: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async unarchiveBoard(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const boardId: string | any = req.params.boardId;
    const value: boolean = false;
    console.log(boardId);
    
    try {
      const serviceResponse = await BoardService.archiveBoard(boardId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error unarchiving board: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async addMember(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    try {
      const boardId: string | any = req.params.boardId;
      const userId: string[] | string = req.body.userId;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")
      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing userId")
      const serviceResponse = await BoardService.addMembers(boardId, userIds);
      handleServiceResponse(serviceResponse, res);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: error.message,
        data: null,
      });
    }
  },
  async removeMember(req: AuthenticatedRequest, res: Response) {
    try {
      // const userId:string | any = req.id;  // for notification api      
      const boardId: string | any = req.params.boardId;
      const userId: string[] | string = req.body.userId;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")
      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing userId")
      const serviceResponse = await BoardService.removeMembers(boardId, userIds);
      handleServiceResponse(serviceResponse, res);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: error.message,
        data: null,
      });
    }
  },
  async createList(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const boardId: string | any = req.params.boardId;
    const listData: Lists = req.body;
    if (!listData.title) 
      throw new Error ("Missing some non-nullable field")
    try {
      const serviceResponse = await BoardService.createList(userId, boardId, listData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};