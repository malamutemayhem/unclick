import { describe, expect, it } from "vitest";
import { avatarUrl } from "./avatarapi-tool.js";

describe("avatarapi connector (L2)", () => {
  it("returns a URL with default params", async () => {
    const r = await avatarUrl({}) as Record<string, unknown>;
    expect(r.url).toContain("ui-avatars.com");
    expect(r.unclick_meta).toBeDefined();
  });

  it("respects custom name and size", async () => {
    const r = await avatarUrl({ name: "John Doe", size: 128 }) as Record<string, unknown>;
    expect(r.url).toContain("John");
    expect(r.url).toContain("size=128");
  });
});
