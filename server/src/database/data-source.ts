import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["./src/database/models/**.ts"],
    migrations: ["./src/database/migrations"],
    subscribers: [],
})
