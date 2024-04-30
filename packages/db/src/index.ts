import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
export { sql } from "drizzle-orm";

const connection = createClient({
  url: process.env.DATABASE_URL || "file:///tmp/wolf-project.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(connection, { schema });

export * from "./schema";
