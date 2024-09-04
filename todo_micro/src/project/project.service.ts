import { Injectable } from "@nestjs/common";
import { Project } from "./project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      relations: ["columns"],
    });
    return projects;
  }

  async getOneProject(id: number): Promise<Project[]> {
    const project = await this.projectRepository.findBy({ id });
    return project;
  }

  async createProject(dto: CreateProjectDto) {
    const project = this.projectRepository.create(dto);
    const savedProject = await this.projectRepository.save(project);
    return savedProject;
  }

  async updateProject(id: number, dto: UpdateProjectDto): Promise<any> {
    const projectToUpdate = await this.projectRepository.preload({
      id: id,
      ...dto,
    });
    const updatedProject = await this.projectRepository.save(projectToUpdate);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<any> {
    const deletedProject = await this.projectRepository.delete(id);
    return deletedProject;
  }
}
