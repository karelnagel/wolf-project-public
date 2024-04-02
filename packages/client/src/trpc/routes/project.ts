import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Project, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const ProjectZod = z.object({
  id: z.string(),
  title: z.string(),
});
export const project = root.router({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .output(ProjectZod)
    .mutation(async ({ input: { title } }) => {
      const projects = await db.insert(Project).values({ title, id: getRandomId() }).returning();
      return projects[0]!;
    }),
});
