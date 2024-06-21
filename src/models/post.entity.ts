    import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
    import pkg from 'typeorm/driver/mongodb/bson.typings.js';
    const { UUID } = pkg;

    @Entity("Post", { schema: "Posts" })
    export class Post {
        @PrimaryGeneratedColumn("uuid", { name: "id" })
        id!: string;

        @Column("nvarchar", { name: 'ds_title', length: 100 })
        title!: String;

        @Column("nvarchar", { name: 'ds_content', length: 3000 })
        content!: String;

        @Column("nvarchar", { name: 'ds_author', length: 100 })
        author!: String;

        @Column({ name: 'dt_created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

        @Column({ name: 'dt_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        updatedAt: Date;

        @Column({ name: 'dt_deleted', nullable: true })
        deletedAt!: Date;

        constructor() {
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
