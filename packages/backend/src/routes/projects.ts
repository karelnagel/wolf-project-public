import { z } from "zod";
import { privateProcedure, root } from "../root";
import {
  projectsTable,
  usersTable,
  projectUsersTable,
  tasksTable,
  db,
  Task,
} from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import { Client } from "./users";

const CreateProjectZod = z.object({
  name: z.string(),
  description: z.string(),
  clients: Client.array(),
  tasks: Task.omit({ projectId: true, id: true }).array(),
  selectedEmployees: z.string().array(),
  projectManager: z.string(),
});

export const projects = root.router({
  create: privateProcedure
    .input(CreateProjectZod)
    .mutation(
      async ({
        input: { name, description, clients, tasks, projectManager, selectedEmployees },
        ctx: { user },
      }) => {
        const pInsert = await db
          .insert(projectsTable)
          .values({ name, id: getRandomId(), creatorId: user.id, description })
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
              company: client.company,
              role: "client",
            })
            .onConflictDoUpdate({
              target: [usersTable.email],
              set: { name: client.name, company: client.company, language: client.language },
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
            selectedEmployees.map((t) => ({
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
            responsible: t.responsible,
            status: t.status,
            completed: t.completed,
            deadline: t.deadline!,
            projectId: pId,
            type: t.type,
          })),
        );
      },
    ),
});
