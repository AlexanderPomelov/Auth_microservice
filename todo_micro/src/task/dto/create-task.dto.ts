import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({
    example: "Cleaning home",
    description: "We need to clean the house",
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "We need to clean the house",
    description: "Description of what needs to be done",
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "1",
    description: "Column to which the task belongs",
  })
  columnId: number;
}
