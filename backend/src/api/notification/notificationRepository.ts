import dataSource from "@/config/typeorm.config";
import { Notifications } from "@/model/projects/notifications.entity";
import { DeepPartial } from "typeorm";

export const notificationRepository = dataSource.getRepository(Notifications).extend({
  async findAllByUserIdAsync(userId: string): Promise<Notifications[]> {
    return this.find({
      where: { userID: { id: userId } } });
  },
  async findByIdAsync(id: string): Promise<Notifications | null> {
      return this.findOneBy({ id: id });
  },

    async updateNotiByIdAsync(  
      id: string,
      updateData: Partial<Notifications>
    ): Promise<Notifications | null> {
        await this.save(updateData);
      return this.findOneBy({id});
    },

  async createNotificationAsync(notificationData: DeepPartial<Notifications>): Promise<Notifications> {
    const notification = this.create(notificationData);
    return this.save(notification);
  },
});
