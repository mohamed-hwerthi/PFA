import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
