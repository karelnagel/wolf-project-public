import { defineDb, defineTable, column } from "astro:db";

const Projects = defineTable({
  columns: {
    projectId: column.text({ primaryKey: true, unique: true }),
    projectName: column.text(),
  },
});

const Admins = defineTable({
  columns: {
    adminId: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text(),
    saltedPassword: column.text(),
    language: column.text({ optional: true })
  }
})

const AdminProject = defineTable({
  columns: {
    adminRef: column.text(),
    projectRef: column.text()
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
    clientId: column.text({ primaryKey: true, unique: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    name: column.text(),
    email: column.text(),
    saltedKeycode: column.text(),
    language: column.text({ optional: true })
  }
})

const Tasks = defineTable({
  columns: {
    taskId: column.text({ primaryKey: true, unique: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    title: column.text(),
    description: column.text(),
    deadline: column.date({ optional: true }),
    status: column.text()
  }
})

const Comments = defineTable({
  columns: {
    commentId: column.text({ primaryKey: true, unique: true }),
    taskRef: column.text({ references: () => Tasks.columns.taskId }),
    body: column.text()
  }
})

export default defineDb({
  tables: { Projects, Admins, AdminProject, Clients, Tasks, Comments },
});
