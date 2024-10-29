import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IApp } from '../interfaces/app.interface';

@Entity({ name: 'apps' })
export class AppEntity implements IApp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  constructor(partial: Partial<AppEntity>) {
    Object.assign(this, partial);
  }
}
