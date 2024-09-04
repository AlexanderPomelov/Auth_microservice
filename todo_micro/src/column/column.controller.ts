import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    ParseIntPipe,
    UseGuards,
    Delete,
  } from "@nestjs/common";
  import { ColumnService } from "./column.service";
  import { CreateColumnDto } from "./dto/create-column.dto";
  import { UpdateColumnDto } from "./dto/update-colum.dto";
  import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { Roles } from "src/auth/roles-auth.decorator";
  import { RolesGuard } from "src/auth/roles.guard";
  import { ColumnEntity } from "./column.entity";
  
  @ApiTags("Column")
  @Controller("column")
  export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}
  
    @ApiOperation({ summary: "Create a column" })
    @ApiResponse({ status: 201, type: ColumnEntity })
    @Post()
    create(@Body() createColumnDto: CreateColumnDto) {
      return this.columnService.createColumn(createColumnDto);
    }
  
    @ApiOperation({ summary: "Get all columns" })
    @ApiResponse({ status: 200, type: ColumnEntity })
    @Roles("user")
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
      return this.columnService.findAllColumn();
    }
  
    @ApiOperation({ summary: "Get one column" })
    @ApiResponse({ status: 200, type: [ColumnEntity] })
    @Roles("user")
    @UseGuards(RolesGuard)
    @Get(":id")
    getTask(@Param("id", ParseIntPipe) id: number) {
      return this.columnService.getColumn(id);
    }
  
    @ApiOperation({ summary: "Update a column" })
    @ApiResponse({ status: 202, type: [ColumnEntity] })
    @Roles("user")
    @UseGuards(RolesGuard)
    @Put(":id/move")
    moveColumn(
      @Param("id", ParseIntPipe) id: number,
      @Body("newPosition", ParseIntPipe) newPosition: number
    ) {
      console.log(newPosition);
      return this.columnService.moveColumn(id, newPosition);
    }
  
    @ApiOperation({ summary: "Update column" })
    @ApiResponse({ status: 202, type: [ColumnEntity] })
    @Roles("user")
    @UseGuards(RolesGuard)
    @Put(":id")
    updateTask(
      @Param("id", ParseIntPipe) id: number,
      @Body() updateColumnDto: UpdateColumnDto
    ) {
      return this.columnService.updateColumn(id, updateColumnDto);
    }
  
    @ApiOperation({ summary: "Delete column" })
    @ApiResponse({ status: 204, type: [ColumnEntity] })
  //   @Roles("user")
  //   @UseGuards(RolesGuard)
    @Delete(":id")
    delete(@Param("id") id: number) {
      return this.columnService.deleteColumn(id);
    }
  }
  