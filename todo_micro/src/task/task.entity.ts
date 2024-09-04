import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/column/column.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Home", description: "Title task" })
  @Column({ type: "varchar", length: 100, nullable: true })
  title: string;

  @ApiProperty({ example: "Cleaning home", description: "Task description" })
  @Column({ type: "varchar", length: 100, nullable: true })
  description: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  createdAt: Date;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, { cascade: true })
  column: ColumnEntity;

  @Column({ type: "integer", nullable: true })
  order: number;
}
