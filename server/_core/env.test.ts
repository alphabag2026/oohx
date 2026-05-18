import { afterEach, describe, expect, it, vi } from "vitest";

async function importEnv() {
  vi.resetModules();
  return import("./env");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("server env", () => {
  it("uses safe defaults for local development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("PORT", "4321");

    const { ENV } = await importEnv();

    expect(ENV).toMatchObject({
      appId: "",
      cookieSecret: "",
      databaseUrl: "",
      isDevelopment: true,
      isProduction: false,
      port: 4321,
    });
  });

  it("fails fast when production required variables are missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VITE_APP_ID", "");
    vi.stubEnv("JWT_SECRET", "");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("OAUTH_SERVER_URL", "");

    await expect(importEnv()).rejects.toThrow(
      /Invalid server environment.*VITE_APP_ID.*JWT_SECRET.*DATABASE_URL.*OAUTH_SERVER_URL/
    );
  });
});
