import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { RuleService } from '../services/rule.service';
import { RuleEntity } from '../entities/rule.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rule')
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}
  @Get()
  async finAll(): Promise<RuleEntity[]> {
    const { state, message, data } = await this.ruleService.findAll();
    if (state) {
      return data.map((item) => new RuleEntity(item));
    } else {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
