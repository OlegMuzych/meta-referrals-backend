import { UserEntity } from '../entities/user.entity';
import { IUserManager } from '../interfaces/user-manager.interface';

export const usersSeeds: IUserManager[] = [
  //todo: брать данные из .env
  {
    name: 'admin',
    login: 'admin',
    description: 'Dafault User',
    isActive: true,
    password: '1234',
  },
].map((item) => new UserEntity(item));
