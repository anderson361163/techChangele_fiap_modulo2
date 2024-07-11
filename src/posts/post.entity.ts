import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {Exclude} from "class-transformer";

@Entity()
export class Post {
  @ApiProperty({
    example: '02a66708-bd91-44f8-8e8c-9f9309a52210',
    description: 'The id of the post'
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: 'My first post',
    description: 'The title of the post'
  })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({
    example: 'This is my first post',
    description: 'The content of the post'
  })
  @Column({ length: 10000 })
  content: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The author of the post'
  })
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  author: Pick<User, 'id' | 'name'>;

  @ApiHideProperty()
  @Exclude()
  @Column({ select: false })
  authorId: string;

  @ApiProperty({
    example: new Date(),
    description: 'The date the post was published',
    nullable: true
  })
  @Column({ nullable: true })
  publishedAt: Date | null;

  @ApiProperty({
    example: new Date(),
    description: 'The date the post was created'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the post was last updated'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the post was deleted',
    nullable: true,
  })
  @DeleteDateColumn()
  deletedAt: Date | null;

  public get isPublished(): boolean {
    return this.publishedAt !== null;
  }
}
