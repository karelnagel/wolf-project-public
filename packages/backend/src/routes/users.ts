import { z } from "zod";
import { privateProcedure, publicProcedure, root } from "../root";
import { usersTable, db, User } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";
import { sendEmail } from "../lib/email";
import { like } from "drizzle-orm";

export const Client = User.omit({ id: true, job: true, role: true });
export const Employee = User.omit({ id: true });

export type Client = z.infer<typeof Client>;
export type Employee = z.infer<typeof Employee>;

export const employee = root.router({
  create: privateProcedure
    .input(Employee)
    .output(User)
    .mutation(async ({ input }) => {
      const result = await db
        .insert(usersTable)
        .values({ ...input, id: getRandomId(), company: "Wolf-Agency OÜ" })
        .returning();
      return result[0]!;
    }),
  modify: privateProcedure
    .input(User)
    .output(User)
    .mutation(async ({ input: { id, ...user } }) => {
      const result = await db
        .update(usersTable)
        .set(user)
        .where(like(usersTable.id, id))
        .returning();
      return result[0]!;
    }),
});

export const client = root.router({
  create: privateProcedure
    .input(Client)
    .output(User)
    .mutation(async ({ input: { name, email, language, company } }) => {
      const result = await db
        .insert(usersTable)
        .values({ id: getRandomId(), name, email, role: "client", language, company })
        .returning();
      return result[0]!;
    }),
});

export const authenticate = root.router({
  login: publicProcedure.input(z.object({ email: z.string() })).query(async ({ input }) => {
    let token;
    const user = await db.query.usersTable.findFirst({
      where: (x, { like }) => like(x.email, input.email),
    });
    if (!user) return {};

    try {
      token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
        expiresIn: "5m",
      });
      console.log("exists", user.language);
      await sendEmail({
        to: [input.email!],
        token: token,
        locale: user.language,
      });
    } catch (e) {
      console.error(e);
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
        console.log(decodedToken.userId);
        const token = jwt.sign({ userId: decodedToken.userId }, env.JWT_SECRET, {
          expiresIn: "7d",
          issuer: "W-Wolf Agency OÜ",
        });
        console.log("Token:", token);
        return token;
      } catch (e) {
        return { Error: e };
      }
    }),
});
