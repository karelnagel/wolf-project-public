/// <reference path="./.sst/platform/config.d.ts" />
import { DOMAIN } from "./packages/shared/consts";

const copyFiles = [{ from: "node_modules/@libsql", to: "node_modules/@libsql" }];

export default $config({
  app: () => ({
    name: "wolf-project",
    home: "aws",
    removal: "remove",
    providers: { aws: { region: "eu-central-1" } },
  }),
  run: async () => {
    const isMain = $app.stage === "main";
    const environment = {
      ADMIN_AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
      ADMIN_AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
      JWT_SECRET: process.env.JWT_SECRET!,
      PUBLIC_API_URL: process.env.PUBLIC_API_URL || "https://project.wolfagency.ee",
      EMAIL: process.env.EMAIL!,
      DATABASE_URL: process.env.DATABASE_URL!,
      DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN!,
    };

    new sst.aws.Astro("Client", {
      path: "packages/client",
      environment,
      transform: { server: { copyFiles } as any },
      domain: isMain ? DOMAIN : undefined,
    });
  },
});
