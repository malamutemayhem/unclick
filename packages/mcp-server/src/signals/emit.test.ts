import { afterEach, describe, expect, it, vi } from "vitest";

import { currentApiKeyHash, emitConnectorSignal } from "./emit.js";

describe("connector signal emit (L4 plumbing)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns no api key hash when none is configured", () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    expect(currentApiKeyHash()).toBeNull();
  });

  it("derives a sha256 hex hash from UNCLICK_API_KEY", () => {
    vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    vi.stubEnv("UNCLICK_API_KEY", "secret-key");
    const hash = currentApiKeyHash();
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("prefers an explicitly configured hash over the raw key", () => {
    vi.stubEnv("UNCLICK_API_KEY_HASH", "preconfigured");
    vi.stubEnv("UNCLICK_API_KEY", "secret-key");
    expect(currentApiKeyHash()).toBe("preconfigured");
  });

  it("is a safe no-op (never throws, never touches Supabase) without a key", async () => {
    vi.stubEnv("UNCLICK_API_KEY", "");
    vi.stubEnv("UNCLICK_API_KEY_HASH", "");
    await expect(
      emitConnectorSignal({ tool: "ptv_disruptions", action: "disruptions_active", summary: "x" }),
    ).resolves.toBeUndefined();
  });
});
