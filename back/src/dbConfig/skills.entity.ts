import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employe } from './employe.entity';
import { Mission } from './mission.entity';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Mission, (mission) => mission.skills)
  @JoinTable()
  missions: Mission[];
  @ManyToMany(() => Employe)
  employes: Employe[];
}
