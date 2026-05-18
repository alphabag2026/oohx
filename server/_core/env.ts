import { z } from "zod";

const stringEnv = z.string().optional().default("");

const envSchema = z
  .object({
    NODE_ENV: z.string().optional().default("development"),
    PORT: z.coerce.number().int().positive().max(65535).optional().default(3000),
    VITE_APP_ID: stringEnv,
    JWT_SECRET: stringEnv,
    DATABASE_URL: stringEnv,
    OAUTH_SERVER_URL: stringEnv,
    OWNER_OPEN_ID: stringEnv,
    BUILT_IN_FORGE_API_URL: stringEnv,
    BUILT_IN_FORGE_API_KEY: stringEnv,
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV !== "production") return;

    const requiredProductionVars = [
      "VITE_APP_ID",
      "JWT_SECRET",
      "DATABASE_URL",
      "OAUTH_SERVER_URL",
    ] as const;

    for (const key of requiredProductionVars) {
      if (env[key].trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: `${key} is required in production`,
        });
      }
    }
  });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const missingVars = parsedEnv.error.issues
    .map(issue => issue.path.join("."))
    .filter(Boolean);
  const details = parsedEnv.error.issues.map(issue => issue.message).join("; ");

  throw new Error(
    `Invalid server environment${missingVars.length ? ` (${missingVars.join(", ")})` : ""}: ${details}`
  );
}

const env = parsedEnv.data;

export const ENV = {
  appId: env.VITE_APP_ID,
  cookieSecret: env.JWT_SECRET,
  databaseUrl: env.DATABASE_URL,
  oAuthServerUrl: env.OAUTH_SERVER_URL,
  ownerOpenId: env.OWNER_OPEN_ID,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
  port: env.PORT,
  forgeApiUrl: env.BUILT_IN_FORGE_API_URL,
  forgeApiKey: env.BUILT_IN_FORGE_API_KEY,
};
