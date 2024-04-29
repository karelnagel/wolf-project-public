import { defineDb, defineTable, column } from "astro:db";

const Projects = defineTable({
  columns: {
    projectId: column.text({ primaryKey: true, unique: true }),
    projectName: column.text(),
    projectDescription: column.text(),
    projectCreator: column.text({ references: () => Users.columns.userId })
  },
});

const ProjectUser = defineTable({
  columns: {
    projectId: column.text({ references: () => Projects.columns.projectId }),
    userId: column.text({ references: () => Users.columns.userId }),
    priviledgeLevel: column.text(),
  }
})

const Users = defineTable({
  columns: {
    userId: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text(),
    role: column.text(),
    language: column.text(),
    job: column.text({ optional: true }),
    company: column.text(),
  },
});

const Tasks = defineTable({
  columns: {
    taskId: column.text({ primaryKey: true, unique: true }),
    projectRef: column.text({ references: () => Projects.columns.projectId }),
    title: column.text(),
    description: column.text(),
    deadline: column.date({ optional: true }),
    completed: column.date({ optional: true }),
    status: column.text(),
    responsible: column.text({ references: () => Users.columns.userId })
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
  tables: { Projects, Users, Tasks, Comments, ProjectUser },
});
