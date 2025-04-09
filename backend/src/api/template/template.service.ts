import { Users } from "../../model/users.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { Boards } from "@/model/projects/boards.entity";
import { boardRepository, templateBoardRepository } from "../board/boardRepository";
import { listRepository } from "../list/listRepository";
import { userRepository } from "../user/userRepository";
import { VisibilityType } from "@/model/base/enumType.entity";
import { Lists } from "@/model/projects/lists.entity";
import { cardRepository } from "../card/cardRepository";

export const TemplateService = {
  createTemplate: async (userId: string, templateData: Boards): Promise<ServiceResponse<Boards | null>> => {
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

      templateData.user = user;
      templateData.visibility = VisibilityType.PRIVATE;
      const createdTemp = await templateBoardRepository.createTemplateAsync(templateData);
      if (!createdTemp) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating template",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      // Lists
      const newListTemps: Partial<Lists>[] = templateData.lists.map(list => ({
        ...list,
        boardID: createdTemp,
        isTemplate: true,
        cards: list.cards.map(card => ({
          ...card,
          isTemplate: true
        })),
      }));
      for (const list of newListTemps) {
        const createdList = await listRepository.createListAsync(list);
        if (!createdList) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "Error creating list template",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
        if (list.cards && list.cards.length) {
          for (const card of list.cards) {
            card.listID = createdList;
            await cardRepository.createCardAsync(card);
          }
        }
      }

      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "New template's created successfully!",
        createdTemp,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating template: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
