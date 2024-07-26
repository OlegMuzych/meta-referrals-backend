import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { CredentialController } from './controllers/credential.controller';
import { CredentialsService } from './services/credential.service';
import { Credential } from './entities/credential.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { RoleEntity } from './entities/role.entity';
import { RuleService } from './services/rule.service';
import { RuleEntity } from './entities/rule.entity';
import { RuleController } from './controllers/rule.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Credential, RoleEntity, RuleEntity]),
  ],
  providers: [UserService, CredentialsService, RoleService, RuleService],
  controllers: [
    UserController,
    CredentialController,
    RoleController,
    RuleController,
  ],
})
export class UserManagerModule {
  constructor(
    private readonly ruleService: RuleService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {
    this.ruleService.seedData().then();
    this.roleService.seedData().then();
    this.userService.seedData().then();
  }
}
