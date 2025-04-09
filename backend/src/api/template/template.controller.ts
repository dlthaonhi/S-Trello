import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { Boards } from "@/model/projects/boards.entity";
import { TemplateService } from "./template.service";

export const TemplateController = {
  async createTemplate(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const templateData: Boards = req.body;
    if (!templateData.title) 
      throw new Error ("Missing some non-nullable field")
    try {
      const serviceResponse = await TemplateService.createTemplate(userId, templateData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating template: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};