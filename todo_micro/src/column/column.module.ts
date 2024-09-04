import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColumnEntity } from "./column.entity";
import { ColumnService } from "./column.service";
import { ColumnController } from "./column.controller";
import { ProjectModule } from "src/project/project.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]), ProjectModule, JwtModule
  ],
  providers: [ColumnService],
  controllers: [ColumnController],

  exports: [TypeOrmModule, ColumnService],
})
export class ColumnModule {}
