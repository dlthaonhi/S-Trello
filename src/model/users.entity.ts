import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  Int32,
} from "typeorm";
import { DateTimeEntity } from "./base/datetime.entity";
import { projectMembers } from "./projects/projectMembers.entity";
import { Comments } from "./projects/comments.entity";
import { Notifications } from "./projects/notifications.entity";
import { Roles } from "./roles.entity";
import { BoardMembers } from "./projects/boardMembers.entity";
import { CardMembers } from "./projects/cardMembers.entity";
import { Projects } from "./projects/projects.entity";
import { Boards } from "./projects/boards.entity";

@Entity()
export class Users extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  public password: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  public email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public bio: string;

  @Column({ type: "int", default: 0 })
  public isActive: Int32;

  @Column({ type: "tinyint", default: 0 })
  public isActivated: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  public avatarUrl: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  public accessToken: string;

  @Column({ type: "datetime", nullable: true })
  public accessTokenExpiresAt: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  public refreshToken: string;

  @Column({ type: "datetime", nullable: true })
  public refreshTokenExpiresAt: Date;

  @OneToMany(() => Projects, (project) => project.user, {cascade: true})
  projects: Projects[];
  
  @OneToMany(() => Boards, (board) => board.user, {cascade: true})
  boards: Boards[];

  @OneToMany(() => projectMembers, (projectMembers) => projectMembers.userID, {
    cascade: true,
  })
  projectMembers: projectMembers[];

  @OneToMany(() => BoardMembers, (boardMembers) => boardMembers.userID, {
    cascade: true,
  })
  boardMembers: BoardMembers[];

  @OneToMany(() => Comments, (comments) => comments.userID, {cascade: true})
  comments: Comments[];

  @OneToMany(() => Notifications, (notifications) => notifications.userID, {cascade: true})
  notifications: Notifications[];

  // @ManyToMany(() => Roles, (role) => role.users, {
  //   cascade: true,
  // })
  // role: Roles[];



  @ManyToOne(() => CardMembers, (cardMembers) => cardMembers.userID)
  cardMembers: CardMembers;
}
