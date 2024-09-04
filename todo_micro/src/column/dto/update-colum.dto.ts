import { PartialType } from "@nestjs/swagger";
import { CreateColumnDto } from "./create-column.dto";

export class UpdateColumnDto {
  readonly name: string;
  readonly order: number;
}
