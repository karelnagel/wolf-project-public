import { defineDb, defineTable, column } from "astro:db";

const Projects = defineTable({
  columns: {
    projectId: column.text({ primaryKey: true, unique: true }),
    projectName: column.text(),
  },
});

const Users = defineTable({
  columns: {
    userId: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text(),
    role: column.text(),
    language: column.text(),
    job: column.text({ optional: true }),
  },
});

const Admins = defineTable({
  columns: {
    adminId: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text(),
    saltedPassword: column.text(),
    language: column.text({ optional: true }),
  },
  deprecated: true,
});

const AdminProject = defineTable({
  columns: {
    adminRef: column.text(),
    projectRef: column.text(),
  },
  foreignKeys: [
    {
      columns: ["adminRef", "projectRef"],
      references: () => [Admins.columns.adminId, Projects.columns.projectId],
    },
  ],
  deprecated: true,
});

const Clients = defineTable({
  columns: {
    clientId: column.text({ primaryKey: true, unique: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    name: column.text(),
    email: column.text(),
    saltedKeycode: column.text(),
    language: column.text({ optional: true }),
  },
  deprecated: true,
});

const Tasks = defineTable({
  columns: {
    taskId: column.text({ primaryKey: true, unique: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    title: column.text(),
    description: column.text(),
    deadline: column.date({ optional: true }),
    status: column.text(),
  },
});

const Comments = defineTable({
  columns: {
    commentId: column.text({ primaryKey: true, unique: true }),
    taskRef: column.text({ references: () => Tasks.columns.taskId }),
    body: column.text(),
    commenterId: column.text({ references: () => Users.columns.userId }),
    commentedAt: column.date(),
  },
});

export default defineDb({
  tables: { Projects, Users, Admins, AdminProject, Clients, Tasks, Comments },
});
