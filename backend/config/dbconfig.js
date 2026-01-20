import { Sequelize } from "sequelize";

const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
}

export const sequelize = new Sequelize(
    `${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
);