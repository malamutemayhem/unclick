import { describe, it, expect } from "vitest";
import { semverParse, semverCompare } from "./semver-tool.js";

describe("semver-tool", () => {
  it("parses a semver version", async () => {
    const r = await semverParse({ version: "2.3.1-beta.1" }) as Record<string, unknown>;
    expect(r.major).toBe(2);
    expect(r.minor).toBe(3);
    expect(r.patch).toBe(1);
    expect(r.prerelease).toBe("beta.1");
    expect(r.unclick_meta).toBeDefined();
  });

  it("compares versions", async () => {
    const r = await semverCompare({ version_a: "2.0.0", version_b: "1.9.9" }) as Record<string, unknown>;
    expect(r.result).toBe("greater");
  });

  it("detects equal versions", async () => {
    const r = await semverCompare({ version_a: "1.0.0", version_b: "1.0.0" }) as Record<string, unknown>;
    expect(r.result).toBe("equal");
  });

  it("rejects invalid semver", async () => {
    const r = await semverParse({ version: "abc" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid/i);
  });

  it("rejects missing version", async () => {
    const r = await semverParse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/version/i);
  });
});
