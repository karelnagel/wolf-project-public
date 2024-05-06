import { z } from "zod";
import { privateProcedure, root } from "../root";
import {
  projectsTable,
  usersTable,
  projectUsersTable,
  tasksTable,
  Task,
} from "@wolf-project/db/schema";
import { db } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import { Client } from "./users";

const CreateProjectInput = z.object({
  name: z.string(),
  description: z.string(),
  companyName: z.string(),
  clients: Client.array().min(1),
  tasks: Task.omit({ projectId: true }).array().min(1),
  employees: z.string().array(),
  projectManager: z.string(),
});
export type CreateProjectInput = z.infer<typeof CreateProjectInput>;
export type CreateProjectTask = CreateProjectInput["tasks"][number];

export const projects = root.router({
  create: privateProcedure
    .input(CreateProjectInput)
    .mutation(
      async ({
        input: { name, description, clients, tasks, projectManager, employees, companyName },
        ctx: { user },
      }) => {
        const pInsert = await db
          .insert(projectsTable)
          .values({ name, id: getRandomId(), creatorId: user.id, description, companyName })
          .returning({ id: projectsTable.id });
        const pId = pInsert[0]!.id;
        for (const client of clients) {
          const cInsert = await db
            .insert(usersTable)
            .values({
              id: getRandomId(),
              name: client.name,
              email: client.email,
              language: client.language,
              role: "client",
            })
            .onConflictDoUpdate({
              target: [usersTable.email],
              set: { name: client.name, language: client.language },
            })
            .returning({ id: usersTable.id });
          await db
            .insert(projectUsersTable)
            .values({ projectId: pId, userId: cInsert[0]!.id, priviledgeLevel: "client" });
        }
        await db
          .insert(projectUsersTable)
          .values({ projectId: pId, userId: projectManager, priviledgeLevel: "manager" });
        await db
          .insert(projectUsersTable)
          .values(
            employees.map((t) => ({
              projectId: pId,
              userId: t,
              priviledgeLevel: "employee" as const,
            })),
          )
          .onConflictDoNothing();
        await db.insert(tasksTable).values(
          tasks.map((t) => ({
            id: getRandomId(),
            title: t.title,
            description: t.description!,
            status: t.status,
            completed: t.completed,
            deadline: t.deadline!,
            projectId: pId,
            type: t.type,
            clientTask: t.clientTask,
          })),
        );
        return { id: pId };
      },
    ),
});
