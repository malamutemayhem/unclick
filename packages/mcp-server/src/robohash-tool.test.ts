import { describe, expect, it } from "vitest";
import { robohashUrl } from "./robohash-tool.js";

describe("robohash connector (L2)", () => {
  it("returns a URL with default params", async () => {
    const r = await robohashUrl({}) as Record<string, unknown>;
    expect(r.url).toContain("robohash.org");
    expect(r.unclick_meta).toBeDefined();
  });

  it("respects custom text and set", async () => {
    const r = await robohashUrl({ text: "hello", set: "set2" }) as Record<string, unknown>;
    expect(r.url).toContain("hello");
    expect(r.url).toContain("set=set2");
  });
});
