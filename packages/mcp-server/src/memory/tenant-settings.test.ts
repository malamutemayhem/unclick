import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { isBackstagePassVaultEnabled, resetTenantSettingsCache } from "./tenant-settings.js";

// Env keys that influence the BackstagePass vault toggle resolution. We save
// and restore them around each test so the suite is hermetic.
const ENV_KEYS = [
  "BACKSTAGEPASS_VAULT_ENABLED",
  "UNCLICK_API_KEY",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

describe("isBackstagePassVaultEnabled", () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const k of ENV_KEYS) {
      saved[k] = process.env[k];
      delete process.env[k];
    }
    resetTenantSettingsCache();
  });

  afterEach(() => {
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
    resetTenantSettingsCache();
  });

  it("defaults ON when nothing is configured", async () => {
    expect(await isBackstagePassVaultEnabled()).toBe(true);
  });

  it("honors the env override OFF", async () => {
    for (const v of ["0", "false", "off", "OFF", "False"]) {
      process.env.BACKSTAGEPASS_VAULT_ENABLED = v;
      resetTenantSettingsCache();
      expect(await isBackstagePassVaultEnabled(), v).toBe(false);
    }
  });

  it("honors the env override ON", async () => {
    for (const v of ["1", "true", "on", "ON"]) {
      process.env.BACKSTAGEPASS_VAULT_ENABLED = v;
      resetTenantSettingsCache();
      expect(await isBackstagePassVaultEnabled(), v).toBe(true);
    }
  });

  it("falls back to default ON for an unrecognized env value with no DB configured", async () => {
    process.env.BACKSTAGEPASS_VAULT_ENABLED = "maybe";
    expect(await isBackstagePassVaultEnabled()).toBe(true);
  });
});
