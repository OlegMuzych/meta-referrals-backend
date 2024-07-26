import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { ICredential } from '../interfaces/credential.interface';

export class CredentialDTO implements Pick<ICredential, 'id' | 'userId'> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  id: ICredential['id'];

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  userId: ICredential['userId'];
}

export class CredentialCreateDTO extends PickType(CredentialDTO, [
  'userId',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}

export class CredentialDeleteDTO extends PickType(CredentialDTO, [
  'userId',
] as const) {}

export class CredentialUpdateDTO extends CredentialCreateDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;
}
