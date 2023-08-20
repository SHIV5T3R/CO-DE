import { z } from "zod";

const configSchema = z.object({
  VITE_BASE_URL: z.string(),
});

const config = configSchema.parse(import.meta.env);

Object.freeze(config);
export default config!;
