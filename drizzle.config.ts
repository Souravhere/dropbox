import * as dotenv from 'dotenv'; 
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: ".env" }); 
if (!process.env.DATABASE_URL) {
    throw new Error("Database URL is not set in .env");
}

export default defineConfig({
    schema: './lib/db/schema.ts', // Path to the database schema file
    out: './drizzle', // Directory where generated files will be stored
    dialect: 'postgresql', // Database dialect being used (PostgreSQL in this case)
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: "`__drizzle_migrations", // Table name to track migrations
        schema: "public" // Schema where the migrations table will be created
    },
    verbose: true, // Enable verbose logging for debugging
    strict: true // Enable strict mode for additional checks
});
