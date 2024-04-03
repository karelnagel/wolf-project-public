import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Projects, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const ProjectZod = z.object({
  projectId: z.string(),
  projectName: z.string(),
});
export const projects = root.router({
  create: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .output(ProjectZod)
    .mutation(async ({ input: { projectName } }) => {
      const projects = await db.insert(Projects).values({ projectName, projectId: getRandomId() }).returning();
      return projects[0]!;
    }),
});
