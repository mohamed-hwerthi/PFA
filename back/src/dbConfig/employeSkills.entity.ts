import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employe } from './employe.entity';
import { Skills } from './skills.entity';
@Entity()
export class EmployeeSkills {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  experience: number;
  @ManyToOne(() => Employe, (employee) => employee.skills)
  @JoinColumn({ name: 'idEmploye' })
  employee: Employe;
  @ManyToOne(() => Skills, (skill) => skill.employes)
  @JoinColumn({ name: 'idSkill' })
  skill: Skills;
}
