// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
//   ManyToOne,
// } from "typeorm";
// import { DateTimeEntity } from "../base/datetime.entity";
// import { ListTemplates } from "./listTemplates.entity";

// @Entity()
// export class CardTemplates extends DateTimeEntity {
//   @PrimaryGeneratedColumn("uuid")
//   public id: string;

//   @Column({ type: "varchar", length: 255 })
//   public title: string;

//   @Column({ type: "varchar", length: 255 })
//   public description: string;

//   @Column({ type: "int", default: 0, nullable: true })
//   public position: number;

//   @Column({ type: "varchar", length: 255, nullable: true })
//   public coverUrl: string;

//   @Column({ type: "varchar", length: 255, nullable: true })
//   public priority: string;

//   @ManyToOne(() => ListTemplates, (listTems) => listTems.cardTems)
//   public listTemID: ListTemplates;
// }
