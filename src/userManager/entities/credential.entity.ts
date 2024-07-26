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
import { UserEntity } from './user.entity';

@Entity({ name: 'credentials' })
export class CredentialEntity implements Omit<ICredential, 'password'> {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'integer', nullable: false })
  @OneToOne(() => UserEntity, (user) => user.credential)
  @JoinColumn()
  userId: IUser['id'];

  @Exclude()
  @Column({ type: 'text', nullable: false })
  passwordHash: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  salt: string;

  constructor(partial: Partial<CredentialEntity>) {
    Object.assign(this, partial);
  }
}
