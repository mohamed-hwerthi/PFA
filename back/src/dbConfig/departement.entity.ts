import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SocieteInterne } from './societeInterne.entity';

@Entity()
export class Departement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => SocieteInterne, societeInterne => societeInterne.departements)
  societeInterne: SocieteInterne;

}
