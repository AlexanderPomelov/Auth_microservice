import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { MessagePattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200 })
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }


  @ApiOperation({ summary: "Registration user" })
  @ApiResponse({ status: 201 })
  @Post("/registration")
  @MessagePattern({cmd: 'registration-user'})
  registration(@Body() userDto: CreateUserDto){
  return this.authService.registration(userDto)
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(data: { token: string }) {
    return this.authService.validateToken(data.token);
}
}