import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ICredential } from '../interfaces/credential.interface';
import { IUser } from '../interfaces/user.interface';
import { User } from './user.entity';

@Entity({ name: 'credentials' })
export class Credential implements ICredential {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'integer', nullable: false })
  @OneToOne(() => User)
  @JoinColumn()
  userId: IUser['id'];

  @Exclude()
  @Column({ type: 'text', nullable: false })
  passwordHash: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  salt: string;

  constructor(partial: Partial<Credential>) {
    Object.assign(this, partial);
  }
}
