import dataSource from "../../config/typeorm.config";
import { DeepPartial, IsNull } from "typeorm";
import { Boards } from "@/model/projects/boards.entity";
import { BoardMembers } from "@/model/projects/boardMembers.entity";

export const boardRepository = dataSource.getRepository(Boards).extend({
  async findAllAsync(): Promise<Boards[]> {
    return this.find({ where: { deletedAt: IsNull() } });
  },

  async findByIdAsync(id: string): Promise<Boards | null> {
    return this.findOneBy({ id: id, deletedAt: IsNull() });
  },

  async findByBoardIdAndRelationAsync(boardId: string, relations: string[]): Promise<Boards | null> {
    return this.findOne({
      where: { id: boardId, deletedAt: IsNull() },
      relations: relations,
    });
  },

  async createBoardAsync(newData: Partial<Boards>): Promise<Boards | null> {
    const newBoard = this.create(newData);
    return this.save(newBoard);
  },

  async updateBoardByIdAsync(
    id: string,
    updateData: Partial<Boards>
  ): Promise<Boards | null> {
    await this.save(updateData);
    return this.findOneBy({ id });
  },

  async countBoardsByProjectIdAsync(projectId: string): Promise<number> {
    return this.count({ where: { project: { id: projectId } } })
  },

  async softDelete(id: string): Promise<any> {
    return this.softDelete(id);
  },

  async restore(id: string): Promise<any> {
    return this.restore(id);
  },

});

export const boardMemberRepository = dataSource.getRepository(BoardMembers).extend({
  async findAllAsync(): Promise<BoardMembers[]> {
    return this.find();
  },

  async findAllByBoardIdAsync(boardId: string): Promise<BoardMembers[]> {
    return this.find({
      where: { boardID: { id: boardId } }
    });
  },

  async findAllByBoardIdAndRelationAsync(boardId: string, relations: string[]): Promise<BoardMembers[]> {
    return this.find({
      where: { boardID: { id: boardId } },
      relations: relations
    });
  },

  async findByIdAsync(id: string): Promise<BoardMembers | null> {
    return this.findOneBy({ id: id });
  },

  async findByBoardIdAsync(boardId: string): Promise<BoardMembers | null> {
    return this.findOneBy({ boardID: { id: boardId } });
  },

  async findByBoardIdAndRelationAsync(boardId: string, relations: string[]): Promise<BoardMembers | null> {
    return this.findOne({
      where: { boardID: { id: boardId } },
      relations: relations,
    });
  },

  async findByBoardAndUserIdAsync(boardId: string, userId: string): Promise<BoardMembers | null> {
    return this.findOne({
      where: { boardID: { id: boardId }, userID: { id: userId } },
    });
  },

  async creatBoardMemberAsync(memData: Partial<BoardMembers>): Promise<BoardMembers | null> {
    const newMem = this.create(memData);
    return this.save(newMem);
  },

  async createManyBoardMembersAsync(memDatas: DeepPartial<BoardMembers>[]): Promise<BoardMembers[] | null> {
    const newMems = this.create(memDatas);
    return this.save(newMems);
  },

  async deleteBoardMembersAsync(boardId: string, userId: string): Promise<BoardMembers | null> {
    const removeItem = await this.findOne({
      where: { boardID: { id: boardId }, userID: { id: userId } },
    });
    if (!removeItem) return null;
    return await this.remove(removeItem);
  },

});
