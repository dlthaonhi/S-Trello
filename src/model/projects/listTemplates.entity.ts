// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
//   ManyToOne,
// } from "typeorm";
// import { DateTimeEntity } from "../base/datetime.entity";
// import { Templates } from "./templates.entity";
// import { CardTemplates } from "./cardTemplates.entity";

// @Entity()
// export class ListTemplates extends DateTimeEntity {
//   @PrimaryGeneratedColumn("uuid")
//   public id: string;

//   @Column({ type: "varchar", length: 255 })
//   public title: string;

//   @Column({ type: "int", default: 0 })
//   public position: number;

//   @OneToMany(() => CardTemplates, (cardTems) => cardTems.listTemID, {cascade: true})
//   public cardTems: CardTemplates[];

//   @ManyToOne(() => Templates, (template) => template.listTems)
//   public templateID: Templates;
// }
