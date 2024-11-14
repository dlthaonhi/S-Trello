import { Projects } from "../../model/projects/projects.entity";

import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { projectMembers } from "@/model/projects/projectMembers.entity";

export const projectRepository = dataSource.getRepository(Projects).extend({
  async findAllAsync(): Promise<Projects[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Projects | null> {
    return this.findOneBy({ id: id });
  },

  async createProjectAsync(projectData: Partial<Projects>): Promise<Projects | null> {
    const newProject = this.create({
      ...projectData,
    });
    return this.save(newProject);
  },

  async updateProjectAsync(
    id: string,
    updateData: Partial<Projects>
  ): Promise<Projects | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },

//   async updateProjectByEmailAsync(
//     email: string,
//     updateData: Partial<Projects>
//   ): Promise<Projects | null> {
//     const project = await this.findOne({
//       where: { email: email }
//     });
//     if (!user) {
//       throw new Error("Users not found");
//     }
//     const updatedUser = this.merge(user, updateData);    
//     try {
//       await this.save(updatedUser);
//     } catch (error) {
//       console.error("Error saving updated user:", error);
//       throw new Error("Error saving updated user");
//     }

//     return this.findOneBy({ email });
//   },

  async updateProjectByIdAsync(
    id: string,
    updateData: Partial<Projects>
  ): Promise<Projects | null> {
    const project = await this.findOne({
      where: { id: id }
    });
    if (!project) {
      throw new Error("Projects not found");
    }
    const updatedProject = this.merge(project, updateData); 
    await this.save(updatedProject);
    return this.findOneBy({ id });
  },

//   async updateUserRoleAsync(
//     userId: string,
//     roleName: string
//   ): Promise<Users | null> {
//     const user = await this.findOne({
//       where: { id: userId },
//       relations: ["roles"],
//     });
//     if (!user) {
//       throw new Error("Users not found");
//     }
//     // const roleRepository = dataSource.getRepository(Roles);
//     // const role = await roleRepository.findOneBy({ name: roleName });
//     // if (!role) {
//     //   throw new Error(`Roles '${roleName}' not found`);
//     // }
//     // user.role = [role];
//     return this.save(user);
//   },

//   async findByEmailAsync(email: string | undefined): Promise<Users | null> {
//     return this.findOneBy({ email });
//   },
//   async findByIdWithRolesAndPermissions(userId: string): Promise<Users | null> {
//     return this.findOne({
//       where: { id: userId },
//       relations: ["roles", "roles.permissions"],
//     });
//   },

//   async createManyUsersAsync(userDatas: DeepPartial<Users>[]): Promise<Users[]> {
//     const newUsers = this.create(userDatas);
//     return this.save(newUsers);
//   },
});

export const projectMemberRepository = dataSource.getRepository(projectMembers).extend({
  async findAllAsync(): Promise<projectMembers[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<projectMembers | null> {
    return this.findOneBy({ id: id });
  },
  async creatProjectMemberAsync(memData: Partial<projectMembers>): Promise<projectMembers | null>{
    const newMem = this.create ({...memData});
    return this.save(newMem);
  }
});
