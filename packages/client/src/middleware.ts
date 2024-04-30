import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@wolf-project/shared/serverHelper";
import { Users, db, eq } from "astro:db";
import { Locale, useTranslations } from "@wolf-project/i18n";

const PUBLIC_PAGES = ["/_astro", "/_image", "/api", "/verify", "/login", "/401", "/404"];

export const onRequest = defineMiddleware(async (Astro, next) => {
  console.log(Astro.url.toString());

  const token = Astro.cookies.get("x-auth-token")?.value;
  const userId = verifyToken(token);
  if (userId === null) {
    Astro.cookies.delete("x-auth-token");
  } else {
    const user = await db.select().from(Users).where(eq(Users.userId, userId));
    Astro.locals.user = user[0] ? { ...user[0], language: user[0].language as Locale } : null;
  }
  Astro.locals.t = useTranslations(Astro.locals.user?.language);

  if (PUBLIC_PAGES.some((s) => Astro.url.pathname.startsWith(s))) return next();

  // If user isn't logged in, redirect to login
  if (!Astro.locals.user && !Astro.url.pathname.startsWith("/login")) {
    return Astro.redirect("/login");
  }

  // If user isn't adming they can't access admin pages
  if (Astro.locals.user?.role !== "admin" && Astro.url.pathname.startsWith("/admin")) {
    return Astro.redirect("/");
  }
  return next();
});
