import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { ListService } from "./list.service";
import { Boards } from "@/model/projects/boards.entity";
import { Lists } from "@/model/projects/lists.entity";

export const ListController = {
  async updateList(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const listId: string | any = req.params.listId;
    const newData: Lists = req.body;
    try {
      const serviceResponse = await ListService.updateList(listId, newData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveList(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const listId: string | any = req.params.listId;
    const value: boolean = true;
    try {
      const serviceResponse = await ListService.archiveList(listId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archiving list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async unarchiveList(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const listId: string | any = req.params.listId;
    const value: boolean = false;
    
    try {
      const serviceResponse = await ListService.archiveList(listId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error unarchiving list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
//   async createList(req: AuthenticatedRequest, res: Response) {
//     const userId: string | any = req.id;
//     const boardId: string | any = req.params.boardId;
//     const listData: Lists = req.body;
//     if (!listData.title) 
//       throw new Error ("Missing some non-nullable field")
//     try {
//       const serviceResponse = await BoardService.createList(userId, boardId, listData);
//       handleServiceResponse(serviceResponse, res);
//     } catch (error) {
//       const errorMessage = `Error creating list: ${(error as Error).message}`;
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         status: ResponseStatus.Failed,
//         message: errorMessage,
//         data: null,
//       });
//     }
//   },

};