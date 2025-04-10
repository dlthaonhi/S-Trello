import { Users } from "../../model/users.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { userRepository } from "../../api/user/userRepository";

export const UserService = {
  updateUser: async (userId: string, newData: Users): Promise<ServiceResponse<Users | null>> => {
    try {
      const user = await userRepository.findByIdAsync(userId);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "UserID: not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      console.log(user);

      const updatedUser = await userRepository.updateUserByIdAsync(userId, {...user, ...newData});
      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      console.log(updatedUser);
      
      

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User updated successfully!",
        updatedUser,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error updating users: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async deleteUser(id: string): Promise<ServiceResponse<null>> {
    try {
      const result = await userRepository.softDelete(id);
      if (!result.affected) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse(
        ResponseStatus.Success,
        "User deleted successfully",
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error deleting user: ${(ex as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  async restoreUser(id: string): Promise<ServiceResponse<null>> {
    try {
      const result = await userRepository.restore(id);
      if (!result.affected) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return new ServiceResponse(
        ResponseStatus.Success,
        "User restored successfully",
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error restoring user: ${(ex as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  async getActiveUsers(): Promise<ServiceResponse<Users[] | null>> {
    try {
      const users = await userRepository.findAllAsync();
      return new ServiceResponse(
        ResponseStatus.Success,
        "Users retrieved successfully",
        users,
        StatusCodes.OK
      );
    } catch (ex) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error retrieving users: ${(ex as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
