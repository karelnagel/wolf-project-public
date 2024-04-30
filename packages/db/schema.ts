import { text, integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { Locale } from "@wolf-project/i18n";
import z from "zod";

export const UserRole = z.enum(["admin", "limited", "client"]);
export type UserRole = z.infer<typeof UserRole>;

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: UserRole,
  language: Locale,
  job: z.string().nullable(),
});
export type User = z.infer<typeof User>;

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").$type<UserRole>().notNull(),
  language: text("language").$type<Locale>().notNull(),
  job: text("job"),
});
export const userRelations = relations(usersTable, ({ many }) => ({
  projects: many(projectUsersTable),
}));

export const PriviledgeLevel = z.enum(["employee", "manager", "client"]);
export type PriviledgeLevel = z.infer<typeof PriviledgeLevel>;

export const ProjectUser = z.object({
  projectId: z.string(),
  userId: z.string(),
  priviledgeLevel: PriviledgeLevel,
});
export type ProjectUser = z.infer<typeof ProjectUser>;

export const projectUsersTable = sqliteTable(
  "project_users",
  {
    projectId: text("project_id").notNull(),
    userId: text("user_id").notNull(),
    priviledgeLevel: text("priviledge_level").$type<PriviledgeLevel>().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.userId] }),
  }),
);
export const projectUsersRelations = relations(projectUsersTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [projectUsersTable.projectId],
    references: [projectsTable.id],
  }),
  user: one(usersTable, {
    fields: [projectUsersTable.userId],
    references: [usersTable.id],
  }),
}));

export const Projects = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  companyName: z.string(),
  creatorId: z.string(),
});
export type Projects = z.infer<typeof Projects>;

export const projectsTable = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  companyName: text("company_name").notNull(),
  creatorId: text("creator_id").notNull(),
});
export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  creator: one(usersTable, {
    fields: [projectsTable.creatorId],
    references: [usersTable.id],
  }),
  users: many(projectUsersTable),
  tasks: many(tasksTable),
}));

export const TaskStatus = z.enum(["pending", "inprogress", "completed"]);
export type TaskStatus = z.infer<typeof TaskStatus>;

export const TaskType = z.enum(["input", "feedback", "development", "design", "other"]);
export type TaskType = z.infer<typeof TaskType>;

export const Task = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
  deadline: z.date(),
  completed: z.date().nullable(),
  type: TaskType,
  status: TaskStatus,
  clientTask: z.boolean(),
  responsible: z.string(),
});
export type Task = z.infer<typeof Task>;

export const tasksTable = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  completed: integer("completed", { mode: "timestamp" }),
  type: text("type").$type<TaskType>().notNull(),
  status: text("status").$type<TaskStatus>().notNull(),
  clientTask: integer("client_task", { mode: "boolean" }).notNull(),
  responsible: text("responsible").notNull(),
});
export const tasksRelations = relations(tasksTable, ({ one, many }) => ({
  project: one(projectsTable, {
    fields: [tasksTable.projectId],
    references: [projectsTable.id],
  }),
  comments: many(commentsTable),
}));

export const Comment = z.object({
  id: z.string(),
  taskId: z.string(),
  body: z.string(),
  commenterId: z.string(),
  createdAt: z.date(),
});
export type Comment = z.infer<typeof Comment>;

export const commentsTable = sqliteTable("comments", {
  id: text("id").primaryKey(),
  taskId: text("task_id").notNull(),
  body: text("body").notNull(),
  commenterId: text("commenter_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
export const commentsRelations = relations(commentsTable, ({ one }) => ({
  task: one(tasksTable, {
    fields: [commentsTable.taskId],
    references: [tasksTable.id],
  }),
  commenter: one(usersTable, {
    fields: [commentsTable.commenterId],
    references: [usersTable.id],
  }),
}));
