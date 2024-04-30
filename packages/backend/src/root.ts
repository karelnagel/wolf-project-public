import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { CreateContext } from "../../client/src/pages/api/trpc/[trpc]";

export const root = initTRPC.context<CreateContext>().create({
  transformer: SuperJSON,
});

export const router = root.router;
export const publicProcedure = root.procedure;

const privateMiddleware = root.middleware((x) => {
  if (!x.ctx.userId) throw new Error("No userId found");
  return x.next({ ctx: { userId: x.ctx.userId } });
});

export const privateProcedure = root.procedure.use(privateMiddleware);
