import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.enity';
import { RolesService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private roleRepository: RolesService
    ) {}

    async getAllUsers() {
        const users = await this.userRepository.find({ relations: ["roles"] });
        return users;
      }
    
      async addRole(dto: AddRoleDto): Promise<Users> {
        const users = await this.userRepository.findOne({
          where: { id: dto.userId },
          relations: ["roles"],
        });
        const role = await this.roleRepository.getOneRole(dto.value);
        if (role && users) {
          users.roles.push(role);
          await this.userRepository.save(users);
          return users;
        }
        throw new HttpException("User or role is not found", HttpStatus.NOT_FOUND);
      }
    
      async getOneUser(id: number): Promise<Users[]> {
        const user = await this.userRepository.find({
          where: { id: id },
          relations: ["roles"],
        });
        return user;
      }
    
      async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
          where: { email },
          relations: ["roles"],
        });
        return user;
      }
      async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        const savedUser = await this.userRepository.save(user);
        const role = await this.roleRepository.getOneRole("user");
        savedUser.roles = [role];
        return this.userRepository.save(savedUser);
      }
    
      async updateUser(id: number, dto: UpdateUserDto): Promise<any> {
        const userToUpdate = await this.userRepository.preload({
          id: id,
          ...dto,
        });
        const updatedUser = await this.userRepository.save(userToUpdate);
        return updatedUser;
      }
    
      async deleteUser(id: number): Promise<any> {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
      }
    }