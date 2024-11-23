import { Projects } from "../../model/projects/projects.entity";

import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { projectMembers } from "@/model/projects/projectMembers.entity";
import { Boards } from "@/model/projects/boards.entity";
import { BoardMembers } from "@/model/projects/boardMembers.entity";

export const boardRepository = dataSource.getRepository(Boards).extend({
  // async findAllAsync(): Promise<Projects[]> {
  //   return this.find();
  // },

  async findByIdAsync(id: string): Promise<Boards | null> {
    return this.findOneBy({ id: id });
  },

  async createBoardAsync(newDate: Partial<Boards>): Promise<Boards | null > {  
    const newBoard = this.create(newDate);
    return this.save(newBoard);
  },

  async updateBoardByIdAsync(  
    id: string,
    updateData: Partial<Boards>
  ): Promise<Boards | null> {
      await this.save(updateData);
    return this.findOneBy({id});
  },
});

export const boardMemberRepository = dataSource.getRepository(BoardMembers).extend({
  // async findAllAsync(): Promise<projectMembers[]> {
  //   return this.find();
  // },

  // async findAllByProjectIdAsync(projectId: string): Promise<projectMembers[]> {
  //   return this.find({
  //       where: { projectID: { id: projectId }}
  //   });
  // },

  // async findByIdAsync(id: string): Promise<projectMembers | null> {
  //   return this.findOneBy({ id: id });
  // },

  // async findByProjectIdAsync(projectId: string): Promise<projectMembers | null> {
  //   return this.findOneBy({ projectID: { id: projectId } });
  // },

  // async findByProjectAndRelationAsync(project: Projects, relations: string[]): Promise<projectMembers | null> {
  //   return this.findOne({
  //     where: { projectID: { id: project.id } },
  //     relations: relations,
  //   });
  // },

  // async findByProjectAndUserIdAsync(projectId: string, userId: string): Promise<projectMembers | null> {
  //   return this.findOne({
  //     where: { projectID: { id: projectId }, userID: { id: userId } },
  //   });
  // },

  async creatBoardMemberAsync(memData: Partial<BoardMembers>): Promise<BoardMembers | null> {
    const newMem = this.create(memData);
    return this.save(newMem);
  },

  async createManyBoardMembersAsync(memDatas: DeepPartial<BoardMembers>[]): Promise<BoardMembers[] | null> {
    const newMems = this.create(memDatas);
    return this.save(newMems);
  },

  // async deleteProjectMembersAsync (projectId: string, userId: string): Promise<projectMembers | null> {
  //   const removeItem = await this.findOne({
  //     where: { projectID: { id: projectId }, userID: { id: userId } },
  //   });
  //   if(!removeItem) return null;
  //   return await this.remove(removeItem);
  // },

});
