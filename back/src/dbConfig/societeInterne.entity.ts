import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminSocieteInterne } from './adminSocieteInterne.entity';
import { Departement } from './departement.entity';
import { Employe } from './employe.entity';
import { Mission } from './mission.entity';

@Entity()
export class SocieteInterne {
  @PrimaryGeneratedColumn()
  idSocieteInterne: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  localisation: string;

  @OneToOne(
    () => AdminSocieteInterne,
    (adminSocieteInterne) => adminSocieteInterne.societeInterne,
  )
  adminSocieteInterne: AdminSocieteInterne;
  @OneToMany(() => Departement, (departement) => departement.societeInterne)
  departements: Departement[];
  @OneToMany(() => Employe, (employe) => employe.societeInterne)
  employes: Employe[];
  @OneToMany(() => Mission, (mission) => mission.societeInterne)
  missions: Mission[];
}
