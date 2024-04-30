import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { CreateContext } from "../../client/src/pages/api/trpc/[trpc]";

export const root = initTRPC.context<CreateContext>().create({
  transformer: SuperJSON,
});

export const router = root.router;
export const publicProcedure = root.procedure;

const privateMiddleware = root.middleware((x) => {
  if (!x.ctx.user) throw new Error("Not logged in!");
  return x.next({ ctx: { user: x.ctx.user } });
});

export const privateProcedure = root.procedure.use(privateMiddleware);

const adminMiddleware = root.middleware((x) => {
  if (!x.ctx.user) throw new Error("Not logged in!");
  if (x.ctx.user.role !== "admin") throw new Error("Not admin!");
  return x.next({ ctx: { user: x.ctx.user } });
});
export const adminProcedure = root.procedure.use(adminMiddleware);
