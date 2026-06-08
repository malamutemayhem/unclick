import { describe, it, expect } from "vitest";
import { loremNameGenerate } from "./loremname-tool.js";

describe("loremname-tool", () => {
  it("generates a random name with email", async () => {
    const r = await loremNameGenerate({}) as Record<string, unknown>;
    const names = r.names as Record<string, string>[];
    expect(names).toHaveLength(1);
    expect(names[0].first).toBeTruthy();
    expect(names[0].last).toBeTruthy();
    expect(names[0].full).toContain(" ");
    expect(names[0].email).toContain("@example.com");
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates multiple names", async () => {
    const r = await loremNameGenerate({ count: 5 }) as Record<string, unknown>;
    const names = r.names as Record<string, string>[];
    expect(names).toHaveLength(5);
  });

  it("uses custom domain", async () => {
    const r = await loremNameGenerate({ domain: "test.org" }) as Record<string, unknown>;
    const names = r.names as Record<string, string>[];
    expect(names[0].email).toContain("@test.org");
  });

  it("caps at 50", async () => {
    const r = await loremNameGenerate({ count: 100 }) as Record<string, unknown>;
    expect(r.count).toBe(50);
  });
});
