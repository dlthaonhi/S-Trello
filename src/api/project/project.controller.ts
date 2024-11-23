import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type { AuthenticatedRequest } from "../../middleware/authentication"
import { ProjectService } from "./project.service";
import { Projects } from "../../model/projects/projects.entity";
import { Boards } from "@/model/projects/boards.entity";

export const ProjectController = {
  async createProject(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const projectData: Projects = req.body;
    try {
      const serviceResponse = await ProjectService.createProject(userId, projectData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating project: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async updateProject(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const projectId: string | any = req.params.projectId;
    const newData: Projects = req.body;
    try {
      const serviceResponse = await ProjectService.updateProject(projectId, newData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating project: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveProject(req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const projectId: string | any = req.params.projectId;
    try {
      const serviceResponse = await ProjectService.archiveProject(projectId);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archiving project: ${(error as Error).message}`;
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
      const projectId: string | any = req.params.projectId;
      const userId: string[] | string = req.body.userId;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")

      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing userId")
      const serviceResponse = await ProjectService.addMembers(projectId, userIds);
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
      const projectId: string | any = req.params.projectId;
      const userId: string[] | string = req.body.userId;
      if (userId == undefined || userId == null)
        throw new Error("Missing some non-nullable field")
      let userIds: string[] = (typeof (userId) == 'string') ? [userId] : userId;
      if(!userIds.length) 
        throw new Error("Missing userId")
      const serviceResponse = await ProjectService.removeMembers(projectId, userIds);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error removing member(s): ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async createBoard(req: AuthenticatedRequest, res: Response) {
    const userId: string | any = req.id;
    const projectId: string | any = req.params.projectId;
    const boardData: Boards = req.body;
    if (!boardData.title || !boardData.visibility) 
      throw new Error ("Missing some non-nullable field")
    
    try {
      const serviceResponse = await ProjectService.createBoard(userId, projectId, boardData);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error creating board: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

};