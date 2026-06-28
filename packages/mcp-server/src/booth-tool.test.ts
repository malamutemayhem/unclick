import { describe, it, expect } from "vitest";
import { boothRotation } from "./booth-tool.js";

describe("boothRotation", () => {
  it("finds the smallest rotation of 'cab'", async () => {
    const r = (await boothRotation({ text: "cab" })) as any;
    expect(r.rotated).toBe("abc");
    expect(r.rotation_index).toBe(1);
    expect(r.length).toBe(3);
  });

  it("returns the same string when it is already minimal", async () => {
    const r = (await boothRotation({ text: "abc" })) as any;
    expect(r.rotated).toBe("abc");
    expect(r.rotation_index).toBe(0);
  });

  it("handles single character strings", async () => {
    const r = (await boothRotation({ text: "z" })) as any;
    expect(r.rotated).toBe("z");
    expect(r.rotation_index).toBe(0);
    expect(r.length).toBe(1);
  });

  it("handles repeated characters", async () => {
    const r = (await boothRotation({ text: "aaa" })) as any;
    expect(r.rotated).toBe("aaa");
    expect(r.rotation_index).toBe(0);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await boothRotation({ text: "bca" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
