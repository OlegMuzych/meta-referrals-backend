import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ILink } from '../interfaces/link';

@Entity({ name: 'links' })
export class LinkEntity implements ILink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @Column({ type: 'integer', nullable: false })
  appId: number;

  @Column({ type: 'text', nullable: false, unique: true })
  url: string;

  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
}
