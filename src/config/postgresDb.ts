import { DataSource } from 'typeorm';

export const db = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root@2024',
    database: 'learnon_dev',
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true
})