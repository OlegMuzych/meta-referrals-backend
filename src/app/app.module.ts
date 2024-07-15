import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configLoads } from '../config';
import { PostgreSqlConfigService } from '../database/database.service';
import { UserService } from '../user/user.service';

const modules = [UserModule];

export const global_modules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [...configLoads],
    envFilePath: ['.env'],
  }),
  TypeOrmModule.forRootAsync({
    useClass: PostgreSqlConfigService,
  }),
];
@Module({
  imports: [...global_modules, ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
