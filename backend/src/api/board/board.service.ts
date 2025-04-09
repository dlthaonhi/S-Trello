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
      const archiveBoard = await boardRepository.updateBoardByIdAsync(boardId, { ...board, ...newData });

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
  async deleteBoard(id: string): Promise<ServiceResponse<null>> {
    try {
      const result = await boardRepository.softDelete(id);
      if (!result.affected) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse(
        ResponseStatus.Success,
        "Board deleted successfully",
        null,
        StatusCodes.OK
      );
    } catch (error) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error deleting board: ${(error as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  async restoreBoard(id: string): Promise<ServiceResponse<null>> {
    try {
      const result = await boardRepository.restore(id);
      if (!result.affected) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse(
        ResponseStatus.Success,
        "Board restored successfully",
        null,
        StatusCodes.OK
      );
    } catch (error) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error restoring board: ${(error as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  addMembers: async (boardId: string, userIds: string[]): Promise<ServiceResponse<BoardMembers[] | BoardMembers | null>> => {
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

      let tempMem: Partial<BoardMembers>[] = []
      for (const userId of userIds) {
        const existedMem = await boardMemberRepository.findByBoardAndUserIdAsync(boardId, userId)
        if (!existedMem) {
          const user = await userRepository.findByIdAsync(userId);
          if (!user) {
            return new ServiceResponse(
              ResponseStatus.Failed,
              `User ID: ${userId} not found`,
              null,
              StatusCodes.BAD_REQUEST
            );
          }

          const addMem: Partial<BoardMembers> = {
            userID: user,
            role: RoleType.MEMBER,
            boardID: board
          };

          tempMem.push(addMem);
        }
        else console.log(`Member with ID ${userId} 's existed in this board`);

      }
      const addedMems = await boardMemberRepository.createManyBoardMembersAsync(tempMem);
      if (addedMems === undefined || addedMems === null)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding member(s)",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      if (!addedMems.length)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "All users is existed in this board",
          null,
          StatusCodes.BAD_REQUEST
        );


      return new ServiceResponse<BoardMembers[] | BoardMembers>(
        ResponseStatus.Success,
        "Board member(s) added successfully!",
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
  removeMembers: async (boardId: string, userIds: string[] | string): Promise<ServiceResponse<BoardMembers[] | BoardMembers | null>> => {
    try {
      const board = await boardMemberRepository.findByBoardIdAsync(boardId);
      if (!board) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      let removedMems: BoardMembers[] = []
      for (const userId of userIds) {
        const existedMem = await boardMemberRepository.findByBoardAndUserIdAsync(boardId, userId)
        if (existedMem) {
          const removedUser = await boardMemberRepository.deleteBoardMembersAsync(boardId, userId)
          if (removedUser) removedMems.push(removedUser);
        }
        else console.log(`User with ID ${userId} isn't existed in this board`);
      }
      if (removedMems === undefined || removedMems === null)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error removing member(s) from this board",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      if (!removedMems.length)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "All users isn't existed in this board",
          null,
          StatusCodes.BAD_REQUEST
        );


      return new ServiceResponse<BoardMembers[] | BoardMembers>(
        ResponseStatus.Success,
        "Project member(s) removed successfully!",
        removedMems,
        StatusCodes.OK
      );

    } catch (ex) {
      const errorMessage = `Error removing member(s): ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  createList: async (boardId: string, listData: Lists): Promise<ServiceResponse<Lists | null>> => {
    try {
      const board = await boardRepository.findByIdAsync(boardId)
      if (!board) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Board ID: Not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      listData.boardID = board;
      listData.position = await listRepository.countListsByBoardIdAsync(boardId) + 1;
      const createdList = await listRepository.createListAsync(listData);
      if (!createdList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating list",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "New list's created successfully!",
        createdList,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  sortList: async (boardId: string, sortListIds: string[]): Promise<ServiceResponse<Lists[] | null>> => {
    try {
      const board = await boardRepository.findByBoardIdAndRelationAsync(boardId, ['lists'])
    if (!board) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Board ID: Not found",
        null,
        StatusCodes.BAD_REQUEST
      );
    }
    board.lists.forEach(list => {
      sortListIds.forEach( (listId, index) => {
        if (listId === list.id) list.position = index + 1;
        
      })
    })

    const sortedList = await boardRepository.updateBoardByIdAsync(boardId, board);
    if (!sortedList) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Error sorting list",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }    

    return new ServiceResponse<Lists[]>(
      ResponseStatus.Success,
      "Sorted lists successfully!",
      board.lists,
      StatusCodes.CREATED
    );
    } catch (ex) {
      const errorMessage = `Error sorting list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

  }
};