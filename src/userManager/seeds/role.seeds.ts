import { RoleEntity } from '../entities/role.entity';

export const rolesSeeds: RoleEntity[] = [
  { id: 1, name: 'root', description: 'root role can all', isActive: true },
].map((item) => new RoleEntity(item));
