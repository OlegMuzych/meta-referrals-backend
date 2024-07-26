import { IUser } from './user.interface';

export interface IAuth {
  login: IUser['login'];
  password: string;
  token: string;
  user: Omit<IUser, 'credential'>;
}
