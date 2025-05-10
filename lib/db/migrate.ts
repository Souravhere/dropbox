import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";

dotenv.config({path: ".env"});
if(!process.env.DATABASE_URL){
    throw new Error("Data base url is not set in .env")
}

async function runMigration() {
    try {
        const sql = neon(process.env.DATABASE_URL!)
        const db = drizzle(sql)

        await migrate(db, {migrationsFolder: "./drizzle"});
        console.log("All Migtations successfully done");
        
    } catch (error) {
        console.log("All Migtations failed");
        process.exit(1)
    }
}

runMigration()