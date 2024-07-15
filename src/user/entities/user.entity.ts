import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

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
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
