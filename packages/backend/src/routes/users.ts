import { z } from "zod";
import { privateProcedure, publicProcedure, root } from "../root";
import { usersTable, User } from "@wolf-project/db/schema";
import { db } from "@wolf-project/db";
import { getRandomId } from "@wolf-project/shared/helpers";
import jwt from "jsonwebtoken";
import { env } from "@wolf-project/shared/env";
import { sendEmail } from "../lib/email";
import { like, eq, and } from "drizzle-orm";


export const Client = User.omit({ id: true, role: true });
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
        .values({ ...input, id: getRandomId() })
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
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(usersTable).where(eq(usersTable.id, input.id))
    }),
  get: privateProcedure
    .input(Employee)
    .output(User)
    .mutation(async ({ input }) => {
      const result = await db.select()
        .from(usersTable)
        .where(and(eq(usersTable.name, input.name), eq(usersTable.language, input.language), eq(usersTable.email, input.email), eq(usersTable.role, input.role)));
      return result[0]!;
    })
});

export const client = root.router({
  create: privateProcedure
    .input(Client)
    .output(User)
    .mutation(async ({ input: { name, email, language } }) => {
      const result = await db
        .insert(usersTable)
        .values({ id: getRandomId(), name, email, role: "client", language })
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
    // if (!user) return {};
    if (!user)
      throw new Error("User not found! We can remove this in production, but good for development");

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
});

