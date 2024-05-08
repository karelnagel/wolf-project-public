import { z } from "zod";
import { privateProcedure, root } from "../root";
import { projectUsersTable, usersTable } from "@wolf-project/db/schema";
import { db } from "@wolf-project/db";
import { Client } from "./users";
import { getRandomId } from "@wolf-project/shared/helpers";
import { eq, and } from "drizzle-orm";

export const clients = root.router({
  add: privateProcedure
    .input(z.object({ client: Client, projectId: z.string() }))
    .mutation(async ({ input }) => {
      const clients = await db
        .insert(usersTable)
        .values({ ...input.client, id: getRandomId(), role: "client" })
        .onConflictDoUpdate({ set: input.client, target: [usersTable.email, usersTable.phone] })
        .returning();
      const client = clients[0]!;
      await db
        .insert(projectUsersTable)
        .values({ projectId: input.projectId, userId: client.id, priviledgeLevel: "client" });
      return client;
    }),
  edit: privateProcedure
    .input(z.object({ client: Client, id: z.string() }))
    .mutation(async ({ input }) => {
      const clients = await db
        .update(usersTable)
        .set({ ...input.client, role: "client" })
        .where(eq(usersTable.id, input.id))
        .returning();
      const client = clients[0]!;
      return client;
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string(), projectId: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .delete(projectUsersTable)
        .where(
          and(
            eq(projectUsersTable.userId, input.id),
            eq(projectUsersTable.projectId, input.projectId),
          ),
        );
            return{id: input.id}
    }),
});
