import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IRole } from '../interfaces/role.interface';
import { IRule } from '../interfaces/rule.inerface';
import { IUser } from '../interfaces/user.interface';

export class UserDTO extends User {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDate()
  @IsOptional()
  deleteDate: Date;

  @IsString()
  @IsOptional()
  avatar: string;
}

export class UserCreateDTO extends OmitType(UserDTO, ['id']) {}

export class UserUpdateDTO extends OmitType(UserDTO, [
  'login',
  'deleteDate',
  'isActive',
  'id',
]) {}

export class UserAddRulesDTO {
  @IsInt()
  @IsNotEmpty()
  id: IUser['id'];

  @IsArray()
  @IsNotEmpty()
  rulesId: IRule['id'][];
}

export class UserAddRolesDTO {
  @IsInt()
  @IsNotEmpty()
  id: IUser['id'];

  @IsArray()
  @IsNotEmpty()
  rolesId: IRole['id'][];
}
