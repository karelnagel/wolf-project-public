import { z } from "zod";
import { publicProcedure, root } from "../root";
import { Users, db, like } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";
import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";

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
  modify: publicProcedure
    .input(UserZod)
    .output(UserZod)
    .mutation(async ({ input: { userId, name, email, role, language, job } }) => {
      const result = await db
        .update(Users)
        .set({ name, email, role, language, job })
        .where(like(Users.userId, userId))
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

export const authenticate = root.router({
  login: publicProcedure.input(z.object({ email: z.string() })).query(async ({ input }) => {
    let token;
    const exists = await db
      .select({ userId: Users.userId })
      .from(Users)
      .where(like(Users.email, input.email));
      console.log(exists)
    if (exists !== null) {
      console.log(env.JWT_SECRET)
      try {
        token = jwt.sign({ userId: exists[0]?.userId }, env.JWT_SECRET, {
          expiresIn: "5m",
        });
        console.log(token)
      } catch (e) {
        console.error(e)
        return "Error logging in. Please try again";
      }
    }
    return { Token: token };
  }),
  session: publicProcedure
    .input(z.object({ token: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      return ctx
      if (input.token === null) {
        return "Token is null";
      }
      try {
        const decodedToken = jwt.verify(input.token!, env.JWT_SECRET) as { userId: string };
        const loggedInTokenContext = {

        }
        return 'Successfully logged in!'
      } catch (e) {
        return ({"Error": e});
      }
    }),
});
