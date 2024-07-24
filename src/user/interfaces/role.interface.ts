import { IRule } from './rule.inerface';

export interface IRole {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  rules: IRule[];
}
