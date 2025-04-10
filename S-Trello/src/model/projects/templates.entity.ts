// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
//   ManyToOne,
//   DeleteDateColumn,
// } from "typeorm";
// import { DateTimeEntity } from "../base/datetime.entity";
// import { Users } from "../users.entity";
// import { ListTemplates } from "./listTemplates.entity";

// @Entity()
// export class Templates extends DateTimeEntity {
//   @PrimaryGeneratedColumn("uuid")
//   public id: string;

//   @Column({ type: "varchar", length: 255 })
//   public title: string;

//   @Column({ type: "varchar", length: 255, nullable: true })
//   public description: string;

//   @Column({ type: "varchar", length: 255, nullable: true })
//   public coverUrl: string;
  
//   @ManyToOne(() => Users, (user) => user.templates)
//   user: Users

//   @OneToMany(() => ListTemplates, (listTems) => listTems.templateID, {cascade: true})
//   listTems: ListTemplates[];

//   @DeleteDateColumn()
//     deletedAt?: Date;
// }
