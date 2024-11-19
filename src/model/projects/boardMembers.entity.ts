import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Int32,
  ManyToMany,
  RoleSpecification,
} from "typeorm";
import { DateTimeEntity } from "../base/datetime.entity";
import { Users } from "../users.entity";
import { Boards } from "./boards.entity";
import { RoleType } from "../base/enumType.entity";



@Entity()
export class BoardMembers extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.MEMBER })
  public role: RoleType;

  @ManyToOne(() => Users, (users) => users.boardMembers)
  userID: Users;
  
  @ManyToOne(() => Boards, (boards) => boards.boardMembers)
  boardID: Boards;

}
