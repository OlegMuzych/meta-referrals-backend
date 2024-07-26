import { UserEntity } from '../entities/user.entity';

export const usersSeeds: UserEntity[] = [
  //todo: брать данные из .env
  {
    id: 1,
    name: 'admin',
    login: 'admin',
    description: 'Dafault User',
    isActive: true,
    password: '1234',
  },
].map((item) => new UserEntity(item));
