import { Users } from "../../model/users.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { userRepository } from "../../api/user/userRepository";
import { RoleType, VisibilityType } from "../../model/base/enumType.entity";
import { type } from "os";
import { IsNull } from "typeorm";
import { Boards } from "@/model/projects/boards.entity";
import { BoardMembers } from "@/model/projects/boardMembers.entity";
import { boardMemberRepository, boardRepository } from "../board/boardRepository";
import { Lists } from "@/model/projects/lists.entity";
import { btoa } from "buffer";
import { listRepository } from "../list/listRepository";

export const ListService = {
  updateList: async (listId: string, newData: Partial<Lists>): Promise<ServiceResponse<Lists | null>> => {
    try {
      const list = await listRepository.findByIdAsync(listId);
      if (!list) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const updatedList = await listRepository.updateListByIdAsync(listId, { ...list, ...newData });
      if (!updatedList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating list",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "List updated successfully!",
        updatedList,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  archiveList: async (listId: string, value: boolean): Promise<ServiceResponse<Lists | null>> => {
    try {
      const list = await listRepository.findByIdAsync(listId);
      if (!list) 
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      
      if (list.is_archive == value) 
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List is already archived/ unarchived",
          null,
          StatusCodes.BAD_REQUEST
        );
      const newData: Partial<Lists> = { is_archive: value };      
      const archiveList = await listRepository.updateListByIdAsync(listId, {...list, ...newData});
      
      if (!archiveList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating archive status",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "List archive status updated successfully!",
        archiveList,
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
//   createList: async (userId: string, boardId: string, listData: Lists): Promise<ServiceResponse<Lists | null>> => {
//     try {      
//       const board = await boardRepository.findByIdAsync(boardId)
//       if (!board) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Board ID: Not found",
//           null,
//           StatusCodes.BAD_REQUEST
//         );
//       }
//       listData.boardID = board;
//       listData.position = await listRepository.countListsByBoardIdAsync(boardId) + 1;
//       const createdList = await listRepository.createListAsync(listData);
//       if (!createdList) {
//         return new ServiceResponse(
//           ResponseStatus.Failed,
//           "Error creating list",
//           null,
//           StatusCodes.INTERNAL_SERVER_ERROR
//         );
//       }

//       return new ServiceResponse<Lists>(
//         ResponseStatus.Success,
//         "New list's created successfully!",
//         createdList,
//         StatusCodes.CREATED
//       );
//     } catch (ex) {
//       const errorMessage = `Error creating list: ${(ex as Error).message}`;
//       return new ServiceResponse(
//         ResponseStatus.Failed,
//         errorMessage,
//         null,
//         StatusCodes.INTERNAL_SERVER_ERROR
//       );
//     }
//   },
};