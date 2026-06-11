import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  copySecretWithExpiry,
  credentialHealth,
  expiredReveals,
  exportPasswordStrength,
  maskValue,
  daysSince,
  daysUntil,
  ROTATION_WARNING_DAYS,
  STALE_TEST_DAYS,
} from "./keychainHelpers";

const NOW = new Date("2026-06-11T12:00:00Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

function daysAgo(days: number): string {
  return new Date(NOW.getTime() - days * 86_400_000).toISOString();
}

function daysAhead(days: number): string {
  return new Date(NOW.getTime() + days * 86_400_000).toISOString();
}

const baseCred = {
  is_valid: true,
  last_tested_at: daysAgo(1),
  last_rotated_at: daysAgo(10),
  expires_at: null as string | null,
};

describe("maskValue", () => {
  it("fully masks short values without leaking length below four", () => {
    expect(maskValue("ab")).toBe("••••");
    expect(maskValue("abcdefgh")).toBe("••••••••");
  });

  it("keeps only the first and last four characters of long values", () => {
    expect(maskValue("sk-ant-1234567890")).toBe("sk-a••••••••7890");
  });
});

describe("credentialHealth priority", () => {
  it("lets an explicit backend health_status win over everything", () => {
    expect(credentialHealth({ ...baseCred, is_valid: false, health_status: "healthy" })).toBe("healthy");
  });

  it("flags imminent expiry before anything else", () => {
    expect(credentialHealth({ ...baseCred, expires_at: daysAhead(7) })).toBe("needs_rotation");
  });

  it("flags rotation age at the documented threshold", () => {
    expect(credentialHealth({ ...baseCred, last_rotated_at: daysAgo(ROTATION_WARNING_DAYS) })).toBe("needs_rotation");
    expect(credentialHealth({ ...baseCred, last_rotated_at: daysAgo(ROTATION_WARNING_DAYS - 1) })).toBe("healthy");
  });

  it("marks invalid credentials failing once expiry and rotation are clear", () => {
    expect(credentialHealth({ ...baseCred, is_valid: false })).toBe("failing");
  });

  it("treats never-tested as untested and old tests as stale", () => {
    expect(credentialHealth({ ...baseCred, last_tested_at: null })).toBe("untested");
    expect(credentialHealth({ ...baseCred, last_tested_at: daysAgo(STALE_TEST_DAYS) })).toBe("stale");
    expect(credentialHealth({ ...baseCred, last_tested_at: daysAgo(STALE_TEST_DAYS - 1) })).toBe("healthy");
  });
});

describe("exportPasswordStrength", () => {
  it("rejects short passwords as weak regardless of variety", () => {
    expect(exportPasswordStrength("Ab1!Ab1!Ab1").label).toBe("Weak");
  });

  it("grades 16+ characters with three character classes as strong", () => {
    expect(exportPasswordStrength("Abcdefgh12345678").label).toBe("Strong");
  });

  it("grades 12+ characters with two classes as good", () => {
    expect(exportPasswordStrength("abcdefgh1234").label).toBe("Good");
  });

  it("keeps low-variety long passwords weak", () => {
    expect(exportPasswordStrength("abcdefghabcd").label).toBe("Weak");
  });
});

describe("expiredReveals", () => {
  it("expires each reveal on its own clock; a second reveal never resets the first", () => {
    const t0 = NOW.getTime();
    const revealedAt = { "cred-a": t0, "cred-b": t0 + 30_000 };

    expect(expiredReveals(revealedAt, t0 + 59_999)).toEqual([]);
    expect(expiredReveals(revealedAt, t0 + 61_000)).toEqual(["cred-a"]);
    expect(expiredReveals(revealedAt, t0 + 91_000)).toEqual(["cred-a", "cred-b"]);
  });
});

describe("copySecretWithExpiry", () => {
  it("writes the secret, then wipes the clipboard at the reveal TTL", async () => {
    const writes: string[] = [];
    let scheduled: { fn: () => void; ms: number } | null = null;

    await copySecretWithExpiry(
      "sk-secret-value",
      async (text) => {
        writes.push(text);
      },
      (fn, ms) => {
        scheduled = { fn, ms };
      },
    );

    expect(writes).toEqual(["sk-secret-value"]);
    expect(scheduled!.ms).toBe(60_000);
    scheduled!.fn();
    expect(writes).toEqual(["sk-secret-value", ""]);
  });

  it("does not swallow the initial write failure", async () => {
    await expect(
      copySecretWithExpiry(
        "value",
        async () => {
          throw new Error("clipboard blocked");
        },
        () => {},
      ),
    ).rejects.toThrow("clipboard blocked");
  });
});

describe("day math", () => {
  it("returns null for missing or invalid dates", () => {
    expect(daysSince(null)).toBeNull();
    expect(daysUntil("not-a-date")).toBeNull();
  });

  it("measures whole days in both directions", () => {
    expect(daysSince(daysAgo(3))).toBe(3);
    expect(daysUntil(daysAhead(3))).toBe(3);
  });
});
