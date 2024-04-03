import { defineDb, defineTable, column } from "astro:db";

const Projects = defineTable({
  columns: {
    projectId: column.text({ primaryKey: true, }),
    projectName: column.text(),
  },
});

const Admins = defineTable({
  columns: {
    adminId: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    saltedPassword: column.text(),
    language: column.text({ optional: true })
  }
})

const AdminProject = defineTable({
  columns: {
    adminRef: column.number(),
    projectRef: column.number()
  },
  foreignKeys: [
    {
      columns: ["adminRef", "projectRef"],
      references: () => [Admins.columns.adminId, Projects.columns.projectId]
    }
  ]
})

const Clients = defineTable({
  columns: {
    clientId: column.number({ primaryKey: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    name: column.text(),
    email: column.text(),
    saltedKeycode: column.text(),
    language: column.text({ optional: true })
  }
})

const Tasks = defineTable({
  columns: {
    taskId: column.number({ primaryKey: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    title: column.text(),
    description: column.text(),
    startDate: column.date(),
    deadline: column.date(),
    status: column.text(),
    dependancyIds: column.json({ optional: true })
  }
})

const Comments = defineTable({
  columns: {
    commentId: column.number({ primaryKey: true }),
    taskRef: column.number({ references: () => Tasks.columns.taskId }),
    body: column.text()
  },
  indexes: {
    comment_idx: { on: ["taskRef"], unique: true }
  }
})

export default defineDb({
  tables: { Projects, Admins, AdminProject, Clients, Tasks, Comments },
});
