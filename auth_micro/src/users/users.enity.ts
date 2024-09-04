import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class Users {

    @ApiProperty({example: "1", description: "Unique identifier"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "Jhon", description: "User name"})
    @Column({type: "varchar", length: 100, nullable: false })
    name:string

    @ApiProperty({example: "Jhon@example.com", description: "User email"})
    @Column({type:"varchar", length: 100, nullable: false})
    email:string

    @ApiProperty({example: "123456", description: "User password"})
    @Column({type:"varchar", length: 100, nullable: false})
    password:string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(3)"})
    createdAt: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}