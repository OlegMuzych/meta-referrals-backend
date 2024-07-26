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
import {
  createResponse,
  IResponseFromService,
} from '../utilits/response.utils';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}
  async create(
    credential: CredentialCreateDTO,
  ): Promise<IResponseFromService<boolean>> {
    const { userId, newPassword } = credential;
    const exist = await this.credentialRepository.exists({
      where: {
        userId: userId,
      },
    });
    if (exist) {
      return createResponse({
        state: false,
        message: 'Credential already exist',
      });
    }
    const passwordHash = await HashUtils.create(newPassword);
    const cred = await this.credentialRepository.create({
      passwordHash,
      userId,
    });
    await this.credentialRepository.save(cred);
    return createResponse();
  }

  async update(
    credential: CredentialUpdateDTO,
  ): Promise<IResponseFromService<boolean>> {
    const { userId, newPassword, oldPassword } = credential;
    const exist = await this.credentialRepository.existsBy({ userId });
    if (!exist) {
      return createResponse({
        state: false,
        message: 'Credential not exist',
      });
    }
    const cred = await this.credentialRepository.findOneBy({ userId });
    const { passwordHash } = cred;
    const flag = await HashUtils.compare(oldPassword, passwordHash);
    if (!flag) {
      return createResponse({
        state: false,
        message: 'Incorrect current password',
      });
    }
    const newPasswordHash = await HashUtils.create(newPassword);
    const newCred = await this.credentialRepository.update(
      { userId },
      {
        passwordHash: newPasswordHash,
      },
    );
    // await this.credentialRepository.save(newCred);
    return createResponse();
  }

  async delete(
    credential: CredentialDeleteDTO,
  ): Promise<IResponseFromService<boolean>> {
    const { userId } = credential;
    const exist = await this.credentialRepository.exists({
      where: {
        userId: userId,
      },
    });
    if (exist) {
      await this.credentialRepository.delete({ userId });
    } else {
      return createResponse({ state: false, message: 'Credential not exist' });
    }
    return createResponse();
  }
}
