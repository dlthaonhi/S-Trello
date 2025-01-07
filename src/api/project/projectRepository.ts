import { Projects } from "../../model/projects/projects.entity";

import dataSource from "../../config/typeorm.config";
import { DeepPartial, IsNull } from "typeorm";
import { projectMembers } from "@/model/projects/projectMembers.entity";

export const projectRepository = dataSource.getRepository(Projects).extend({
  async findAllAsync(): Promise<Projects[]> {
    return this.find({
          where: { deletedAt: IsNull() },
        });
  },

  async findByIdAsync(id: string): Promise<Projects | null> {
    return this.findOneBy({ id: id, deletedAt: IsNull()  });
  },

  async createProjectAsync(userData: Partial<Projects>): Promise<Projects | null > {  //1
    const newUser = this.create(userData);
    return this.save(newUser);
  },

  async updateProjectAsync(
    id: string,
    updateData: Partial<Projects>
  ): Promise<Projects | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },

  async updateProjectByIdAsync(  
    id: string,
    updateData: Partial<Projects>
  ): Promise<Projects | null> {
    console.log(updateData);
    
      await this.save(updateData);
    return this.findOneBy({id});
  },

  
  async softDelete(id: string): Promise<any> {
    return this.softDelete(id); 
  },

  async restore(id: string): Promise<any> {
    return this.restore(id);
  },
});

export const projectMemberRepository = dataSource.getRepository(projectMembers).extend({
  async findAllAsync(): Promise<projectMembers[]> {
    return this.find();
  },

  async findAllByProjectIdAsync(projectId: string, relations: string[]): Promise<projectMembers[]> {
    return this.find({
        where: { projectID: { id: projectId }},
        relations: relations,
    });
  },

  async findByIdAsync(id: string): Promise<projectMembers | null> {
    return this.findOneBy({ id: id });
  },

  async findByProjectIdAsync(projectId: string): Promise<projectMembers | null> {
    return this.findOneBy({ projectID: { id: projectId } });
  },

  async findByProjectAndRelationAsync(project: Projects, relations: string[]): Promise<projectMembers | null> {
    return this.findOne({
      where: { projectID: { id: project.id } },
      relations: relations,
    });
  },

  async findByProjectAndUserIdAsync(projectId: string, userId: string): Promise<projectMembers | null> {
    return this.findOne({
      where: { projectID: { id: projectId }, userID: { id: userId } },
    });
  },

  async creatProjectMemberAsync(memData: Partial<projectMembers>): Promise<projectMembers | null> {
    const newMem = this.create(memData);
    return this.save(newMem);
  },

  async createManyProjectMembersAsync(memDatas: DeepPartial<projectMembers>[]): Promise<projectMembers[] | null> {
    const newMems = this.create(memDatas);
    return this.save(newMems);
  },

  async deleteProjectMembersAsync (projectId: string, userId: string): Promise<projectMembers | null> {
    const removeItem = await this.findOne({
      where: { projectID: { id: projectId }, userID: { id: userId } },
    });
    if(!removeItem) return null;
    return await this.remove(removeItem);
  },

});
