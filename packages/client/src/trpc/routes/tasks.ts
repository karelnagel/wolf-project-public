import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Tasks, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const TaskZod = z.object({
    taskId: z.string(),
    projectRef: z.string(),
    title: z.string(),
    description: z.string(),
    deadline: z.date().nullable(),
    status: z.string()
})
export type Task = z.infer<typeof TaskZod>

export const tasks = root.router({
    create: publicProcedure
        .input(TaskZod.omit({ taskId: true }))
        .output(TaskZod)
        .mutation(async ({ input: { projectRef, title, description, deadline, status } }) => {
            const tasks = await db.insert(Tasks).values({ taskId: getRandomId(), projectRef, title, description, deadline, status }).returning();
            return tasks[0]!
        })
})