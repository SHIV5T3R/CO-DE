import dotenv from "dotenv";
import { z } from "zod";

const environment = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${environment}` });

const configSchema = z.object({
  BASE_URL: z.string(),
});

let config = null;
try {
  config = configSchema.parse(process.env);
} catch (error) {
  console.error("Invalid environment variables:", error);
  process.exit(1);
}

Object.freeze(config);
export default config!;
