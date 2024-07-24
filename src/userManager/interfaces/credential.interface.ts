import { IUser } from './user.interface';

export interface ICredential {
  id: number;
  userId: IUser['id'];

  passwordHash: string;
  salt: string;
}
