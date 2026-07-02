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
  it("uses the worker's own stamped lane and the primary's tier", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", lane_hash: "account-lane", tier: "worker" },
      { key_hash: "primary-hash", lane_hash: "account-lane", tier: "pro" },
    );
    // Mint stamps the account lane onto the worker row; the billing tier comes
    // from the primary, never the "worker" placeholder.
    expect(resolved.tenancyHash).toBe("account-lane");
    expect(resolved.tenancyTier).toBe("pro");
  });

  it("borrows the primary's lane for a legacy worker row without one", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", lane_hash: null, tier: "worker" },
      { key_hash: "primary-hash", lane_hash: "account-lane", tier: "pro" },
    );
    expect(resolved.tenancyHash).toBe("account-lane");
    expect(resolved.tenancyTier).toBe("pro");
  });

  it("falls back to the primary's key hash when neither row has a lane", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", lane_hash: null, tier: "worker" },
      { key_hash: "primary-hash", lane_hash: null, tier: "starter" },
    );
    expect(resolved.tenancyHash).toBe("primary-hash");
    expect(resolved.tenancyTier).toBe("starter");
  });

  it("stays isolated on its own hash when the account has no primary key", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "worker-hash", lane_hash: null, tier: "worker" },
      null,
    );
    expect(resolved.tenancyHash).toBe("worker-hash");
    expect(resolved.tenancyTier).toBe("free");
  });

  it("resolves a non-worker key by the lane convention (lane over hash)", () => {
    const withLane = resolveWorkerTenancy(
      { key_hash_self: "uc-hash", lane_hash: "account-lane", tier: "pro" },
      null,
    );
    expect(withLane.tenancyHash).toBe("account-lane");
    expect(withLane.tenancyTier).toBe("pro");

    const withoutLane = resolveWorkerTenancy(
      { key_hash_self: "uc-hash", lane_hash: null, tier: "pro" },
      { key_hash: "other-hash", lane_hash: "other-lane", tier: "free" },
    );
    // A primary row never remaps a non-worker key.
    expect(withoutLane.tenancyHash).toBe("uc-hash");
    expect(withoutLane.tenancyTier).toBe("pro");
  });

  it("defaults a null tier to free", () => {
    const resolved = resolveWorkerTenancy(
      { key_hash_self: "uc-hash", lane_hash: null, tier: null },
      null,
    );
    expect(resolved.tenancyTier).toBe("free");
  });
});
