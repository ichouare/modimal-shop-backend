import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string(),
  URL_DB: z.string(),
  JWT_SECRET: z.string(),
});

