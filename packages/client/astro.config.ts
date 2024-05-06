import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import aws from "astro-sst";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { SITE } from "@wolf-project/shared/consts";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: aws({
    serverRoutes: ["api/*"],
  }),
  site: SITE,
  integrations: [tailwind(), react(), sitemap({
    filter: (page) =>
      page === `${SITE}/login`
  })],
  vite: { plugins: [basicSsl()] },
});
