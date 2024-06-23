import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

/*
export const db = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'learnon_dev',
    entities: ["src/models/*.js"],
    logging: true,
    synchronize: true
})
*/

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Log das variáveis de ambiente usadas para a conexão
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_PORT:', process.env.DB_PORT || '5432');
console.log('DB_USER:', process.env.DB_USER || 'root');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD || 'root');
console.log('DB_NAME:', process.env.DB_NAME || 'learnon_dev');


export const db = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'database',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'learnon_dev',
    entities: ["src/models/*.js"],
    logging: true,
    synchronize: true
});
