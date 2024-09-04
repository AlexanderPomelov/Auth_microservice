import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    const savedTask = await this.taskRepository.save(task);
    return savedTask;
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async getAllTask() {
    const task = await this.taskRepository.find();
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    const updatedTask = await this.taskRepository.save(task);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async moveTask(id: number, newPosition: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    task.order = newPosition;
    return this.taskRepository.save(task);
  }
}