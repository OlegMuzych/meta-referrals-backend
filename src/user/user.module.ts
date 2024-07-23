import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CredentialController } from './controllers/credential.controller';
import { CredentialsService } from './services/credential.service';
import { Credential } from './entities/credential.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential, RoleEntity])],
  providers: [UserService, CredentialsService, RoleService],
  controllers: [UserController, CredentialController, RoleController],
})
export class UserModule {}
