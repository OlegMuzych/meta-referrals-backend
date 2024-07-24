import { IRule } from '../interfaces/rule.inerface';

export const rulesSeeds: Partial<IRule>[] = [
  { name: 'GetRules', description: 'Can get rules' },

  { name: 'GetUsers', description: 'Can get users' },
  { name: 'UpdateUser', description: 'Can update users' },
  { name: 'DeleteUser', description: 'Can delete users' },
  { name: 'CreateUser', description: 'Can create users' },

  { name: 'GetRole', description: 'Can get role' },
  { name: 'CreateRole', description: 'Can create role' },
  { name: 'UpdateRole', description: 'Can update role' },
  { name: 'DeleteRole', description: 'Can delete role' },
];
