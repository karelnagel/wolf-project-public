import { privateProcedure, root } from "../root";
import { tasksTable, db, Task } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";

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
});
