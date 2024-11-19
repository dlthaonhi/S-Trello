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

      const updatedUser = await userRepository.updateUserByIdAsync(userId, newData);

      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

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
};