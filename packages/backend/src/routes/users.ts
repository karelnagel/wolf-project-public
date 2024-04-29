import { z } from "zod";
import { privateProcedure, publicProcedure, root } from "../root";
import { Users, db, like } from "astro:db";
import { getRandomId } from "@wolf-project/shared/helpers";
import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";
import { sendEmail } from "../lib/email";
import { Locale } from "@wolf-project/i18n";

const UserZod = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  language: z.string(),
  job: z.string().nullable(),
  company: z.string(),
});

export const Client = UserZod.omit({ userId: true, job: true, role: true });
export const Employee = UserZod.omit({ userId: true, company: true });

export type Client = z.infer<typeof Client>;
export type Employee = z.infer<typeof Employee>;

export const employee = root.router({
  create: privateProcedure
    .input(Employee)
    .output(UserZod)
    .mutation(async ({ input: { name, email, role, language, job } }) => {
      const result = await db
        .insert(Users)
        .values({ userId: getRandomId(), name, email, role, language, job, company: "Wolf-Agency OÜ" })
        .returning();
      return result[0]!;
    }),
  modify: privateProcedure
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
  create: privateProcedure
    .input(Client)
    .output(UserZod)
    .mutation(async ({ input: { name, email, language, company } }) => {
      const result = await db
        .insert(Users)
        .values({ userId: getRandomId(), name, email, role: "client", language, company })
        .returning();
      return result[0]!;
    }),
});

export const authenticate = root.router({
  login: publicProcedure.input(z.object({ email: z.string() })).query(async ({ input }) => {
    let token;
    const exists = await db
      .select({ userId: Users.userId, locale: Users.language })
      .from(Users)
      .where(like(Users.email, input.email));
    if (exists.length !== 0) {
      try {
        token = jwt.sign({ userId: exists[0]?.userId }, env.JWT_SECRET, {
          expiresIn: "5m",
        });
        console.log('exists', exists[0]?.locale)
        await sendEmail({
          to: [input.email!],
          token: token,
          locale: exists[0]!.locale as Locale
        });
      } catch (e) {
        console.error(e);
      }
    }

    return {};
  }),
  session: publicProcedure
    .input(z.object({ token: z.string().nullish() }))
    .query(async ({ input }) => {
      if (input.token === null) {
        return "Token is null";
      }
      try {
        const decodedToken = jwt.verify(input.token!, env.JWT_SECRET) as { userId: string };
        console.log(decodedToken.userId)
        const token = jwt.sign({ userId: decodedToken.userId }, env.JWT_SECRET, {
          expiresIn: "7d",
          issuer: "W-Wolf Agency OÜ"
        })
        console.log('Token:', token)
        return token;
      } catch (e) {
        return ({ "Error": e });
      }
    }),
});
