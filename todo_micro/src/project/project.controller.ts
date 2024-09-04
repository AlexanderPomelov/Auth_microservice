import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
  } from "@nestjs/common";
  import { CreateProjectDto } from "./dto/create-project.dto";
  import { ProjectService } from "./project.service";
  import { UpdateProjectDto } from "./dto/update-project.dto";
  import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { Project } from "./project.entity";
  import { ValidationPipe } from "src/pipes/validation.pipe";
  
  @ApiTags("Projects")
  @Controller("api/projects")
  export class ProjectController {
    constructor(private projectsService: ProjectService) {}
  
    @ApiOperation({ summary: "Create a project" })
    @ApiResponse({ status: 201, type: Project })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() projectDto: CreateProjectDto) {
      const project = this.projectsService.createProject(projectDto);
      return project;
    }
  
    @ApiOperation({ summary: "Get all projects" })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    getAll() {
      return this.projectsService.getAllProjects();
    }
  
    @ApiOperation({ summary: "Get one project" })
    @ApiResponse({ status: 200, type: [Project] })
    @Get(":id")
    getOne(@Param("id", ParseIntPipe) id: number) {
      return this.projectsService.getOneProject(id);
    }
  
    @ApiOperation({ summary: "Update project" })
    @ApiResponse({ status: 202, type: [Project] })
    @Put(":id")
    update(
      @Param("id", ParseIntPipe) id: number,
      @Body() projectDto: UpdateProjectDto
    ) {
      return this.projectsService.updateProject(id, projectDto);
    }
  
    @ApiOperation({ summary: "Delete project" })
    @ApiResponse({ status: 204, type: [Project] })
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
      return this.projectsService.deleteProject(id);
    }
  }
  