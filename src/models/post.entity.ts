import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("Post", { schema: "Posts" })
export class Post {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string;

    @Column("nvarchar", { name: 'ds_title', length: 100 })
    title!: string;

    @Column("nvarchar", { name: 'ds_content', length: 3000 })
    content!: string;

    @Column("nvarchar", { name: 'ds_author', length: 100 })
    author!: string;

    @CreateDateColumn({ name: 'dt_created' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'dt_updated' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'dt_deleted' })
    deletedAt: Date | null;
}
