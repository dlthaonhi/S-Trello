import { Cards } from "@/model/projects/cards.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { cardMemberRepository, cardRepository } from "./cardRepository";
import { CardMembers } from "@/model/projects/cardMembers.entity";
import { userRepository } from "../user/userRepository";
import { boardMemberRepository } from "../board/boardRepository";
import { listRepository } from "../list/listRepository";
import positionService from "../../services/positionService";
import { Comments } from "@/model/projects/comments.entity";
import { commentRepository } from "../comment/commentRepository";

export const CardService = {
  updateCard: async (cardId: string, newData: Partial<Cards>): Promise<ServiceResponse<Cards | null>> => {
    try {
      const card = await cardRepository.findByIdAsync(cardId);
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const updatedCard = await cardRepository.updateCardByIdAsync(cardId, { ...card, ...newData });
      if (!updatedCard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating card",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Project updated successfully!",
        updatedCard,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  archiveCard: async (cardId: string, value: boolean): Promise<ServiceResponse<Cards | null>> => {
    try {
      const card = await cardRepository.findByIdAsync(cardId);
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      if (card.is_archive == value)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card is already archived/ unarchived",
          null,
          StatusCodes.BAD_REQUEST
        );
      const newData: Partial<Cards> = { is_archive: value };
      const archiveCard = await cardRepository.updateCardByIdAsync(cardId, { ...card, ...newData });
      if (!archiveCard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating archive status",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Card archive status updated successfully!",
        archiveCard,
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
  assignMembers: async (cardId: string, userIds: string[]): Promise<ServiceResponse<CardMembers[] | null>> => {
    try {
      const card = await cardRepository.findByCardIdAndRelationAsync(cardId, ['listID']);
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const list = await listRepository.findByListIdAndRelationAsync(card.listID.id, ['boardID']);
      if (!list) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      let tempMem: Partial<CardMembers>[] = []
      for (const userId of userIds) {
        const existedMem = await cardMemberRepository.findByCardAndUserIdAsync(cardId, userId)
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

          const validUser = await boardMemberRepository.findByBoardAndUserIdAsync(list.boardID.id, userId)

          if (validUser) {
            const addMem: Partial<CardMembers> = {
              userID: user,
              cardID: card
            };
            tempMem.push(addMem);
          }
          else console.log(`Member with ID ${userId} isn't existed in this board. Add member to board before assigning`);

        }
        else console.log(`Member with ID ${userId} 's existed in this card`);

      }
      const addedMems = await cardMemberRepository.createManyCardMembersAsync(tempMem);
      if (addedMems === undefined || addedMems === null)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error assigning member(s)",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      if (!addedMems.length)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "All users is existed in this card",
          null,
          StatusCodes.BAD_REQUEST
        );

      return new ServiceResponse<CardMembers[]>(
        ResponseStatus.Success,
        "Card member(s) assigned successfully!",
        addedMems,
        StatusCodes.OK
      );

    } catch (ex) {
      const errorMessage = `Error assigning member(s): ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  unassignMembers: async (cardId: string, userIds: string[]): Promise<ServiceResponse<CardMembers[] | null>> => {
    try {
      const card = await cardMemberRepository.findByCardIdAsync(cardId);
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      let removedMems: CardMembers[] = []
      for (const userId of userIds) {
        const existedMem = await cardMemberRepository.findByCardAndUserIdAsync(cardId, userId)
        if (existedMem) {
          const removedUser = await cardMemberRepository.deleteCardMembersAsync(cardId, userId)
          if (removedUser) removedMems.push(removedUser);
        }
        else console.log(`User with ID ${userId} isn't existed in this card`);
      }
      if (removedMems === undefined || removedMems === null)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error removing member(s) from this card",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );

      if (!removedMems.length)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "All users isn't existed in this card",
          null,
          StatusCodes.BAD_REQUEST
        );

      return new ServiceResponse<CardMembers[]>(
        ResponseStatus.Success,
        "Card member(s) removed successfully!",
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
  moveCard: async (cardId: string, newListId: string, newBoardId: string, newPosition: number | null): Promise<ServiceResponse<Cards | null>> => {
    try {
      const card = await cardRepository.findByCardIdAndRelationAsync(cardId, ['listID']);
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const oldListId = card.listID.id;
      const oldList = await listRepository.findByListIdAndRelationAsync(oldListId,['boardID'] )
      if (!oldList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID of card: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const newList = await listRepository.findByListIdAndRelationAsync(newListId, ['boardID']);
      if (!newList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "List ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      if (newList.boardID.id !== newBoardId) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Provided board ID: not associated with list ID",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const oldBoardId = oldList.boardID.id;
      console.log("oldListId", oldListId);
      console.log("newListId", newListId);
      
      
      //The same list
      if (oldListId === newListId) {
        if (!newPosition) newPosition = card.position;
        const movedCard = await CardService.changeCardPosition(newPosition, card, newListId);
        if (!movedCard) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "Error moving card",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
        return new ServiceResponse<Cards>(
          ResponseStatus.Success,
          "Card moved successfully",
          card,
          StatusCodes.CREATED
        );
      }

      //Another list
      // Different board
      console.log("oldBoardId",oldBoardId);
      console.log("newBoardId",newBoardId);
      
      if (oldBoardId !== newBoardId) {
        console.log("Diffent board");
        const cardMembers = await cardMemberRepository.findAllByCardIdAndRelationAsync(cardId, ['userID']);
        const cardUserIds = cardMembers.map(mem => { return mem.userID.id })
        console.log("cardUserIds", cardUserIds);
        const boardMembers = await boardMemberRepository.findAllByBoardIdAndRelationAsync(newBoardId, ['userID']);
        const boardUserIds = boardMembers.map(mem => { return mem.userID.id })
        console.log("boardUserIds", boardUserIds);
        for (const cardUserId of cardUserIds) {
          if (!boardUserIds.includes(cardUserId)) {
            const removedMem = await cardMemberRepository.deleteCardMembersAsync(cardId, cardUserId);
            if (!removedMem) {
              return new ServiceResponse(
                ResponseStatus.Failed,
                "Error removing user not in the new board",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
              );
            }
          }
        }
        
      }
      //The same board
      // check Position
      const maxValidPosition = await cardRepository.countCardsByListIdAsync(newListId) + 1;
      if (newPosition && newPosition > maxValidPosition) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          `The max position of this list is ${maxValidPosition}. Please enter a valid value`,
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      if (!newPosition) newPosition = maxValidPosition;
      card.listID = newList;
      const oldPosition = card.position;
      card.position = newPosition;
      console.log("Old position", oldPosition);
      console.log("New position", card.position);


      const removedCardFromOldList = await positionService.remove(oldPosition, oldListId);
      if (!removedCardFromOldList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error removing card from current list",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      const addedCardToNewList = await positionService.add(newPosition, maxValidPosition, newListId);
      if (!addedCardToNewList) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding card to new list",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      const movedCard = await cardRepository.updateCardByIdAsync(cardId, card);
      if (!movedCard) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error moving card",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Card moved successfully",
        card,
        StatusCodes.CREATED
      );

    } catch (ex) {
      const errorMessage = `Error moving card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  changeCardPosition: async (newPosition: number, card: Cards, newListId: string): Promise<boolean> => {
    try {
      // check Position
      const maxValidPosition = await cardRepository.countCardsByListIdAsync(newListId);
      if (newPosition > maxValidPosition)
        throw new Error(`The max position of this list is ${maxValidPosition}. Please enter a valid value`)

      if (newPosition === card.position) {
        console.log("The card is at the current location");
        return true;
      }
      else {
        console.log("card.position ... newPosition",card.position, newPosition);
        
        const changedPosition = card.position < newPosition ?
          await positionService.increase(card.position, newPosition, newListId) :
          await positionService.decrease(card.position, newPosition, newListId);
        if (!changedPosition)
          throw new Error("Error changing position card when moving");
        card.position = newPosition;

        const movedCard = await cardRepository.updateCardByIdAsync(card.id, card);
        if (!movedCard) throw new Error("Error moving card")

        return true;
      }
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  },
  addComment: async (cardId: string, userId: string, content: string ): Promise<ServiceResponse<Comments | null>> => {
    try {
      const card = await cardRepository.findByIdAsync(cardId)
      if (!card) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Card ID: Not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const user = await userRepository.findByIdAsync(userId)
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User ID: Not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const commentData: Partial<Comments> = {
        cardID:card,
        userID: user,
        content: content
      }
      const createdComment = await commentRepository.createCommentAsync(commentData);
      if (!createdComment) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating comment",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Comments>(
        ResponseStatus.Success,
        "New comment's added successfully!",
        createdComment,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating comment: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};