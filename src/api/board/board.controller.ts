import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { BoardService } from "./board.service";
import { Projects } from "../../model/projects/projects.entity";
import { Boards } from "@/model/projects/boards.entity";
import { VisibilityType } from "@/model/base/enumType.entity";

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
//   async createBoard(req: AuthenticatedRequest, res: Response) {
//     const userId: string | any = req.id;
//     const projectId: string | any = req.params.projectId;
//     const boardData: Boards = req.body;
//     if (!boardData.title) 
//       throw new Error ("Missing some non-nullable field")
//     if (boardData.visibility != VisibilityType.PRIVATE && boardData.visibility != VisibilityType.WORKSPACE)
//       throw new Error ("Visibility type must be workspace or private");
//     try {
//       const serviceResponse = await ProjectService.createBoard(userId, projectId, boardData);
//       handleServiceResponse(serviceResponse, res);
//     } catch (error) {
//       const errorMessage = `Error creating board: ${(error as Error).message}`;
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         status: ResponseStatus.Failed,
//         message: errorMessage,
//         data: null,
//       });
//     }
//   },

};