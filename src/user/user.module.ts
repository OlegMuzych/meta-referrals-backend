import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CredentialController } from './controllers/credential.controller';
import { CredentialsService } from './services/credential.service';
import { Credential } from './entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential])],
  providers: [UserService, CredentialsService],
  controllers: [UserController, CredentialController],
})
export class UserModule {}
