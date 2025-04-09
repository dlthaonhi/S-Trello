import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { ListService } from "./list.service";
import { Boards } from "@/model/projects/boards.entity";
import { Lists } from "@/model/projects/lists.entity";
import { Cards } from "@/model/projects/cards.entity";

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
  async deleteList(req: Request, res: Response) {
      try {
        const listId = req.params.listId;
        const serviceResponse = await ListService.deleteList(listId);
        handleServiceResponse(serviceResponse, res);
      } catch (error) {
        const errorMessage = `Error deleting list: ${(error as Error).message}`;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: ResponseStatus.Failed,
          message: errorMessage,
          data: null,
        });
      }
      
    },
  
    async restoreList(req: Request, res: Response) {
      try {
        const listId = req.params.listId;
        const serviceResponse = await ListService.restoreList(listId);
        handleServiceResponse(serviceResponse, res);
      } catch (error) {
        const errorMessage = `Error deleting list: ${(error as Error).message}`;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: ResponseStatus.Failed,
          message: errorMessage,
          data: null,
        });
      }
      
    },
  async createCard(req: AuthenticatedRequest, res: Response) {
    const listId: string | any = req.params.listId;
    const cardData: Cards = req.body;
    if (!cardData.title) 
      throw new Error ("Missing some non-nullable field")
    try {
      const serviceResponse = await ListService.createCard(listId, cardData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};