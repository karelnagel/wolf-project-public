import { z } from "zod";
import { privateProcedure, root } from "../root";
import { projectUsersTable, db, PriviledgeLevel } from "@wolf-project/db";

const ProjectUserZod = z.object({
  projectId: z.string(),
  userId: z.string(),
  priviledgeLevel: PriviledgeLevel,
});

export const projectUser = root.router({
  add: privateProcedure
    .input(ProjectUserZod)
    .output(ProjectUserZod)
    .mutation(async ({ input: { projectId, userId, priviledgeLevel } }) => {
      const projectUser = await db
        .insert(projectUsersTable)
        .values({ projectId, userId, priviledgeLevel })
        .returning();
      return projectUser[0]!;
    }),
});
