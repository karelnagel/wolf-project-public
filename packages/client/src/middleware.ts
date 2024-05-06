import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@wolf-project/shared/serverHelper";
import { db } from "@wolf-project/db";
import { useTranslations } from "@wolf-project/i18n";

const PUBLIC_PAGES = ["/_astro", "/_image", "/api", "/verify", "/login", "/401", "/404", '/robots.txt', '/sitemap'];

export const onRequest = defineMiddleware(async (Astro, next) => {
  console.log(Astro.url.toString());


  const token = Astro.cookies.get("x-auth-token")?.value;
  const userId = verifyToken(token);
  if (userId === null) {
    Astro.cookies.delete("x-auth-token");
  } else {
    const user = await db.query.usersTable.findFirst({ where: (x, { eq }) => eq(x.id, userId) });
    Astro.locals.user = user || null;
  }
  Astro.locals.t = useTranslations(Astro.locals.user?.language);
  Astro.locals.lang = Astro.locals.user?.language || "en";
  if (PUBLIC_PAGES.some((s) => Astro.url.pathname.startsWith(s))) return next();

  // If user isn't logged in, redirect to login
  if (!Astro.locals.user && !Astro.url.pathname.startsWith("/login")) {
    return Astro.redirect("/login");
  }

  // If user isn't adming they can't access admin pages
  if (Astro.locals.user?.role !== "admin" && Astro.url.pathname.startsWith("/admin")) {
    return Astro.redirect("/401");
  }
  return next();
});
