import { User } from '../entities/user.entity';

export const usersSeeds: User[] = [
  //todo: брать данные из .env
  {
    id: 1,
    name: 'admin',
    login: 'admin',
    description: 'Dafault User',
    isActive: true,
    password: '1234',
  },
].map((item) => new User(item));
