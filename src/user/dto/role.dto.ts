import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PickType } from '@nestjs/mapped-types';
import { IRole } from '../interfaces/role.interface';

export class RoleDTO implements IRole {
  @IsInt()
  @IsNotEmpty()
  id;

  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  description;

  @IsBoolean()
  isActive;
}

export class RoleCreateDTO extends PickType(RoleDTO, [
  'name',
  'description',
  'isActive',
] as const) {}

export class RoleDeleteDTO extends PickType(RoleDTO, ['id'] as const) {}

export class RoleUpdateDTO extends RoleDTO {}
