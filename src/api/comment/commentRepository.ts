import { Comments } from "@/model/projects/comments.entity";
import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";

export const commentRepository = dataSource.getRepository(Comments).extend({
//   async findAllAsync(): Promise<Boards[]> {
//     return this.find();
// //   },

//   async findByIdAsync(id: string): Promise<Lists | null> {
//     return this.findOneBy({ id: id });
//   },

  async createCommentAsync(newData: Partial<Comments>): Promise<Comments | null > {  
    const newComment = this.create(newData);
    return this.save(newComment);
  },

//   async updateListByIdAsync(  
//     id: string,
//     updateData: Partial<Lists>
//   ): Promise<Lists | null> {
//       await this.save(updateData);
//     return this.findOneBy({id});
//   },

//   async findByListIdAndRelationAsync(listId: string, relations: string[]): Promise<Lists | null> {
//     return this.findOne({
//       where: {  id: listId },
//       relations: relations,
//     });
//   },

//   async countListsByBoardIdAsync(boardId: string): Promise<number> {
//     return this.count({ where: {boardID: {id: boardId}}})
//   }
});
