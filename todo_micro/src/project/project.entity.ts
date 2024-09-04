import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/column/column.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("projects")
export class Project {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Home", description: "Title for task" })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @ApiProperty({
    example: "Cleaning home",
    description: "What needs to be done",
  })
  @Column({ type: "varchar", length: 500 })
  description: string;

  @ApiProperty({
    example: "2020-01-01 23:59:01",
    description: "Task creation time",
  })
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  createdAt: Date;

  @OneToMany(() => ColumnEntity, (column) => column.projects)
  columns: ColumnEntity[];

}
