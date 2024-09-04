import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async getOneRole(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async createRole(dto: CreateRoleDto) {
    const role = this.roleRepository.create(dto);
    const savedRole = await this.roleRepository.save(role);
    return role;
  }
}