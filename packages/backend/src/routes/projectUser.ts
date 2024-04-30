import { z } from "zod";
import { privateProcedure, root } from "../root";
import { ProjectUser, db } from "astro:db";

const ProjectUserZod = z.object({
  projectId: z.string(),
  userId: z.string(),
  priviledgeLevel: z.string(),
});

export const projectUser = root.router({
  add: privateProcedure
    .input(ProjectUserZod)
    .output(ProjectUserZod)
    .mutation(async ({ input: { projectId, userId, priviledgeLevel } }) => {
      const projectUser = await db
        .insert(ProjectUser)
        .values({ projectId, userId, priviledgeLevel })
        .returning();
      return projectUser[0]!;
    }),
});
