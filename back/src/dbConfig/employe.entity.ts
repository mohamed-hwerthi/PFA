import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Mission } from "./mission.entity";
import { Skills } from "./skills.entity";
import { SocieteInterne } from "./societeInterne.entity";

@Entity()
export class Employe {
  @PrimaryGeneratedColumn()
  idEmploye: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  titre: string;
  @Column()
  salaire: number;
  @Column()
  cv: string;
  @Column()
  experience: number;
  @Column({ default: false })
  enMission: boolean;
  @ManyToOne(() => SocieteInterne, (societeInterne) => societeInterne.employes)
  societeInterne: SocieteInterne;
  @ManyToOne(() => Mission, (mission) => mission.employes)
  mission: Mission;
  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];
  @Column()
  role: string;
}
