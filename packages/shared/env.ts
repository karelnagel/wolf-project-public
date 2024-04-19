import { z } from "zod";

const Env = z.object({
  JWT_SECRET: z.string(),
});

export const env = Env.parse(process.env);
