import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private ruleService: RuleService,
    private roleService: RoleService,
  ) {}

  async findAll(): Promise<IResponseFromService<UserEntity[]>> {
    try {
      const users = await this.userRepository.find({
        relations: { roles: { rules: true }, rules: true },
      });
      return createResponse({ state: true, data: users });
    } catch (error) {
      Logger.error(`Not get users: ${error.message}`, error.stack);
    }
  }

  // create(user: Partial<UserEntity>): Promise<UserEntity> {
  //   const newUser = this.userRepository.create(user);
  //   return this.userRepository.save(newUser);
  // }

  async create(
    user: Partial<UserEntity>,
  ): Promise<IResponseFromService<UserEntity>> {
    try {
      let newUser = await this.userRepository.create(user);
      newUser = await this.userRepository.save(newUser);
      return createResponse({ state: true, data: newUser });
    } catch (error) {
      Logger.error(`Not create user: ${error.message}`, error.stack);
    }
  }

  // update(id: IUser['id'], user: Partial<UserEntity>): Promise<UpdateResult> {
  //   return this.userRepository.update({ id }, user);
  // }
  async update(
    id: IUser['id'],
    user: Partial<UserEntity>,
  ): Promise<IResponseFromService<UpdateResult>> {
    try {
      const result = await this.userRepository.update({ id }, user);
      return createResponse({ state: true, data: result });
    } catch (error) {
      Logger.error(`Not update user: ${error.message}`, error.stack);
    }
  }

  // delete(id: IUser['id']): Promise<UpdateResult> {
  //   return this.userRepository.update({ id }, { deleteDate: Date.now() });
  // }

  async delete(id: IUser['id']): Promise<IResponseFromService<UpdateResult>> {
    // try {
    const result = await this.userRepository.update(
      { id },
      { deleteDate: new Date(Date.now()) },
    );
    return createResponse({ state: true, data: result });
    // } catch (error) {
    //   Logger.error(`Not soft delete user: ${error.message}`, error.stack);
    // }
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
