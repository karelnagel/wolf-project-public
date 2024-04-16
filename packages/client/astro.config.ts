import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import aws from "astro-sst";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { SITE } from "@wolf-project/shared/consts";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: aws({
    serverRoutes: ["api/*"],
  }),
  site: SITE,
  integrations: [tailwind(), react(), db()],
  vite: { plugins: [basicSsl()] },
});
