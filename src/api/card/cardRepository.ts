import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { Cards } from "@/model/projects/cards.entity";

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

//   async findByListIdAndRelationAsync(listId: string, relations: string[]): Promise<Lists | null> {
//     return this.findOne({
//       where: {  id: listId },
//       relations: relations,
//     });
//   },

  async countCardsByListIdAsync(listId: string): Promise<number> {
    return this.count({ where: {listID: {id: listId}}})
  }
});
