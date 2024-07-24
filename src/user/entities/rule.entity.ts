import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRule } from '../interfaces/rule.inerface';

@Entity({ name: 'rules' })
export class RuleEntity implements IRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;
  constructor(partial: Partial<RuleEntity>) {
    Object.assign(this, partial);
  }
}
