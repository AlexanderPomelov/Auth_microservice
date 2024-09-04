import { forwardRef, Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { ColumnEntity } from "src/column/column.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, ColumnEntity]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "secret123",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule, TaskService, JwtModule],
})
export class TaskModule {}
