import * as dotenv from 'dotenv'; // Import dotenv to load environment variables from .env file
import { defineConfig } from 'drizzle-kit'; // Import defineConfig to configure Drizzle

dotenv.config({ path: ".env" }); // Load environment variables from .env file
if (!process.env.DATABASE_URL) {
    // Throw an error if DATABASE_URL is not set in the .env file
    throw new Error("Database URL is not set in .env");
}

export default defineConfig({
    schema: './lib/db/schema.ts', // Path to the database schema file
    out: './drizzle', // Directory where generated files will be stored
    dialect: 'postgresql', // Database dialect being used (PostgreSQL in this case)
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Database connection URL from environment variables
    },
    migrations: {
        table: "`__drizzle_migrations", // Table name to track migrations
        schema: "public" // Schema where the migrations table will be created
    },
    verbose: true, // Enable verbose logging for debugging
    strict: true // Enable strict mode for additional checks
});
