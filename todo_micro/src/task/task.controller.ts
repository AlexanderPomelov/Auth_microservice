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
  } from "@nestjs/common";
  import { TaskService } from "./task.service";
  import { CreateTaskDto } from "./dto/create-task.dto";
  import { UpdateTaskDto } from "./dto/update-task.dto";
  import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { Task } from "./task.entity";
  import { Roles } from "src/auth/roles-auth.decorator";
  import { RolesGuard } from "src/auth/roles.guard";
  import { ValidationPipe } from "src/pipes/validation.pipe";
  
  @ApiTags("Task")
  @Controller("task")
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @ApiOperation({ summary: "Create task" })
    @ApiResponse({ status: 201, type: Task })
    @UsePipes(ValidationPipe)
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
      return this.taskService.createTask(createTaskDto);
    }
  
    @ApiOperation({ summary: "Get one task" })
    @ApiResponse({ status: 200, type: [Task] })
    @Get(":id")
    getTask(@Param("id", ParseIntPipe) id: number) {
      return this.taskService.getTask(id);
    }
  
    @ApiOperation({ summary: "Get all task" })
    @ApiResponse({ status: 200, type: [Task] })
    @Roles("user")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
      return this.taskService.getAllTask();
    }
  
    @ApiOperation({ summary: "Update task" })
    @ApiResponse({ status: 202, type: [Task] })
    @Put(":id")
    updateTask(
      @Param("id", ParseIntPipe) id: number,
      @Body() updateTaskDto: UpdateTaskDto
    ) {
      return this.taskService.updateTask(id, updateTaskDto);
    }
  
    @ApiOperation({ summary: "Delete task" })
    @ApiResponse({ status: 204, type: [Task] })
    @Delete(":id")
    deleteTask(@Param("id", ParseIntPipe) taskId: number) {
      return this.taskService.deleteTask(taskId);
    }
  
    @ApiOperation({ summary: "Move task" })
    @ApiResponse({ status: 202, type: [Task] })
    @Put(":id/move")
    moveTask(
      @Param("id", ParseIntPipe) id: number,
      @Body("newPosition", ParseIntPipe) newPosition: number
    ) {
      return this.taskService.moveTask(id, newPosition);
    }
  }
  