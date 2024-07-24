import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';
import { ICredential } from '../interfaces/credential.interface';
import { Credential } from './credential.entity';
import { RuleEntity } from './rule.entity';
import { IRule } from '../interfaces/rule.inerface';
import { IRole } from '../interfaces/role.interface';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true, unique: true })
  email: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: true,
  })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Exclude()
  @Column({ type: 'date', nullable: true })
  deleteDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  login: string;

  @ManyToMany(() => RuleEntity)
  @JoinTable()
  rules: IRule[];

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: IRole[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
