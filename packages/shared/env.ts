import { z } from "zod";

const Env = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  JWT_SECRET: z.string(),
  PUBLIC_API_URL: z.string(),
  AWS_REGION: z.string(),
});

export const env = Env.parse(process.env);
