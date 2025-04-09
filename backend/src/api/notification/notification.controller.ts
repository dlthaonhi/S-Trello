import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { NotificationService } from "./notification.service";


export const NotificationController = {
  async getAllNotificationsByUserId(req: AuthenticatedRequest, res: Response) {
    const userId:string | any = req.id;
    try {
      const serviceResponse = await NotificationService.getAllNotificationsByUserId(userId);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error retrieve notifications by user ID: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async readNotification(req: AuthenticatedRequest, res: Response) {
    const notificationId: string | any = req.params.notificationId;
    const value: boolean = true;
    try {
      const serviceResponse = await NotificationService.readNotification(notificationId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating read status: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async unreadNotification(req: AuthenticatedRequest, res: Response) {
    const notificationId: string | any = req.params.notificationId;
    const value: boolean = false;
    try {
      const serviceResponse = await NotificationService.readNotification(notificationId, value);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating unread status: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};