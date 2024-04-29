import { z } from "zod";
import { privateProcedure, root } from "../root";
import { Tasks, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

export const TaskZod = z.object({
  taskId: z.string(),
  projectRef: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  deadline: z.date().nullable(),
  status: z.string(),
  responsible: z.string(),
  completed: z.date().nullable(),
});

export const Task = TaskZod.omit({ taskId: true })
export type Task = z.infer<typeof Task>;

export const tasks = root.router({
  create: privateProcedure
    .input(TaskZod.omit({ taskId: true }))
    .output(TaskZod)
    .mutation(async ({ input: { projectRef, title, description, deadline, status, responsible, completed } }) => {
      const tasks = await db
        .insert(Tasks)
        .values({ taskId: getRandomId(), projectRef, title, description, deadline, status, responsible, completed })
        .returning();
      return tasks[0]!;
    }),
});
