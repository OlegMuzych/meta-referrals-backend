import { IUser } from './user.interface';

export interface ILogin {
  login: IUser['login'];
  password: string;
  token: string;
  user: Omit<IUser, 'credential'>;
}
