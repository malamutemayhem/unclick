import { describe, it, expect } from "vitest";
import { longestCommonPrefix } from "./lcprefix-tool.js";

describe("longestCommonPrefix", () => {
  it("finds common prefix among similar strings", async () => {
    const r = (await longestCommonPrefix({
      strings: ["flower", "flow", "flight"],
    })) as any;
    expect(r.prefix).toBe("fl");
    expect(r.prefix_length).toBe(2);
    expect(r.strings_count).toBe(3);
  });

  it("returns empty string when no common prefix exists", async () => {
    const r = (await longestCommonPrefix({
      strings: ["dog", "racecar", "car"],
    })) as any;
    expect(r.prefix).toBe("");
    expect(r.prefix_length).toBe(0);
  });

  it("returns the full string when only one element", async () => {
    const r = (await longestCommonPrefix({ strings: ["hello"] })) as any;
    expect(r.prefix).toBe("hello");
    expect(r.prefix_length).toBe(5);
  });

  it("rejects empty array", async () => {
    await expect(longestCommonPrefix({ strings: [] })).rejects.toThrow("at least one");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await longestCommonPrefix({ strings: ["a", "ab"] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
