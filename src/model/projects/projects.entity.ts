import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Int32,
  ManyToMany,
  DeleteDateColumn,
} from "typeorm";
import { DateTimeEntity } from "../base/datetime.entity";
import { projectMembers } from "./projectMembers.entity";
import { CardMembers } from "./cardMembers.entity";
import { Boards } from "./boards.entity";
import { Users } from "../users.entity";

@Entity()
export class Projects extends DateTimeEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "varchar", length: 255 })
  public description: string;

  @ManyToOne(() => Users, (user) => user.projects)
  user: Users

  @Column({ type: "boolean", default: false })
  public is_archive: boolean;

  @OneToMany(() => projectMembers, (projectMembers) => projectMembers.projectID, { cascade: true })
  projectMembers: projectMembers[];

  @OneToMany(() => Boards, (boards) => boards.project)
  boards: Boards[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
