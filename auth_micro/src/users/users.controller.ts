import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from "@nestjs/common";
  import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { UsersService } from "./users.service";
  import { CreateUserDto } from "./dto/create-user.dto";
  import { UpdateUserDto } from "./dto/update-user.dto";
  import { AddRoleDto } from "./dto/add-role.dto";
  import { Users } from "./users.enity";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
 
  
  @ApiTags("Users")
  @Controller("users")
  export class UsersController {
    constructor(private userService: UsersService) {}
  
    @ApiOperation({ summary: "Create a user" })
    @ApiResponse({ status: 201, type: Users })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto): Promise<Users> {
      const user = this.userService.createUser(userDto);
      return user;
    }
  
    @ApiOperation({ summary: "Role assignment" })
    @ApiResponse({ status: 200 })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
      return this.userService.addRole(dto);
    }
  
    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({ status: 200, type: [Users] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
      return this.userService.getAllUsers();
    }
  
    @ApiOperation({ summary: "Get one user" })
    @ApiResponse({ status: 200, type: [Users] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get(":id")
    getOne(@Param("id", ParseIntPipe) id: number) {
      return this.userService.getOneUser(id);
    }
  
    @ApiOperation({ summary: "Update user" })
    @ApiResponse({ status: 202, type: [Users] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Put(":id")
    update(
      @Param("id", ParseIntPipe) id: number,
      @Body() userDto: UpdateUserDto
    ) {
      return this.userService.updateUser(id, userDto);
    }
  
    @ApiOperation({ summary: "Delete user" })
    @ApiResponse({ status: 204, type: [Users] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
      return this.userService.deleteUser(id);
    }
  }