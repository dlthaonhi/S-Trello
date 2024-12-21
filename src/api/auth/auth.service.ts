import bcrypt from "bcryptjs";
import { Users } from "../../model/users.entity";
import { userRepository } from "../../api/user/userRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { generateJwt, verifyJwt } from "../../services/jwtService";
import { Login, Token } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";
import mailService from "../../services/sendEmail";
import { verify } from "crypto";
import { cache } from "../../services/cache";
import { DateTimeEntity } from "@/model/base/datetime.entity";
import CacheService from "../../services/redis.cache"
import oAuthGoogleService from "@/services/oAuthGoogle.service";

export const authService = {
  // Register new user
  register: async (userData: Users): Promise<ServiceResponse<Users | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(userData.email);
      if (user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Email already exists",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await userRepository.createUserAsync({
        ...userData,
        password: hashedPassword
      });
      if (!newUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating users",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      const verifyEmail = await authService.verifyEmail(userData.email);
      if (!verifyEmail) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error sending email",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User registered successfully! Please check your email to verify your account",
        newUser,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating usersss: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  // Login user
  login: async (loginData: Login): Promise<ServiceResponse<Token | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(loginData.email);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.CONFLICT
        );
      }
      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password
      ); 
      if (!passwordMatch) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Invalid password",
          null,
          StatusCodes.UNAUTHORIZED
        );
      }

      const token: Token = {
        accessToken: generateJwt({ userId: user.id }, "1h"),
        refreshToken: generateJwt({ userId: user.id }, "1000h"),
        accessTokenExpiresIn: calculateUnixTime(process.env.JWT_EXPIRES_IN || "1h"),
        refreshTokenExpiresIn: calculateUnixTime(process.env.JWT_EXPIRES_IN || "1000h"),
        tokenType: "Bearer",
      };

      const updatedToken = await userRepository.updateUserByEmailAsync(user.email, {
        ...user,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: new Date(token.refreshTokenExpiresIn *1000)
       });

      if (!updatedToken) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating refresh token",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<Token>(
        ResponseStatus.Success,
        "Login successful",
        token,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error logging in: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getUser: async (userId: string): Promise<ServiceResponse<Users | null>> => {
    try {
      const key = 'user';
      let startTime = performance.now();
      let user:Users | null = await cache.get(key);
      
      if(!user) {
        console.log("Cache miss. Find in DB");
        const userDB = await userRepository.findByIdAsync(userId);
        if (!userDB) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "UserID: not found",
            null,
            StatusCodes.BAD_REQUEST
          );
        }
        user = await cache.set(key, userDB , 60000);       
      }
      else console.log("Cache hit");
      
      let endTime = performance.now();
      console.log("Time", (endTime-startTime).toFixed(3));
      

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User found",
        user,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error getting user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getUserRedis: async (userId: string): Promise<ServiceResponse<Users | null>> => {
    try {
      const key = 'users';
      let startTime = performance.now();
      let user:Users | null = await CacheService.get(key, userId);

      if(!user) {
        console.log("Cache miss. Find in DB");
        const userDB = await userRepository.findByIdAsync(userId);
        if (!userDB) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "UserID: not found",
            null,
            StatusCodes.BAD_REQUEST
          );
        }
        let setted = await CacheService.set(key, userId , userDB); 
        user = userDB   
        console.log(setted);
           
      }
      else console.log("Cache hit");
      
      let endTime = performance.now();
      console.log("Time", (endTime-startTime).toFixed(3));
      

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User found",
        user,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error getting user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getAllUser: async (userId: string): Promise<ServiceResponse<Users | null>> => {
    try {
      const key = 'user-list';
      let startTime = performance.now();
      let user:Users | null = await cache.get(key);
      
      if(!user) {
        console.log("Cache miss. Find in DB");
        const userDB = await userRepository.findByIdAsync(userId);
        if (!userDB) {
          return new ServiceResponse(
            ResponseStatus.Failed,
            "UserID: not found",
            null,
            StatusCodes.BAD_REQUEST
          );
        }
        user = await cache.set(key, userDB , 60000);       
      }
      else console.log("Cache hit");
      
      let endTime = performance.now();
      console.log("Time", (endTime-startTime).toFixed(3));
      

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User found",
        user,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error getting user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  verifyEmail: async (email: string): Promise<boolean> => {
    try {
      const verifyEmailToken = generateJwt({ email });

      const verifyUrl = `http://localhost:3000/auth/activate?token=${verifyEmailToken}`;

      const mailIsSent = await mailService.sendEmail({
          emailFrom: String(process.env.EMAIL_USER),
          emailTo: email,
          emailSubject: "Verify email",
          emailText: `Click on the button below to verify your email: <a href="${verifyUrl}">Verify</a>`,
        });
     
        if(!mailIsSent){
          return false;
        }
      return true;
    } catch (ex) {
      const errorMessage = `Error activating email: ${(ex as Error).message}`;
      return false;
  }},

  verifyUser: async (token: string): Promise<ServiceResponse<Users | null>> => {
    try {
      const decoded = verifyJwt(token);
      if (!decoded) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Invalid or expired token",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const email:string = decoded.email;    
      const updatedUser = await userRepository.updateUserByEmailAsync(email, {isActivated: 1});
      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error activating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
  
      return new ServiceResponse(
        ResponseStatus.Success,
        "User activated successfully!",
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error activating user: ${(ex as Error).message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  redirectGoogleConsentScreen: async(): Promise<ServiceResponse<string | null>> => {
    try {
      const url = await oAuthGoogleService.getRedirectConsentScreenURL();
      if (!url) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error getting getRedirectConsentScreenURL",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse(
        ResponseStatus.Success,
        "Success getting getRedirectConsentScreenURL",
        url,
        StatusCodes.OK
      );
    } catch (error: any) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        `Error activating user: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  
};
