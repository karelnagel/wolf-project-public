import { z } from "zod";
import { privateProcedure, root } from "../root";
import { Projects, Users, ProjectUser, Tasks, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";
import { Client } from "./users";
import { Task } from "./tasks";

const CreateProjectZod = z.object({
  projectName: z.string(),
  projectCreator: z.string(),
  projectDescription: z.string(),
  clients: Client.array(),
  tasks: Task.omit({ projectRef: true }).array(),
  selectedEmployees: z.string().array(),
  projectManager: z.string(),
});

export const projects = root.router({
  create: privateProcedure
    .input(CreateProjectZod)
    .mutation(
      async ({
        input: {
          projectName,
          projectCreator,
          projectDescription,
          clients,
          tasks,
          projectManager,
          selectedEmployees,
        },
      }) => {
        const pInsert = await db
          .insert(Projects)
          .values({ projectName, projectId: getRandomId(), projectCreator, projectDescription })
          .returning({ projectId: Projects.projectId });
        const pId = pInsert[0]!.projectId;
        for (const client of clients) {
          const cInsert = await db
            .insert(Users)
            .values({
              userId: getRandomId(),
              name: client.name,
              email: client.email,
              language: client.language,
              company: client.company,
              role: "client",
            })
            .onConflictDoUpdate({
              target: [Users.email],
              set: { name: client.name, company: client.company, language: client.language },
            })
            .returning({ userId: Users.userId });
          await db
            .insert(ProjectUser)
            .values({ projectId: pId, userId: cInsert[0]!.userId, priviledgeLevel: "client" });
        }
        await db
          .insert(ProjectUser)
          .values({ projectId: pId, userId: projectManager, priviledgeLevel: "manager" });
        await db
          .insert(ProjectUser)
          .values(
            selectedEmployees.map((t) => ({
              projectId: pId,
              userId: t,
              priviledgeLevel: "employee",
            })),
          )
          .onConflictDoNothing();
        await db
          .insert(Tasks)
          .values(
            tasks.map((t) => ({
              title: t.title,
              description: t.description,
              responsible: t.responsible,
              status: t.status,
              completed: t.completed,
              deadline: t.deadline,
              taskId: getRandomId(),
              projectRef: pId,
            })),
          );
      },
    ),
});
