import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { appRouter } from "@wolf-project/backend";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { verifyToken } from "@wolf-project/shared/serverHelper";
import { db } from "@wolf-project/db";

export const createContext = async (_opts: FetchCreateContextFnOptions) => {
  const token = _opts.req.headers
    .get("Cookie")
    ?.split(";")
    .find((x) => x.includes("x-auth-token="))
    ?.split("=")[1]
    ?.trim();

  const userId = verifyToken(token);
  if (!userId) return { user: null };

  const user = await db.query.usersTable.findFirst({
    where: (x, { eq }) => eq(x.id, userId),
  });
  return { user };
};
export type CreateContext = typeof createContext;

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};
