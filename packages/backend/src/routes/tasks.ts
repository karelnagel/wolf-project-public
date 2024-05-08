import { privateProcedure, root } from "../root";
import { tasksTable, Task, projectsTable, projectUsersTable, usersTable } from "@wolf-project/db/schema";
import { db } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import z from "zod";
import { and, eq, notInArray } from "drizzle-orm";
import { sortTasks } from "@wolf-project/client/src/components/NewProject/state";
import { UpdateStageEmail } from "../lib/email";

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
  delete: privateProcedure
    .input(Task)
    .mutation(async ({ input }) => {
      await db.delete(tasksTable).where(
        eq(tasksTable.id, input.id)
      )
    }),
  update: privateProcedure
    .input(Task)
    .output(Task)
    .mutation(async ({ input }) => {
      const updatedTask = await db.update(tasksTable).set(input).where(eq(tasksTable.id, input.id)).returning();

      if (updatedTask[0]?.status === 'completed') {

        const projectInfo = await db.select().from(projectsTable).where(eq(projectsTable.id, input.projectId));
        const tasksQuery = await db.select().from(tasksTable).where(eq(tasksTable.projectId, input.projectId));
        const tasks = sortTasks(tasksQuery)
        const stageNumber = tasks.findIndex((task) => task.id === input.id)
        //Next Stage name
        const stageName = tasks[stageNumber + 1]?.title

        if (stageName !== undefined) {
          const responsible = tasks[stageNumber + 1]!.clientTask ? projectInfo[0]!.companyName : "Wolf Agency";
          const queryProjectUsers = await db.select().from(projectUsersTable).where(eq(projectUsersTable.projectId, input.projectId))
          const clients = queryProjectUsers.filter((x) => x.priviledgeLevel === 'client');
          const manager = queryProjectUsers.find((x) => x.priviledgeLevel === 'manager');
          const managerInfo = await db.select().from(usersTable).where(eq(usersTable.id, manager!.userId))
          const clientsUId = clients.map(client => client.userId);
          const clientsInfo = await db.query.usersTable.findMany({
            where: (x, { inArray }) => inArray(x.id, clientsUId)
          })
          try {
            for (const client of clientsInfo) {
              await UpdateStageEmail({
                to: [client.email!],
                companyName: projectInfo[0]!.companyName,
                locale: client.language,
                name: client.name,
                stageNumber: stageNumber.toString(),
                stageName: stageName,
                responsible: responsible,
                projectMName: managerInfo[0]!.name,
                projectId: input.projectId
              })
            }
          } catch (error) {
            console.error(error)
          }
        }
      }








      return updatedTask[0]!;
    })
});
