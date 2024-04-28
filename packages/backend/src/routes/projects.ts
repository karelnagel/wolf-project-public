import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Projects, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const ProjectZod = z.object({
  projectId: z.string(),
  projectName: z.string(),
  projectCreator: z.string(),
  projectDescription: z.string(),
});
export const projects = root.router({
  create: publicProcedure
    .input(ProjectZod.omit({ projectId: true }))
    .output(ProjectZod)
    .mutation(async ({ input: { projectName, projectCreator, projectDescription } }) => {
      const projects = await db
        .insert(Projects)
        .values({ projectName, projectId: getRandomId(), projectCreator, projectDescription })
        .returning();
      return projects[0]!;
    }),
});
