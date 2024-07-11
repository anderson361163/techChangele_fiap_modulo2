import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import {Role} from "../common/enums/role.enum";



@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 125, unique: true })
  email: string;

  @Column({ length: 250 })
  password: string; // Salted and hashed

  @Column({ enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}
