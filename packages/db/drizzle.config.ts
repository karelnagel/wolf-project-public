import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:///tmp/wolf-project.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;