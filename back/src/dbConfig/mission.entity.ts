import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employe } from './employe.entity';
import { Skills } from './skills.entity';
import { SocieteInterne } from './societeInterne.entity';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column({ type: 'date' })
  dateDebut: Date;
  @Column({ type: 'date' })
  dateFin: Date;
  @Column({
    type: 'enum',
    enum: ['en attente', 'en cours', 'terminée', 'annulée'],
  })
  statutMission: string;
  @Column()
  budjet: number;
  @Column()
  commentaireMission: string;
  @Column()
  documetationMission: string;

  //chaque missions neccessite une ou plusieurs skills  :
  @ManyToMany(() => Skills, (skills) => skills.missions)
  skills: Skills[];
  //une missions peut etre affecte a un ou plusierus employes  :
  @OneToMany(() => Employe, (employe) => employe.mission)
  employes: Employe[];
  @OneToOne(() => SocieteInterne, (societeInterne) => societeInterne.missions)
  societeInterne: SocieteInterne;
}
