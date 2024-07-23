import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

import { RoleService } from '../services/role.service';
import { RoleCreateDTO, RoleDeleteDTO, RoleUpdateDTO } from '../dto/role.dto';
import { RoleEntity } from '../entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async finAll(): Promise<RoleEntity[]> {
    const { state, message, data } = await this.roleService.findAll();
    if (state) {
      return data.map((item) => new RoleEntity(item));
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post()
  async create(@Body() role: RoleCreateDTO): Promise<RoleEntity> {
    const { state, message, data } = await this.roleService.create(role);
    if (state) {
      return new RoleEntity(data);
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() role: RoleUpdateDTO): Promise<boolean> {
    const { id, ...newRole } = role;
    const { state, message } = await this.roleService.update(id, newRole);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async delete(@Body() role: RoleDeleteDTO): Promise<boolean> {
    const { id } = role;
    const { state, message } = await this.roleService.delete(id);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
