import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialEntity } from '../entities/credential.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dto/auth.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import {
  createResponse,
  IResponseFromService,
} from '../utilits/response.utils';
import { LoginEntity } from '../entities/login.entity';
import { HashUtils } from '../utilits/hash.utils';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CredentialEntity)
    private credentialRepository: Repository<CredentialEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async login({
    login,
    password,
  }: LoginDTO): Promise<IResponseFromService<UserEntity>> {
    const {
      state,
      data: user,
      message,
    } = await this.userService.getByLogin(login);
    if (!state) {
      return createResponse({ state, message });
    }
    if (!user.credential) {
      return createResponse({
        state: false,
        message: 'Credential not exist',
      });
    }
    const {
      credential: { passwordHash },
    } = user;

    const flag = await HashUtils.compare(password, passwordHash);
    if (!flag) {
      return createResponse({
        state: false,
        message: 'Incorrect password',
      });
    }
    // Logger.debug(JSON.stringify(new UserEntity(user)));
    // const payload = { sub: new UserEntity(user) };
    // const token = await this.jwtService.signAsync(payload);
    return createResponse({
      state: true,
      data: user,
    });
  }
}
