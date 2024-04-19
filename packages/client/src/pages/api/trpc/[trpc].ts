import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { appRouter } from "@wolf-project/backend";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { env } from "@wolf-project/shared/env";
import jwt from "jsonwebtoken";

export const createContext = (_opts: FetchCreateContextFnOptions) => {
  //todo get user id from cookie
  const headers = _opts.req.headers
  console.log(headers)
  //const res = jwt.verify(input.token!, env.JWT_SECRET) as { userId: string };
  return {userId:"sdfsdf"};
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
