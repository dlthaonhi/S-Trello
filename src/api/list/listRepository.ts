import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { Lists } from "@/model/projects/lists.entity";

export const listRepository = dataSource.getRepository(Lists).extend({
//   async findAllAsync(): Promise<Boards[]> {
//     return this.find();
//   },

//   async findByIdAsync(id: string): Promise<Boards | null> {
//     return this.findOneBy({ id: id });
//   },

  async createListAsync(newData: Partial<Lists>): Promise<Lists | null > {  
    const newBoard = this.create(newData);
    return this.save(newBoard);
  },

//   async updateBoardByIdAsync(  
//     id: string,
//     updateData: Partial<Boards>
//   ): Promise<Boards | null> {
//       await this.save(updateData);
//     return this.findOneBy({id});
//   },

  async countListsByBoardIdAsync(boardId: string): Promise<number> {
    return this.count({ where: {boardID: {id: boardId}}})
  }
});
