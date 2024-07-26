import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

import { RuleEntity } from './rule.entity';
import { IRule } from '../interfaces/rule.inerface';
import { IRole } from '../interfaces/role.interface';
import { RoleEntity } from './role.entity';
import { ICredential } from '../interfaces/credential.interface';
import { CredentialEntity } from './credential.entity';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
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

  @Exclude({ toPlainOnly: true })
  @OneToOne(() => CredentialEntity, (credential) => credential.userId)
  credential: ICredential;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
