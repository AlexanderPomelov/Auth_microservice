import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/users.enity";

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Admin", description: "Administrator" })
  @Column({ type: "varchar", length: 100, nullable: false })
  value: string;

  @ApiProperty({ example: "Administrator", description: "Description role" })
  @Column({ type: "varchar", length: 500 })
  description: string;

  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[];
}