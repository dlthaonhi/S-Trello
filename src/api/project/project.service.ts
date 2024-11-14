import { Users } from "../../model/users.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { userRepository } from "../../api/user/userRepository";
import { projectRepository, projectMemberRepository } from "../project/projectRepository";
import { Projects } from "../../model/projects/projects.entity";
import { projectMembers } from "../../model/projects/projectMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";
import { type } from "os";
import { IsNull } from "typeorm";

export const ProjectService = {
  createProject: async (userId: string, projectData: Projects): Promise<ServiceResponse<Projects | null>> => {
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
  updateProject: async (projectId: string, newData: Partial<Projects>): Promise<ServiceResponse<Projects | null>> => {
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

  addMembers: async (projectId: string, userIds: string[] | string): Promise<ServiceResponse<projectMembers[] | projectMembers | null>> => {
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

      let addedMems;
      if (Array.isArray(userIds)) {
        let tempMem: Partial<projectMembers>[] = []
        for (const userId of userIds) {
          const existedMem = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, userId)
          if (!existedMem) {
            const user = await userRepository.findByIdAsync(userId);
            if (user === null) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                `User ID: ${userId} not found`,
                null,
                StatusCodes.BAD_REQUEST
              );
            }

            const addMem: Partial<projectMembers> = {
              userID: user,
              role: RoleType.MEMBER,
              projectID: project
            };
            tempMem.push(addMem);
          }
          else console.log(`Member with ID ${userId} 's existed in this project`);      
          
          addedMems = await projectMemberRepository.createManyProjectMembersAsync(tempMem);
        }
        
      }
      else {
        const user = await userRepository.findByIdAsync(userIds);
        if (!user) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "User ID: not found",
            null,
            StatusCodes.BAD_REQUEST
          );
        }
        const existedMem = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, userIds)
        if (!existedMem) {
          const addMem: Partial<projectMembers> = {
            userID: user,
            role: RoleType.MEMBER,
            projectID: project
          }
          addedMems = await projectMemberRepository.creatProjectMemberAsync(addMem);
        }
        else return new ServiceResponse(
          ResponseStatus.Failed,
          `Member with ID ${userIds} 's existed in this project`,
          null,
          StatusCodes.BAD_REQUEST
        );
       
      }
      if (Array.isArray(addedMems) && !addedMems.length)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "All users is existed in this project",
          null,
          StatusCodes.BAD_REQUEST
        ); 
      if (addedMems === undefined || addedMems === null) 
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding member(s)",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        ); 
      

      

      return new ServiceResponse<projectMembers[] | projectMembers>(
        ResponseStatus.Success,
        "Project member(s) added successfully!",
        addedMems,
        StatusCodes.OK
      );

    } catch (ex) {
      const errorMessage = `Error adding member(s): ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};