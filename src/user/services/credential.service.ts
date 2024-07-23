import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Credential } from '../entities/credential.entity';
import {
  CredentialCreateDTO,
  CredentialDeleteDTO,
  CredentialUpdateDTO,
} from '../dto/credential.dto';
import { HashUtils } from '../utilits/hash.utils';
import { ResponseType } from '../interfaces/errors.type';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}
  async create(credential: CredentialCreateDTO): Promise<ResponseType<string>> {
    const { userId, newPassword } = credential;
    const exist = await this.credentialRepository.exists({
      where: {
        userId: userId,
      },
    });
    if (exist) {
      return {
        state: false,
        message: 'Credential already exist',
      };
    }
    const passwordHash = await HashUtils.create(newPassword);
    const cred = await this.credentialRepository.create({
      passwordHash,
      userId,
    });
    await this.credentialRepository.save(cred);
    return {
      state: true,
    };
  }

  async update(credential: CredentialUpdateDTO): Promise<ResponseType<string>> {
    const { userId, newPassword, oldPassword } = credential;
    const exist = await this.credentialRepository.existsBy({ userId });
    if (!exist) {
      return {
        state: false,
        message: 'Credential not exist',
      };
    }
    const cred = await this.credentialRepository.findOneBy({ userId });
    const { passwordHash } = cred;
    const flag = await HashUtils.compare(oldPassword, passwordHash);
    if (!flag) {
      return {
        state: false,
        message: 'Incorrect current password',
      };
    }
    const newPasswordHash = await HashUtils.create(newPassword);
    const newCred = await this.credentialRepository.update(
      { userId },
      {
        passwordHash: newPasswordHash,
      },
    );
    // await this.credentialRepository.save(newCred);
    return { state: true };
  }

  async delete(credential: CredentialDeleteDTO): Promise<ResponseType<string>> {
    const { userId } = credential;
    const exist = await this.credentialRepository.exists({
      where: {
        userId: userId,
      },
    });
    if (exist) {
      await this.credentialRepository.delete({ userId });
    } else {
      return { state: false, message: 'Credential not exist' };
    }
    return { state: true };
  }
}
