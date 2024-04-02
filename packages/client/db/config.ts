import { defineDb, defineTable, column } from "astro:db";

const Project = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
  },
});

export default defineDb({
  tables: { Project },
});
