import { IUser } from './user.interface';

export interface IUserManager extends Partial<IUser> {
  password?: string;
}
