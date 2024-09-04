import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Home", description: "Title for task" })
  @IsString({ message: "It should be a string" })
  readonly name: string;

  @ApiProperty({ example: "john@gmail.com", description: "Email" })
  @IsString({ message: "It should be a string" })
  @IsEmail({}, { message: "Wrong email" })
  readonly email: string;

  @ApiProperty({ example: "123456", description: "Password" })
  @IsString({ message: "It should be a string" })
  @Length(4, 20, {
    message:
      "Password cannot be less than 4 characters and not more than 20 characters",
  })
  readonly password: string;
}