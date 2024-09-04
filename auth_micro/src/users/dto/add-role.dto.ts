import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({ example: "admin", description: "role name" })
  @IsString({ message: "It should be a string" })
  readonly value: string;
  @IsNumber({}, { message: "It should be a number" })
  @ApiProperty({ example: "1", description: "user id to assign a role" })
  readonly userId: number;
}