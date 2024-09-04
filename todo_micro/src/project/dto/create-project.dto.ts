import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({ example: "Home", description: "Title for task" })
  @IsString({ message: "It should be a string" })
  readonly name: string;

  @ApiProperty({
    example: "Cleaning home",
    description: "What needs to be done",
  })
  @IsString({ message: "It should be a string" })
  readonly description: string;
}
