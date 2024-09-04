import { ApiProperty } from "@nestjs/swagger";
import { Project } from "src/project/project.entity";
import { Task } from "src/task/task.entity";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class ColumnEntity {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "To do", description: "Column used" })
  @Column({ type: "varchar", length: 100, nullable: true })
  name: string;

  @ApiProperty({ example: "1", description: "Order number" })
  @Column({ type: "integer", nullable: true })
  order: number;

  @ManyToOne(() => Project, (project) => project.columns, { cascade: true })
  projects: Project;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
