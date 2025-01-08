import { Users } from "../../model/users.entity";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { Boards } from "@/model/projects/boards.entity";
import { boardRepository, templateBoardRepository } from "../board/boardRepository";
import { listRepository } from "../list/listRepository";

export const TemplateService = {
    
  };
  