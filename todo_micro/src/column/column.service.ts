import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ColumnEntity } from "./column.entity";
import { CreateColumnDto } from "./dto/create-column.dto";

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>
  ) {}

  async createColumn(columnData: CreateColumnDto): Promise<ColumnEntity> {
    const column = this.columnRepository.create(columnData);
    return this.columnRepository.save(column);
  }

  async updateColumn(id: number, dto: CreateColumnDto): Promise<ColumnEntity> {
    const columnToUpdate = await this.columnRepository.preload({
      id: id,
      ...dto,
    });
    const updatedColumn = await this.columnRepository.save(columnToUpdate);
    return updatedColumn;
  }
  async getColumn(id: number): Promise<ColumnEntity> {
    return this.columnRepository.findOne({ where: { id } });
  }

  async findAllColumn(): Promise<ColumnEntity[]> {
    return this.columnRepository.find({ relations: ["tasks"] });
  }

  async moveColumn(id: number, newPosition: number): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOne({ where: { id } });
    if (!column) {
      throw new Error("Column not found");
    }
    column.order = newPosition;
    return this.columnRepository.save(column);
  }

  async deleteColumn(id: number): Promise<void> {
    await this.columnRepository.delete(id);
  }
}
