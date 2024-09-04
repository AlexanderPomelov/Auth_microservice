import { Module } from '@nestjs/common';
import { ColumnModule } from './column/column.module';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project/project.entity';
import { ColumnEntity } from './column/column.entity';
import { Task } from './task/task.entity';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.TODO_POSTGRES_HOST_DOCKER || 'todo-db',
      port: Number(process.env.TODO_POSTGRES_PORT) || 5432,
      username: process.env.TODO_POSTGRES_NAME || "postgres",
      password: process.env.TODO_POSTGRES_PASSWORD,
      database: process.env.TODO_POSTGRES_DB || "todo_micro",
      entities: [Project, ColumnEntity, Task],
      synchronize: true,
      autoLoadEntities: true
    }),
    
    ColumnModule, ProjectModule, TaskModule, RabbitMQModule],
  controllers: [TaskController],
  providers: [ProjectService],
})
export class AppModule {}
