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
import { User } from '../entities/user.entity';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() user: UserCreateDTO): Promise<User> {
    return new User(await this.userService.create(user));
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map((item) => new User(item));
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDTO,
  ): Promise<UpdateResult> {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return this.userService.delete(id);
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
