import { IApp } from './app.interface';
import { IUser } from '../../userManager/interfaces/user.interface';

export interface ILink {
  id: number;
  appId: IApp['id'];
  userId: IUser['id'];
  url: string;
}
