import "reflect-metadata"
import { DataSource } from "typeorm"
import { Card } from "./models/Card";
import { Status } from "./models/Status";
import { User } from "./models/User";

const modelsDir = process.env.API_START_ARG === 'dev' ? './src/database/models/**/*.ts' : 'dist/database/models/**/*.js';
const migrationsDir = process.env.API_START_ARG === 'dev' ? './src/database/migrations/**/*.ts' : 'dist/database/migrations/**/*.js';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Card, Status, User],
    migrations: [migrationsDir],
    subscribers: [],
})