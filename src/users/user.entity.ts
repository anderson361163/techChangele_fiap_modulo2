import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Role} from "../common/enums/role.enum";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";



@Entity()
export class User {
  @ApiProperty({
    example: '02a66708-bd91-44f8-8e8c-9f9309a52210',
    description: 'The id of the user'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user'
  })
  @Column({ length: 125 })
  name: string;

  @ApiProperty({
    example: 'john@do.e',
    description: 'The email of the user'
  })
  @Column({ length: 125, unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 250 })
  password: string; // Salted and hashed

  @ApiProperty({
    description: 'The role of the user',
    enum: Role
  })
  @Column({ enum: Role, default: Role.USER })
  role: Role;

  @ApiProperty({
    example: new Date(),
    description: 'The date the user was created'
  })
  @CreateDateColumn()
  created: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the user was last updated'
  })
  @UpdateDateColumn()
  updated: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the user was deleted',
    nullable: true
  })
  @DeleteDateColumn()
  deleted: Date | null;
}
