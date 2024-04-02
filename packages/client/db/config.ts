import { defineDb, defineTable, column } from "astro:db";

const Projects = defineTable({
  columns: {
    project_id: column.number({ primaryKey: true, }),
    project_name: column.text(),
    endpoint: column.text(),
    salted_keycode: column.text()
  },
});

const Admins = defineTable({
  columns: {
    admin_id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    salted_passwords: column.text(),
    language: column.text({ optional: true })
  }
})

const AdminProject = defineTable({
  columns: {
    admin_ref: column.number({ primaryKey: true }),
    project_ref: column.number({ primaryKey: true })
  },
  foreignKeys: [
    {
      columns: ["admin_ref", "project_ref"],
      references: () => [Admins.columns.admin_id, Projects.columns.project_id]
    }
  ]
})

const Clients = defineTable({
  columns: {
    client_id: column.number({ primaryKey: true }),
    project_ref: column.number({ references: () => Projects.columns.project_id }),
    name: column.text(),
    email: column.text(),
    language: column.text({ optional: true })
  }
})

const Tasks = defineTable({
  columns: {
    task_id: column.number({ primaryKey: true }),
    project_ref: column.number({ references: () => Projects.columns.project_id }),
    title: column.text(),
    description: column.text(),
    start_date: column.date(),
    deadline: column.date(),
    status: column.text(),
    dependancy_ids: column.json({ optional: true })
  }
})

const Comments = defineTable({
  columns: {
    comment_id: column.number({ primaryKey: true }),
    task_ref: column.number({ references: () => Tasks.columns.task_id }),
    body: column.text()
  },
  indexes: {
    comment_idx: { on: ["task_ref"], unique: true }
  }
})

export default defineDb({
  tables: { Projects, Admins, AdminProject, Clients, Tasks, Comments },
});
