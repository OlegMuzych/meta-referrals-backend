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

import { PickType } from '@nestjs/mapped-types';
import { IRole } from '../interfaces/role.interface';
import { IRule } from '../interfaces/rule.inerface';

export class RoleDTO implements Omit<IRole, 'rules'> {
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

export class RoleAddRulesDTO {
  @IsInt()
  @IsNotEmpty()
  id: IRole['id'];

  @IsArray()
  @IsNotEmpty()
  rulesId: IRule['id'][];
}
