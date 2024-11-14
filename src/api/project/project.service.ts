import { Users } from "../../model/users.entity";
import {
    ServiceResponse,
    ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { userRepository } from "../../api/user/userRepository";
import { projectRepository,projectMemberRepository} from "../project/projectRepository";
import { Projects } from "../../model/projects/projects.entity";
import { projectMembers } from "../../model/projects/projectMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";

export const ProjectService = {
    createProject:  async (userId: string, projectData: Projects): Promise<ServiceResponse<Projects | null>> => {
        try {
            const user = await userRepository.findByIdAsync(userId);
            if (!user) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "UserID: Not found",
                null,
                StatusCodes.BAD_REQUEST
              );
            }
            projectData.user = user;
            const createdProject = await projectRepository.createProjectAsync(projectData);
            if (!createdProject) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "Error creating project",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
              );
            }
      
            const memData = {
              role: RoleType.ADMIN,
              userID: user,
              projectID: createdProject
            }
            const createdMem = await projectMemberRepository.creatProjectMemberAsync(memData);
            if (!createdMem) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "Error creating project admin",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
              );
            }
            projectData.projectMembers = [createdMem];

            return new ServiceResponse<Projects>(
              ResponseStatus.Success,
              "New project's created successfully!",
              createdProject,
              StatusCodes.CREATED
            );
          } catch (ex) {
            const errorMessage = `Error updating users: ${(ex as Error).message}`;
            return new ServiceResponse(
              ResponseStatus.Failed,
              errorMessage,
              null,
              StatusCodes.INTERNAL_SERVER_ERROR
            );
          }
    },
    updateProject:  async (projectId: string, newData:Partial<Projects>): Promise<ServiceResponse<Projects | null>> => {
        try {          
            const project = await projectRepository.findByIdAsync(projectId);
                    
            if (!project) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "Project ID: not found",
                null,
                StatusCodes.BAD_REQUEST
              );
            }
            
            const updatedProject = await projectRepository.updateProjectByIdAsync(projectId, newData);

            if (!updatedProject) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "Error updating project",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
              );
            }
      
            return new ServiceResponse<Projects>(
              ResponseStatus.Success,
              "Project updated successfully!",
              updatedProject,
              StatusCodes.CREATED
            );
          } catch (ex) {
            const errorMessage = `Error updating projects: ${(ex as Error).message}`;
            return new ServiceResponse(
              ResponseStatus.Failed,
              errorMessage,
              null,
              StatusCodes.INTERNAL_SERVER_ERROR
            );
          }
    },
    archiveProject: async (projectId: string): Promise<ServiceResponse<Projects | null>> => {
      try {
        const project = await projectRepository.findByIdAsync(projectId);
    
        if (!project) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "Project ID: not found",
            null,
            StatusCodes.BAD_REQUEST
          );
        }
    
        const newData: Partial<Projects> = { is_archive: !project.is_archive };
        const archiveProject = await projectRepository.updateProjectByIdAsync(projectId, newData);
    
        if (!archiveProject) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "Error updating archive status",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
    
        return new ServiceResponse<Projects>(
          ResponseStatus.Success,
          "Project archive status updated successfully!",
          archiveProject,
          StatusCodes.OK 
        );
      } catch (ex) {
        const errorMessage = `Error updating archive status: ${(ex as Error).message}`;
        return new ServiceResponse(
          ResponseStatus.Failed,
          errorMessage,
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    },
    
};