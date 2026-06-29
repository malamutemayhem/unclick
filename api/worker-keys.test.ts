import { describe, expect, it } from "vitest";
import * as crypto from "crypto";
import { newWorkerKey } from "./worker-keys";
import { resolveWorkerTenancy } from "./mcp";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

describe("newWorkerKey", () => {
  it("mints an agt_ key and stores only its hash", () => {
    const { rawKey, keyHash, keyPrefix } = newWorkerKey();
    expect(rawKey.startsWith("agt_")).toBe(true);
    // agt_ (4 chars) + 32 random bytes as hex (64 chars) = 68 chars.
    expect(rawKey).toHaveLength(68);
    // The stored hash is the SHA-256 of the raw key, never the key itself.
    expect(keyHash).toBe(sha256hex(rawKey));
    expect(keyHash).not.toContain(rawKey);
    // The display prefix is the first 12 chars (agt_ + 8 hex), safe to show.
    expect(keyPrefix).toBe(rawKey.slice(0, 12));
    expect(keyPrefix.startsWith("agt_")).toBe(true);
  });

  it("produces a unique key on every call", () => {
    const a = newWorkerKey();
    const b = newWorkerKey();
    expect(a.rawKey).not.toBe(b.rawKey);
    expect(a.keyHash).not.toBe(b.keyHash);
  });
});

describe("resolveWorkerTenancy", () => {
  it("borrows the account's primary key hash for a worker key", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", tier: "worker" },
      { key_hash: "primary-hash", tier: "pro" },
    );
    // The worker shares the primary's memory + connections, and inherits its
    // tier, not the literal "worker" placeholder.
    expect(resolved.tenancyHash).toBe("primary-hash");
    expect(resolved.tenancyTier).toBe("pro");
  });

  it("stays isolated on its own hash when the account has no primary key", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", tier: "worker" },
      null,
    );
    expect(resolved.tenancyHash).toBe("worker-hash");
  });

  it("never remaps a non-worker (primary) key, even if a primary row is passed", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "uc-hash", tier: "pro" },
      { key_hash: "other-hash", tier: "free" },
    );
    expect(resolved.tenancyHash).toBe("uc-hash");
    expect(resolved.tenancyTier).toBe("pro");
  });

  it("defaults a null tier to free", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "uc-hash", tier: null },
      null,
    );
    expect(resolved.tenancyTier).toBe("free");
  });
});
