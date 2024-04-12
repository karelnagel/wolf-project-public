import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Users, db } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";

const UserZod = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  language: z.string(),
  job: z.string().nullable(),
});

const Client = UserZod.omit({ userId: true, job: true });
const Employee = UserZod.omit({ userId: true });

export type Client = z.infer<typeof Client>;
export type Employee = z.infer<typeof Employee>;

export const employee = root.router({
  create: publicProcedure
    .input(Employee)
    .output(UserZod)
    .mutation(async ({ input: { name, email, role, language, job } }) => {
      const result = await db
        .insert(Users)
        .values({ userId: getRandomId(), name, email, role, language, job })
        .returning();
      return result[0]!;
    }),
});

export const client = root.router({
  create: publicProcedure
    .input(Client)
    .output(UserZod)
    .mutation(async ({ input: { name, email, role, language } }) => {
      const result = await db
        .insert(Users)
        .values({ userId: getRandomId(), name, email, role, language })
        .returning();
      return result[0]!;
    }),
});
