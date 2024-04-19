import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { CreateContext } from "../../client/src/pages/api/trpc/[trpc]";

export const root = initTRPC.context<CreateContext>().create({
  transformer: SuperJSON,
});

export const router = root.router;
export const publicProcedure = root.procedure;
export const privateProcedure =root.middleware(x=>{
  if (!x.ctx.userId) throw new Error("dfgs")
  return x.next()
})
