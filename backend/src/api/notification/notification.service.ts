import { ResponseStatus, ServiceResponse } from "@/services/serviceResponse";
import { notificationRepository } from "./notificationRepository";
import { StatusCodes } from "http-status-codes";
import { Notifications } from "@/model/projects/notifications.entity";

export const NotificationService = {
  getAllNotificationsByUserId: async (userId: string): Promise<ServiceResponse<Notifications[] | null>> => {
    try {
      const notifications = await notificationRepository.findAllByUserIdAsync(userId);
      if (!notifications) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Notifications: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      return new ServiceResponse<Notifications[]>(
        ResponseStatus.Success,
        "Notifications getted successfully!",
        notifications,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error getting notifications: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  // createNotification: async (notificationData: any) => {
  //   return await notificationRepository.createNotificationAsync(notificationData);
  // },

readNotification: async (notiId: string, value: boolean): Promise<ServiceResponse<Notifications | null>> => {
    try {
      const noti = await notificationRepository.findByIdAsync(notiId);
      if (!noti) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Notification ID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      if (noti.isRead == value)
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Notification is already readed/ unreaded",
          null,
          StatusCodes.BAD_REQUEST
        );
      const newData: Partial<Notifications> = { isRead: value };
      const updateNoti = await notificationRepository.updateNotiByIdAsync(notiId, { ...noti, ...newData });
      if (!updateNoti) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating read status",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Notifications>(
        ResponseStatus.Success,
        "Card archive status updated successfully!",
        updateNoti,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating read status: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
