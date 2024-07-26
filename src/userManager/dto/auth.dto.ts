import { IAuth } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import { ICredential } from '../interfaces/credential.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO implements Pick<IAuth, 'login' | 'password'> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: IUser['login'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: ICredential['password'];
}
