import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus } from "../../services/serviceResponse";
import { handleServiceResponse } from "../../services/httpHandlerResponse";
import type {AuthenticatedRequest} from "../../middleware/authentication"
import { ProjectService } from "./project.service";
import { Projects } from "../../model/projects/projects.entity";
import { projectRepository } from "./projectRepository";
import { Boards } from "@/model/projects/boards.entity";

export const ProjectController = {
  async createProject (req: AuthenticatedRequest, res: Response) {
    console.log("Vao create");
    
    const userId:string | any = req.id;    
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
  async addMember (req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const projectId: string | any = req.params.projectId; 
    const userIds: string[] | string = req.body.userId;  
    
    try {
      const serviceResponse = await ProjectService.addMembers(projectId, userIds);
      handleServiceResponse(serviceResponse, res);      
    } catch (error) {
      const errorMessage = `Error adding member(s): ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async removeMember (req: AuthenticatedRequest, res: Response) {
    // const userId:string | any = req.id;  // for notification api
    const projectId: string | any = req.params.projectId; 
    const userIds: string[] | string = req.body.userId;  
    console.log("userIds", userIds);
    
    try {
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
  async createBoard (req: AuthenticatedRequest, res: Response) {
    const userId:string | any = req.id; 
    const projectId: string | any = req.params.projectId;
    const boardData: Boards = req.body;
    if (!boardData.title || !boardData.visibility) return (
      ResponseStatus.Failed,
      "Missing some non-nullable field",
      null,
      StatusCodes.BAD_REQUEST
    ); 
    
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