import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type {AuthenticatedRequest} from "../../middleware/authentication"
import { UserService } from "./user.service";
import { Users } from "../../model/users.entity";

export const UserController = {
  
  async updateUser(req: AuthenticatedRequest, res: Response) {
    const userId:string | any = req.id;    
    const newData: Users = req.body;
    try {
      const serviceResponse = await UserService.updateUser(userId, newData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};