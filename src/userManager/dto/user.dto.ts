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

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IRole } from '../interfaces/role.interface';
import { IRule } from '../interfaces/rule.inerface';
import { IUser } from '../interfaces/user.interface';

export class UserDTO extends UserEntity {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  deleteDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
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
  @ApiProperty()
  id: IUser['id'];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  rulesId: IRule['id'][];
}

export class UserAddRolesDTO {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id: IUser['id'];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  rolesId: IRole['id'][];
}
