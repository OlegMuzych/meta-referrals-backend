import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleEntity } from '../entities/rule.entity';
import { rulesSeeds } from '../seeds/rule.seeds';
import {
  createResponse,
  IResponseFromService,
} from '../utilits/response.utils';
import { IRule } from '../interfaces/rule.inerface';

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

  async findByIds(ids: IRule['id'][]): Promise<RuleEntity[]> {
    const rules: RuleEntity[] = [];
    for (const item of ids) {
      const rule = await this.ruleRepository.findOneBy({ id: item });
      rules.push(rule);
    }
    return rules;
  }

  async seedData(rules: Partial<IRule>[]): Promise<void> {
    try {
      for (const item of rules) {
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
