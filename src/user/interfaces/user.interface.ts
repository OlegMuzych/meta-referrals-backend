import { IRule } from './rule.inerface';
import { IRole } from './role.interface';

export interface IUser {
  id: number;
  avatar: string;

  deleteDate: Date;

  description: string;

  email: string;

  isActive: boolean;

  login: string;

  name: string;
  rules: IRule[];
  roles: IRole[];
}
