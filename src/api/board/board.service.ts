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
import { RoleType, VisibilityType } from "../../model/base/enumType.entity";
import { type } from "os";
import { IsNull } from "typeorm";
import { Boards } from "@/model/projects/boards.entity";
import { BoardMembers } from "@/model/projects/boardMembers.entity";
import { boardMemberRepository, boardRepository } from "../board/boardRepository";

export const BoardService = {
  updateBoard: async (boardId: string, newData: Partial<Boards>): Promise<ServiceResponse<Boards | null>> => {
    try {
      const board = await boardRepository.findByIdAsync(boardId);
      if (!board) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const updatedBoard = await boardRepository.updateBoardByIdAsync(boardId, { ...board, ...newData });
      if (!updatedBoard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating board",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "Board updated successfully!",
        updatedBoard,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating board: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  archiveBoard: async (boardId: string, value: boolean): Promise<ServiceResponse<Boards | null>> => {
    try {
      const board = await boardRepository.findByIdAsync(boardId);
      if (!board) 
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      
      if (board.is_archive == value) 
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board is already archived/ unarchived",
          null,
          StatusCodes.BAD_REQUEST
        );
      const newData: Partial<Boards> = { is_archive: value };      
      const archiveBoard = await boardRepository.updateBoardByIdAsync(boardId, {...board, ...newData});
      
      if (!archiveBoard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating archive status",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "Board archive status updated successfully!",
        archiveBoard,
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
//   addMembers: async (projectId: string, userIds: string[]): Promise<ServiceResponse<projectMembers[] | projectMembers | null>> => {
//     try {
//       const project = await projectRepository.findByIdAsync(projectId);
//       if (!project) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Project ID: not found",
//           null,
//           StatusCodes.BAD_REQUEST
//         );
//       }

//       let tempMem: Partial<projectMembers>[] = []
//       for (const userId of userIds) {
//         const existedMem = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, userId)
//         if (!existedMem) {
//           const user = await userRepository.findByIdAsync(userId);
//           if (!user) {
//             return new ServiceResponse(
//               ResponseStatus.Failed,
//               `User ID: ${userId} not found`,
//               null,
//               StatusCodes.BAD_REQUEST
//             );
//           }

//           const addMem: Partial<projectMembers> = {
//             userID: user,
//             role: RoleType.MEMBER,
//             projectID: project
//           };

//           tempMem.push(addMem);
//         }
//         else console.log(`Member with ID ${userId} 's existed in this project`);

//       }
//       const addedMems = await projectMemberRepository.createManyProjectMembersAsync(tempMem);
//       if (addedMems === undefined || addedMems === null)
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Error adding member(s)",
//           null,
//           StatusCodes.INTERNAL_SERVER_ERROR
//         );

//       if (!addedMems.length)
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "All users is existed in this project",
//           null,
//           StatusCodes.BAD_REQUEST
//         );


//       return new ServiceResponse<projectMembers[] | projectMembers>(
//         ResponseStatus.Success,
//         "Project member(s) added successfully!",
//         addedMems,
//         StatusCodes.OK
//       );

//     } catch (ex) {
//       const errorMessage = `Error adding member(s): ${(ex as Error).message}`;
//       return new ServiceResponse(
//         ResponseStatus.Failed,
//         errorMessage,
//         null,
//         StatusCodes.INTERNAL_SERVER_ERROR
//       );
//     }
//   },
//   removeMembers: async (projectId: string, userIds: string[] | string): Promise<ServiceResponse<projectMembers[] | projectMembers | null>> => {
//     try {
//       const project = await projectMemberRepository.findByProjectIdAsync(projectId);
//       if (!project) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Project ID: not found",
//           null,
//           StatusCodes.BAD_REQUEST
//         );
//       }

//       let removedMems: projectMembers[] = []
//       for (const userId of userIds) {
//         const existedMem = await projectMemberRepository.findByProjectAndUserIdAsync(projectId, userId)
//         if (existedMem) {
//           const removedUser = await projectMemberRepository.deleteProjectMembersAsync(projectId, userId)
//           if (removedUser) removedMems.push(removedUser);
//         }
//         else console.log(`User with ID ${userId} isn't existed in this project`);
//       }
//       if (removedMems === undefined || removedMems === null)
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Error removing member(s) from this project",
//           null,
//           StatusCodes.INTERNAL_SERVER_ERROR
//         );

//       if (!removedMems.length)
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "All users isn't existed in this project",
//           null,
//           StatusCodes.BAD_REQUEST
//         );


//       return new ServiceResponse<projectMembers[] | projectMembers>(
//         ResponseStatus.Success,
//         "Project member(s) removed successfully!",
//         removedMems,
//         StatusCodes.OK
//       );

//     } catch (ex) {
//       const errorMessage = `Error removing member(s): ${(ex as Error).message}`;
//       return new ServiceResponse(
//         ResponseStatus.Failed,
//         errorMessage,
//         null,
//         StatusCodes.INTERNAL_SERVER_ERROR
//       );
//     }
//   },
//   createBoard: async (userId: string, projectId: string, boardData: Boards): Promise<ServiceResponse<Boards | null>> => {
//     try {      
//       const user = await userRepository.findByIdAsync(userId);
//       if (!user) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "UserID: Not found",
//           null,
//           StatusCodes.BAD_REQUEST
//         );
//       }
//       const project = await projectRepository.findByIdAsync(projectId)
//       if (!project) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "ProjectID: Not found",
//           null,
//           StatusCodes.BAD_REQUEST
//         );
//       }
//       boardData.user = user;
//       boardData.project = project;
//       if (!boardData.visibility) boardData.visibility = VisibilityType.WORKSPACE;
//       const createdBoard = await boardRepository.createBoardAsync(boardData);
//       if (!createdBoard) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Error creating board",
//           null,
//           StatusCodes.INTERNAL_SERVER_ERROR
//         );
//       }

//       if (boardData.visibility === VisibilityType.WORKSPACE) {
//         const projectMembers = await projectMemberRepository.findAllByProjectIdAsync(projectId, ["userID"]);
//         console.log(projectMembers);
        
//         const boardMembers: Partial<BoardMembers>[] = projectMembers.map(projectMember => {
//           let boardMember: Partial<BoardMembers> ;
//           if (projectMember.userID.id == userId) {
//             boardMember = {
//               role: RoleType.ADMIN,
//               userID: projectMember.userID,
//               boardID: createdBoard
//             }
//           }
//           else {
//             boardMember= {
//               role: RoleType.MEMBER,
//               userID: projectMember.userID,
//               boardID: createdBoard
//             }
//           }
        
//           return boardMember;
//         })
//         const createdMem = await boardMemberRepository.createManyBoardMembersAsync(boardMembers)
//         if (!createdMem) {
//           return new ServiceResponse(
//             ResponseStatus.Failed,
//             "Error creating board members",
//             null,
//             StatusCodes.INTERNAL_SERVER_ERROR
//           );
//         }
//       }
//       if (boardData.visibility === VisibilityType.PRIVATE) {
//         const adminData = {
//           role: RoleType.ADMIN,
//           userID: user,
//           boardID: createdBoard
//         }
//         const createdMem = await boardMemberRepository.creatBoardMemberAsync(adminData);
//         if (!createdMem) {
//           return new ServiceResponse(
//             ResponseStatus.Failed,
//             "Error creating board admin",
//             null,
//             StatusCodes.INTERNAL_SERVER_ERROR
//           );
//         }
//       }

//       return new ServiceResponse<Boards>(
//         ResponseStatus.Success,
//         "New board's created successfully!",
//         createdBoard,
//         StatusCodes.CREATED
//       );
//     } catch (ex) {
//       const errorMessage = `Error creating board: ${(ex as Error).message}`;
//       return new ServiceResponse(
//         ResponseStatus.Failed,
//         errorMessage,
//         null,
//         StatusCodes.INTERNAL_SERVER_ERROR
//       );
//     }
//   },
};