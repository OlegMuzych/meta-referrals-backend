import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagerModule } from '../userManager/userManager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { configLoads } from '../config';
import { PostgreSqlConfigService } from '../database/database.service';
import { RouterModule } from '@nestjs/core';

const modules = [
  UserManagerModule,
  RouterModule.register([
    {
      path: 'api',
      children: [
        {
          path: 'usermanager',
          module: UserManagerModule,
        },
      ],
    },
  ]),
];

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
