import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocieteExterne } from './societeExterne.entity';

@Entity()
export class AdminSocieteExterne {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToOne(() => SocieteExterne, { cascade: true })
  @JoinColumn()
  societeExterne: SocieteExterne;
}
