import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@wolf-project/shared/serverHelper";


const SKIP = ["/_astro", "/_image"];

export const onRequest = defineMiddleware(async (Astro, next) => {
  if (SKIP.some((s) => Astro.url.pathname.includes(s))) return next();

  const token = Astro.cookies.get('x-auth-token')?.value
  Astro.locals.userId = verifyToken(token)

  console.log(Astro.url.toString());
  return next();
});
