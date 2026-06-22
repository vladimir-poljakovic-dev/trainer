import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // Public-facing login handle
  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  displayName: string;

  @Column()
  password: string;
}