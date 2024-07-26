import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  UserAddRolesDTO,
  UserAddRulesDTO,
  UserCreateDTO,
  UserDTO,
  UserUpdateDTO,
} from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() user: UserCreateDTO): Promise<UserEntity> {
    const { state, message, data } = await this.userService.create(user);
    if (state) {
      return new UserEntity(data);
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const { state, message, data } = await this.userService.findAll();
    if (state) {
      return data.map((item) => new UserEntity(item));
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDTO,
  ): Promise<boolean> {
    const { state, message } = await this.userService.update(Number(id), user);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const { state, message } = await this.userService.delete(id);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('addrules')
  async addRules(@Body() body: UserAddRulesDTO): Promise<boolean> {
    const { state, message } = await this.userService.addRules(body);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('addroles')
  async addRoles(@Body() body: UserAddRolesDTO): Promise<boolean> {
    const { state, message } = await this.userService.addRoles(body);
    if (state) {
      return state;
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
