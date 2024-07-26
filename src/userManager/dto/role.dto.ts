import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { PickType } from '@nestjs/swagger';
import { IRole } from '../interfaces/role.interface';
import { IRule } from '../interfaces/rule.inerface';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO implements Omit<IRole, 'rules'> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name;

  @IsString()
  @ApiProperty()
  description;

  @IsBoolean()
  @ApiProperty()
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
  @ApiProperty()
  id: IRole['id'];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  rulesId: IRule['id'][];
}
