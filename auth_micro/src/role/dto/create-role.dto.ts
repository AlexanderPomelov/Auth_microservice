import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "admin", description: "Role for user" })
  @IsString({ message: "It should be a string" })
  readonly value: string;

  @ApiProperty({ example: "Root administrator", description: "Access to all " })
  @IsString({ message: "It should be a string" })
  readonly description: string;
}