import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRole } from '../interfaces/role.interface';
import { RuleEntity } from './rule.entity';
import { IRule } from '../interfaces/rule.inerface';

@Entity({ name: 'roles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn()
  // @PrimaryColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToMany(() => RuleEntity)
  @JoinTable()
  rules: IRule[];
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
