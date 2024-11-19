import { Users } from "../../model/users.entity";
import dataSource from "../../config/typeorm.config";
import { DeepPartial } from "typeorm";

export const userRepository = dataSource.getRepository(Users).extend({
  async findAllAsync(): Promise<Users[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Users | null> {  
    return this.findOneBy({ id: id });
  },

  async findByEmailAsync(email: string | undefined): Promise<Users | null> { 
    return this.findOneBy({ email });
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
    return this.findOneBy({email });
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
  }
  
});