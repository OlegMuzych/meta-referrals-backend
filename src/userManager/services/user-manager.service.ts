import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RuleService } from './rule.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { CredentialsService } from './credential.service';
import { CredentialEntity } from '../entities/credential.entity';
import { IUserManager } from '../interfaces/user-manager.interface';

@Injectable()
export class UserManagerService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CredentialEntity)
    private credentialRepository: Repository<CredentialEntity>,
    private ruleService: RuleService,
    private roleService: RoleService,
    private userService: UserService,
    private credentialsService: CredentialsService,
  ) {}

  async seedUsers(users: IUserManager[]): Promise<void> {
    try {
      for (const item of users) {
        const existUser = await this.userRepository.existsBy({
          login: item.login,
        });
        if (!existUser) {
          await this.userService.create(new UserEntity(item));
        } else {
          // await this.userRepository.update({ login: item.login }, new (item));
        }
        const { id: userId } = await this.userRepository.findOneBy({
          login: item.login,
        });
        const { password } = item;
        if (password) {
          const existCred = await this.credentialRepository.existsBy({
            userId: userId,
          });
          if (!existCred) {
            await this.credentialsService.create({
              newPassword: password,
              userId: userId,
            });
          }
        }
      }
      Logger.log('User seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding user: ${error.message}`, error.stack);
    }
  }

  async seedRootUser(user: IUserManager) {
    try {
      const existUser = await this.userRepository.existsBy({
        login: user.login,
      });
      if (!existUser) {
        await this.userService.create(new UserEntity(user));
      } else {
        // await this.userRepository.update({ login: item.login }, new (item));
      }
      const { id: userId } = await this.userRepository.findOneBy({
        login: user.login,
      });
      const { password } = user;
      if (password) {
        const existCred = await this.credentialRepository.existsBy({
          userId: userId,
        });
        if (!existCred) {
          await this.credentialsService.create({
            newPassword: password,
            userId: userId,
          });
        }
      }
      Logger.log('User seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding user: ${error.message}`, error.stack);
    }
  }
}
