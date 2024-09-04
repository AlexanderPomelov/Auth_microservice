import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateColumnDto {
  @ApiProperty({ example: "To do", description: "We need to do" })
//   @IsNotEmpty()
    name: string;

  @ApiProperty({ example: "1", description: "Order number" })
    order: number;
}
