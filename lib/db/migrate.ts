import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import * as dotenv from "dotenv";

dotenv.config({path:".env"});