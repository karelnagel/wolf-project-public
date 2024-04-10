import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Clients, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const ClientZod = z.object({
    clientId: z.string(),
    projectRef: z.string(),
    name: z.string(),
    email: z.string(),
    saltedKeycode: z.string(),
    language: z.string().nullable()
});
export const clients = root.router({
    create: publicProcedure
        .input(ClientZod.omit({ clientId: true }))
        .output(ClientZod)
        .mutation(async ({ input: { projectRef, name, email, saltedKeycode, language } }) => {
            const clients = await db.insert(Clients).values({ clientId: getRandomId(), projectRef, name, email, saltedKeycode, language }).returning();
            return clients[0]!;
        }),
})