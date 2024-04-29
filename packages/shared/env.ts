import { z } from "zod";

const Env = z.object({
  JWT_SECRET: z.string(),
  PUBLIC_API_URL: z.string(),
});

export const env = Env.parse(process.env);
