import { Users } from "../../model/users.entity";
import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";
import { IsNull } from "typeorm";

export const userRepository = dataSource.getRepository(Users).extend({
  async findAllAsync(): Promise<Users[] | null> {
    return this.find({
      where: { deletedAt: IsNull() },
    });
  },

  async findByIdAsync(id: string): Promise<Users | null> {  
    return this.findOneBy({ id: id, deletedAt: IsNull() });
  },

  async findByEmailAsync(email: string | undefined): Promise<Users | null> { 
    return this.findOneBy({ email, deletedAt: IsNull()});
  },

  async createUserAsync(userData: Partial<Users>): Promise<Users | null > { 
    const newUser = this.create(userData);
    return this.save(newUser);
  },

  async updateUserByEmailAsync(  
    email: string,
    updateData: Partial<Users>
  ): Promise<Users | null> {
      await this.save(updateData);
    return this.findOneBy({email});
  },

  async updateUserByIdAsync(  
    id: string,
    updateData: Partial<Users>
  ): Promise<Users | null> {
      await this.save(updateData);
    return this.findOneBy({id});
  },

  async createManyUsersAsync(userDatas: DeepPartial<Users>[]): Promise<Users[]> {
    const newUsers = this.create(userDatas);
    return this.save(newUsers);
  },
  async softDelete(id: string): Promise<any> {
    return this.softDelete(id); 
  },

  async restore(id: string): Promise<any> {
    return this.restore(id);
  },

});