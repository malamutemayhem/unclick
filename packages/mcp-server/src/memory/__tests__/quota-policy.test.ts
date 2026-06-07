import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  isMemoryQuotaExemptEmail,
  effectiveMemoryTier,
  shouldEnforceManagedMemoryCaps,
} from "../quota-policy.js";

describe("isMemoryQuotaExemptEmail", () => {
  test("returns true for the default exempt email", () => {
    assert.equal(isMemoryQuotaExemptEmail("creativelead@malamutemayhem.com", ""), true);
  });

  test("is case-insensitive", () => {
    assert.equal(isMemoryQuotaExemptEmail("CreativeLead@MalamuteMayhem.com", ""), true);
  });

  test("trims whitespace", () => {
    assert.equal(isMemoryQuotaExemptEmail("  creativelead@malamutemayhem.com  ", ""), true);
  });

  test("returns true for emails in the custom allowlist", () => {
    assert.equal(isMemoryQuotaExemptEmail("vip@example.com", "vip@example.com"), true);
  });

  test("handles comma-separated allowlist", () => {
    assert.equal(isMemoryQuotaExemptEmail("b@x.com", "a@x.com,b@x.com,c@x.com"), true);
  });

  test("returns false for non-exempt emails", () => {
    assert.equal(isMemoryQuotaExemptEmail("random@example.com", ""), false);
  });

  test("returns false for null email", () => {
    assert.equal(isMemoryQuotaExemptEmail(null, ""), false);
  });

  test("returns false for undefined email", () => {
    assert.equal(isMemoryQuotaExemptEmail(undefined, ""), false);
  });

  test("returns false for empty string email", () => {
    assert.equal(isMemoryQuotaExemptEmail("", ""), false);
  });
});

describe("effectiveMemoryTier", () => {
  test("returns 'owner' for exempt emails regardless of tier", () => {
    assert.equal(effectiveMemoryTier("free", "creativelead@malamutemayhem.com"), "owner");
  });

  test("returns the provided tier when not exempt", () => {
    assert.equal(effectiveMemoryTier("pro", "user@example.com"), "pro");
  });

  test("normalizes tier to lowercase", () => {
    assert.equal(effectiveMemoryTier("PRO", "user@example.com"), "pro");
  });

  test("trims tier whitespace", () => {
    assert.equal(effectiveMemoryTier("  pro  ", "user@example.com"), "pro");
  });

  test("defaults to 'free' when tier is null", () => {
    assert.equal(effectiveMemoryTier(null, "user@example.com"), "free");
  });

  test("defaults to 'free' when tier is undefined", () => {
    assert.equal(effectiveMemoryTier(undefined, "user@example.com"), "free");
  });

  test("defaults to 'free' when tier is empty string", () => {
    assert.equal(effectiveMemoryTier("", "user@example.com"), "free");
  });
});

describe("shouldEnforceManagedMemoryCaps", () => {
  test("returns false for byod tenancy", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({ tenancyMode: "byod", tier: "free" }),
      false,
    );
  });

  test("returns true for managed free tier", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({ tenancyMode: "managed", tier: "free" }),
      true,
    );
  });

  test("returns false for managed pro tier", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({ tenancyMode: "managed", tier: "pro" }),
      false,
    );
  });

  test("returns false when quotaExempt is true", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({
        tenancyMode: "managed",
        tier: "free",
        quotaExempt: true,
      }),
      false,
    );
  });

  test("returns false for exempt email even on free tier", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({
        tenancyMode: "managed",
        tier: "free",
        accountEmail: "creativelead@malamutemayhem.com",
      }),
      false,
    );
  });

  test("defaults null tier to free (enforced)", () => {
    assert.equal(
      shouldEnforceManagedMemoryCaps({ tenancyMode: "managed", tier: null }),
      true,
    );
  });
});
