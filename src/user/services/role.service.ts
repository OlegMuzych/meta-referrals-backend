import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createResponse,
  IResponseFromService,
} from '../interfaces/errors.type';
import { RoleEntity } from '../entities/role.entity';
import { RoleAddRulesDTO, RoleCreateDTO } from '../dto/role.dto';
import { IRole } from '../interfaces/role.interface';
import { rulesSeeds } from '../seeds/rule.seeds';
import { rolesSeeds } from '../seeds/role.seeds';
import { IRule } from '../interfaces/rule.inerface';
import { RuleEntity } from '../entities/rule.entity';
import { RuleService } from './rule.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private ruleService: RuleService,
  ) {}

  async findAll(): Promise<IResponseFromService<RoleEntity[]>> {
    const data = await this.roleRepository.find();
    return createResponse<RoleEntity[]>({ data });
  }
  async create(role: RoleCreateDTO): Promise<IResponseFromService<RoleEntity>> {
    const newRole = await this.roleRepository.create(role);
    const data = await this.roleRepository.save(newRole);
    return createResponse<RoleEntity>({ data });
  }

  async update(
    id: IRole['id'],
    role: Partial<RoleEntity>,
  ): Promise<IResponseFromService> {
    const exist = await this.roleRepository.existsBy({ id });
    if (!exist) {
      return createResponse<null>({ state: false, message: 'Role not exist' });
    }
    await this.roleRepository.update({ id }, role);
    return createResponse();
  }

  async delete(id: IRole['id']): Promise<IResponseFromService<RoleEntity>> {
    const exist = await this.roleRepository.existsBy({ id });
    if (exist) {
      await this.roleRepository.delete({ id });
    } else {
      return createResponse<null>({ state: false, message: 'Role not exist' });
    }
    return createResponse();
  }

  async addRules({
    id,
    rulesId,
  }: RoleAddRulesDTO): Promise<IResponseFromService> {
    try {
      const rules = await this.ruleService.findByIds(rulesId);
      const role = await this.roleRepository.findOneBy({ id });
      role.rules = [...rules];
      await this.roleRepository.save(role);
      return createResponse();
    } catch (error) {
      Logger.error(`Error seeding role: ${error.message}`, error.stack);
    }
  }

  async findByIds(ids: IRole['id'][]): Promise<RoleEntity[]> {
    const roles: RoleEntity[] = [];
    for (const item of ids) {
      const rule = await this.roleRepository.findOneBy({ id: item });
      roles.push(rule);
    }
    return roles;
  }

  async seedData(): Promise<void> {
    try {
      for (const item of rolesSeeds) {
        const exist = await this.roleRepository.existsBy({
          id: item.id,
          name: item.name,
        });
        if (!exist) {
          const role = await this.roleRepository.create(item);
          await this.roleRepository.insert(role);
        } else {
          await this.roleRepository.update(
            { id: item.id, name: item.name },
            item,
          );
        }
      }
      Logger.log('Role seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding role: ${error.message}`, error.stack);
    }
  }
}
