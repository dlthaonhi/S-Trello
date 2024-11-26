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
//   async addMember(req: AuthenticatedRequest, res: Response) {
//     // const userId:string | any = req.id;  // for notification api
//     try {
//       const projectId: string | any = req.params.projectId;
//       const userId: string[] | string = req.body.userId;
//       if (userId == undefined || userId == null)
//         throw new Error("Missing some non-nullable field")

//       let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
//       if(!userIds.length) 
//         throw new Error("Missing userId")
//       const serviceResponse = await ProjectService.addMembers(projectId, userIds);
//       handleServiceResponse(serviceResponse, res);
//     } catch (error: any) {
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         status: ResponseStatus.Failed,
//         message: error.message,
//         data: null,
//       });
//     }
//   },
//   async removeMember(req: AuthenticatedRequest, res: Response) {
//     try {
//       // const userId:string | any = req.id;  // for notification api
//       const projectId: string | any = req.params.projectId;
//       const userId: string[] | string = req.body.userId;
//       if (userId == undefined || userId == null)
//         throw new Error("Missing some non-nullable field")
//       let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
//       if(!userIds.length) 
//         throw new Error("Missing userId")
//       const serviceResponse = await ProjectService.removeMembers(projectId, userIds);
//       handleServiceResponse(serviceResponse, res);
//     } catch (error: any) {
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//         status: ResponseStatus.Failed,
//         message: error.message,
//         data: null,
//       });
//     }
//   },
//   async createBoard(req: AuthenticatedRequest, res: Response) {
//     const userId: string | any = req.id;
//     const projectId: string | any = req.params.projectId;
//     const boardData: Boards = req.body;
//     if (!boardData.title) 
//       throw new Error ("Missing some non-nullable field")
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