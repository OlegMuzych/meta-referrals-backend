import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { CredentialController } from './controllers/credential.controller';
import { CredentialsService } from './services/credential.service';
import { CredentialEntity } from './entities/credential.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { RoleEntity } from './entities/role.entity';
import { RuleService } from './services/rule.service';
import { RuleEntity } from './entities/rule.entity';
import { RuleController } from './controllers/rule.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './services/jwt.config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CredentialEntity,
      RoleEntity,
      RuleEntity,
    ]),
    // JwtModule.register({
    //   global: true,
    //   // secret: jwtConstants.secret,
    //   secret: this.configService.get<string>('usermanager.jwtSecret'),
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    UserService,
    CredentialsService,
    RoleService,
    RuleService,
    AuthService,
  ],
  controllers: [
    UserController,
    CredentialController,
    RoleController,
    RuleController,
    AuthController,
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
