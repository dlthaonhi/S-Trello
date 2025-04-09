import dataSource from "../../config/typeorm.config";
import { DeepPartial, IsNull } from "typeorm";
import { Lists } from "@/model/projects/lists.entity";

export const listRepository = dataSource.getRepository(Lists).extend({
  async findAllAsync(): Promise<Lists[]> {
    return this.find({
      where: { deletedAt: IsNull() },
    });
  },

  async findByIdAsync(id: string): Promise<Lists | null> {
    return this.findOneBy({ id: id, deletedAt: IsNull() });
  },

  async createListAsync(newData: Partial<Lists>): Promise<Lists | null> {
    const newList = this.create(newData);
    return this.save(newList);
  },

  async updateListByIdAsync(
    id: string,
    updateData: Partial<Lists>
  ): Promise<Lists | null> {
    await this.save(updateData);
    return this.findOneBy({ id });
  },

  async findByListIdAndRelationAsync(listId: string, relations: string[]): Promise<Lists | null> {
    return this.findOne({
      where: { id: listId, deletedAt: IsNull() },
      relations: relations,
    });
  },

  async countListsByBoardIdAsync(boardId: string): Promise<number> {
    return this.count({ where: { boardID: { id: boardId }, deletedAt: IsNull() } })
  },
  async softDelete(id: string): Promise<any> {
    return this.softDelete(id);
  },

  async restore(id: string): Promise<any> {
    return this.restore(id);
  },
});
