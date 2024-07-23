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

import { Credential } from '../entities/credential.entity';
import { PickType, OmitType } from '@nestjs/mapped-types';

export class CredentialDTO {
  @IsInt()
  @IsNotEmpty()
  id;

  @IsInt()
  @IsNotEmpty()
  userId;
}

export class CredentialCreateDTO extends PickType(CredentialDTO, [
  'userId',
] as const) {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class CredentialDeleteDTO extends PickType(CredentialDTO, [
  'userId',
] as const) {}

export class CredentialUpdateDTO extends CredentialCreateDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
