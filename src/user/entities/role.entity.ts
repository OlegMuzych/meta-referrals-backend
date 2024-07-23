import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRole } from '../interfaces/role.interface';

@Entity({ name: 'roles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'text', nullable: false, unique: true })
  name;

  @Column({ type: 'text', nullable: false })
  description;
  @Column({ type: 'boolean', default: true })
  isActive;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
