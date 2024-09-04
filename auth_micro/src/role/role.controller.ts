import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";
import { RolesService } from "./role.service";


@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private RoleService: RolesService) {}

  @ApiOperation({ summary: "Create a role" })
  @ApiResponse({ status: 201, type: Role })
  @UsePipes(ValidationPipe)
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.RoleService.createRole(roleDto);
  }

  @ApiOperation({ summary: "Get one role" })
  @ApiResponse({ status: 200, type: [Role] })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get("/:value")
  getOne(@Param("value") value: string) {
    return this.RoleService.getOneRole(value);
  }

  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, type: Role })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.RoleService.getAllRoles();
  }
}