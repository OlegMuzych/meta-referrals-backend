import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { UserAddRolesDTO, UserAddRulesDTO } from '../dto/user.dto';
import {
  createResponse,
  IResponseFromService,
} from '../utilits/response.utils';

import { RuleService } from './rule.service';
import { RoleService } from './role.service';
import { usersSeeds } from '../seeds/user.seeds';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private ruleService: RuleService,
    private roleService: RoleService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: { roles: { rules: true }, rules: true },
    });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  update(id: IUser['id'], user: Partial<User>): Promise<UpdateResult> {
    return this.userRepository.update({ id }, user);
  }

  delete(id: IUser['id']): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { deleteDate: Date.now() });
  }

  async addRules({
    id,
    rulesId,
  }: UserAddRulesDTO): Promise<IResponseFromService> {
    try {
      const rules = await this.ruleService.findByIds(rulesId);
      const user = await this.userRepository.findOneBy({ id });
      user.rules = [...rules];
      await this.userRepository.save(user);
      return createResponse();
    } catch (error) {
      Logger.error(`Error user add rules: ${error.message}`, error.stack);
    }
  }

  async addRoles({
    id,
    rolesId,
  }: UserAddRolesDTO): Promise<IResponseFromService> {
    try {
      const roles = await this.roleService.findByIds(rolesId);
      const user = await this.userRepository.findOneBy({ id });
      user.roles = [...roles];
      await this.userRepository.save(user);
      return createResponse();
    } catch (error) {
      Logger.error(`Error user add roles: ${error.message}`, error.stack);
    }
  }

  async seedData(): Promise<void> {
    try {
      for (const item of usersSeeds) {
        const exist = await this.userRepository.existsBy({
          login: item.login,
        });
        if (!exist) {
          await this.create(item);
        } else {
          await this.userRepository.update({ login: item.login }, item);
        }
      }
      Logger.log('User seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding user: ${error.message}`, error.stack);
    }
  }
}
