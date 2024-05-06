import { privateProcedure, root } from "../root";
import { tasksTable, Task } from "@wolf-project/db/schema";
import { db } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import z from "zod";
import { and, eq, notInArray } from "drizzle-orm";

export const tasks = root.router({
  create: privateProcedure
    .input(Task.omit({ id: true }))
    .output(Task)
    .mutation(async ({ input }) => {
      const tasks = await db
        .insert(tasksTable)
        .values({ ...input, id: getRandomId() })
        .returning();
      return tasks[0]!;
    }),
  save: privateProcedure
    .input(z.object({ projectId: z.string(), tasks: Task.array() }))
    .mutation(async ({ input }) => {
      for (const task of input.tasks) {
        await db
          .insert(tasksTable)
          .values(task)
          .onConflictDoUpdate({ target: [tasksTable.id], set: task });
      }
      await db.delete(tasksTable).where(
        and(
          eq(tasksTable.projectId, input.projectId),
          notInArray(
            tasksTable.id,
            input.tasks.map((task) => task.id),
          ),
        ),
      );
    }),
});
