import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: ".env" });
if (!process.env.DATABASE_URL) {
    throw new Error("Database URL is not set in .env");
}

async function runMigration() {
    try {
        // Setup directory structure if it doesn't exist
        const drizzleDir = "./drizzle";
        const metaDir = path.join(drizzleDir, "meta");
        const journalPath = path.join(metaDir, "_journal.json");
        
        // Create directories if they don't exist
        if (!fs.existsSync(drizzleDir)) {
            console.log("Creating drizzle directory...");
            fs.mkdirSync(drizzleDir);
        }
        
        if (!fs.existsSync(metaDir)) {
            console.log("Creating meta directory...");
            fs.mkdirSync(metaDir);
        }
        
        // Create initial journal file if it doesn't exist
        if (!fs.existsSync(journalPath)) {
            console.log("Creating initial journal file...");
            const initialJournal = { 
                "version": "5",
                "dialect": "pg",
                "entries": [] 
            };
            fs.writeFileSync(journalPath, JSON.stringify(initialJournal, null, 2));
        }

        // Connect to the database and run migrations
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql);
        
        console.log("Running migrations...");
        await migrate(db, { migrationsFolder: drizzleDir });
        console.log("All migrations successfully done");
        
    } catch (error) {
        console.error("All migrations failed:", error);
        process.exit(1);
    }
}

runMigration();