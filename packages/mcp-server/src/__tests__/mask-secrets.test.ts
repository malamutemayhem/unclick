import { describe, it, expect } from "vitest";
import { maskApiKey, maskSecretsInRecord } from "../mask-secrets.js";

describe("maskApiKey", () => {
  it("returns 'missing' for empty string", () => {
    expect(maskApiKey("")).toBe("missing");
    expect(maskApiKey("  ")).toBe("missing");
  });

  it("masks short keys (<=6)", () => {
    expect(maskApiKey("abcdef")).toBe("a...f");
  });

  it("masks medium keys (7-16)", () => {
    expect(maskApiKey("abcdefghij")).toBe("ab...ij");
  });

  it("masks long keys (>16)", () => {
    const key = "sk_test_1234567890abcdefghij";
    const masked = maskApiKey(key);
    expect(masked).toBe("sk_test_...cdefghij");
    expect(masked.length).toBeLessThan(key.length);
  });

  it("trims whitespace", () => {
    expect(maskApiKey("  abc  ")).toBe("a...c");
  });
});

describe("maskSecretsInRecord", () => {
  it("masks fields with secret-like names", () => {
    const result = maskSecretsInRecord({
      api_key: "sk_test_1234567890abcdef",
      name: "test",
    });
    expect(result.api_key).toContain("...");
    expect(result.name).toBe("test");
  });

  it("masks nested objects", () => {
    const result = maskSecretsInRecord({
      config: { secret_key: "my_secret_value_here" },
    });
    const nested = result.config as Record<string, unknown>;
    expect(nested.secret_key).toContain("...");
  });

  it("masks token fields", () => {
    const result = maskSecretsInRecord({ access_token: "abc123xyz789" });
    expect(result.access_token).toContain("...");
  });

  it("leaves non-secret fields alone", () => {
    const result = maskSecretsInRecord({ name: "test", count: 5 });
    expect(result.name).toBe("test");
    expect(result.count).toBe(5);
  });
});
