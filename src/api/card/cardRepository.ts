import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { Cards } from "@/model/projects/cards.entity";
import { CardMembers } from "@/model/projects/cardMembers.entity";

export const cardRepository = dataSource.getRepository(Cards).extend({
//   async findAllAsync(): Promise<Boards[]> {
//     return this.find();
//   },

  async findByIdAsync(id: string): Promise<Cards | null> {
    return this.findOneBy({ id: id });
  },

  async createCardAsync(newData: Partial<Cards>): Promise<Cards | null > {  
    const newCard = this.create(newData);
    return this.save(newCard);
  },

  async updateCardByIdAsync(  
    id: string,
    updateData: Partial<Cards>
  ): Promise<Cards | null> {
      await this.save(updateData);
    return this.findOneBy({id});
  },

  async findByCardIdAndRelationAsync(cardId: string, relations: string[]): Promise<Cards | null> {
    return this.findOne({
      where: {  id: cardId },
      relations: relations,
    });
  },

  async countCardsByListIdAsync(listId: string): Promise<number> {
    return this.count({ where: {listID: {id: listId}}})
  }
});

export const cardMemberRepository = dataSource.getRepository(CardMembers).extend({
    // async findAllAsync(): Promise<BoardMembers[]> {
    //   return this.find();
    // },
  
    // async findAllByBoardIdAsync(boardId: string): Promise<BoardMembers[]> {
    //   return this.find({
    //       where: { boardID: { id: boardId }}
    //   });
    // },
  
    // async findByIdAsync(id: string): Promise<BoardMembers | null> {
    //   return this.findOneBy({ id: id });
    // },
  
    async findByCardIdAsync(cardId: string): Promise<CardMembers | null> {
      return this.findOneBy({ cardID: { id: cardId } });
    },
  
    // async findByBoardIdAndRelationAsync(boardId: string, relations: string[]): Promise<BoardMembers | null> {
    //   return this.findOne({
    //     where: { boardID: { id: boardId } },
    //     relations: relations,
    //   });
    // },
  
    async findByCardAndUserIdAsync(cardId: string, userId: string): Promise<CardMembers | null> {
      return this.findOne({
        where: { cardID: { id: cardId }, userID: { id: userId } },
      });
    },
  
    // async creatBoardMemberAsync(memData: Partial<BoardMembers>): Promise<BoardMembers | null> {
    //   const newMem = this.create(memData);
    //   return this.save(newMem);
    // },
  
    async createManyCardMembersAsync(memDatas: DeepPartial<CardMembers>[]): Promise<CardMembers[] | null> {
      const newMems = this.create(memDatas);
      return this.save(newMems);
    },
  
    async deleteCardMembersAsync (cardId: string, userId: string): Promise<CardMembers | null> {
      const removeItem = await this.findOne({
        where: { cardID: { id: cardId }, userID: { id: userId } },
      });
      if(!removeItem) return null;
      return await this.remove(removeItem);
    },
  
  });
