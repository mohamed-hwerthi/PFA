import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminSocieteExterne } from './adminSocieteExterne.entity';

@Entity()
export class SocieteExterne {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  localisation: string;
  @OneToOne(
    () => AdminSocieteExterne,
    (adminSocieteExterne) => adminSocieteExterne.societeExterne,
  )
  adminSocieteExterne: AdminSocieteExterne;
}
