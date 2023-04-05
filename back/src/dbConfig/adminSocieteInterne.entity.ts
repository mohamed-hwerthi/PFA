import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocieteInterne } from './societeInterne.entity';

@Entity()
export class AdminSocieteInterne {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToOne(() => SocieteInterne, { cascade: true })
  @JoinColumn()
  societeInterne: SocieteInterne;
}
