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
import { Cards } from "@/model/projects/cards.entity";
import { cardRepository } from "../card/cardRepository";

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
  createCard: async (listId: string, cardData: Cards): Promise<ServiceResponse<Cards | null>> => {
    try {      
      const list = await listRepository.findByIdAsync(listId)
      if (!list) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID: Not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      cardData.listID = list;
      cardData.position = await cardRepository.countCardsByListIdAsync(listId) + 1;
      const createdCard = await cardRepository.createCardAsync(cardData);
      if (!createdCard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating card",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "New card's created successfully!",
        createdCard,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};