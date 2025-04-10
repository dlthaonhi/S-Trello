import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Login } from "./auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";


export const AuthController = {
  async register(req: Request, res: Response) {
    const userData: Users = req.body;
    try {
      const serviceResponse = await authService.register(userData);
      handleServiceResponse(serviceResponse, res);  
    } catch (error) {
      console.log("error: ", error);
      
      const errorMessage = `Error creating user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response) {
    const loginData: Login = req.body;
    try {
      const serviceResponse = await authService.login(loginData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: "Error logging in",
        error: (error as Error).message,
      });
    }
  },
  async getUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const serviceResponse = await authService.getUserRedis(userId);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error getting user: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

  async activateEmail(req: Request, res: Response) {
    const token= req.query.token as string;
    try {
      const serviceResponse = await authService.verifyUser(token);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error activating email: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

  async redirectGoogleConsentScreen(req: Request, res: Response){
    try {
      const serviceResponse = await authService.redirectGoogleConsentScreen();
      // res.redirect(serviceResponse.data as string)
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error activating email: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};
