import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { Users } from 'src/users/users.enity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './role.controller';
import { Role } from './role.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role, Users])],
  exports: [RolesService],
})
export class RoleModule {}
