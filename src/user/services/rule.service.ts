import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleEntity } from '../entities/rule.entity';
import { rulesSeeds } from '../seeds/rule.seeds';
import { RoleEntity } from '../entities/role.entity';
import {
  createResponse,
  IResponseFromService,
} from '../interfaces/errors.type';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(RuleEntity)
    private ruleRepository: Repository<RuleEntity>,
  ) {}
  async findAll(): Promise<IResponseFromService<RuleEntity[]>> {
    const data = await this.ruleRepository.find();
    return createResponse<RuleEntity[]>({ data });
  }
  async seedData(): Promise<void> {
    try {
      for (const item of rulesSeeds) {
        const exist = await this.ruleRepository.existsBy({ name: item.name });
        if (!exist) {
          await this.ruleRepository.save(item);
        }
      }
      Logger.log('Data seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding data: ${error.message}`, error.stack);
    }
  }
}
