import { describe, it, expect } from "vitest";
import { HumanReadableId } from "../human-readable-id.js";

describe("HumanReadableId", () => {
  it("generates id with default format", () => {
    const gen = new HumanReadableId(123);
    const id = gen.generate();
    expect(id.split("-").length).toBe(2);
    expect(id).toMatch(/^[a-z]+-[a-z]+$/);
  });

  it("generates id with custom separator", () => {
    const gen = new HumanReadableId(456);
    const id = gen.generate({ separator: "_" });
    expect(id).toContain("_");
  });

  it("generates id with more words", () => {
    const gen = new HumanReadableId(789);
    const id = gen.generate({ words: 3 });
    expect(id.split("-").length).toBe(3);
  });

  it("generates id with number suffix", () => {
    const gen = new HumanReadableId(111);
    const id = gen.generate({ addNumber: true });
    const parts = id.split("-");
    expect(parts.length).toBe(3);
    expect(parseInt(parts[2])).not.toBeNaN();
  });

  it("generateWithColor includes a color", () => {
    const gen = new HumanReadableId(222);
    const id = gen.generateWithColor();
    expect(id.split("-").length).toBe(3);
  });

  it("batch generates unique ids", () => {
    const gen = new HumanReadableId(333);
    const ids = gen.batch(5);
    const unique = new Set(ids);
    expect(unique.size).toBe(5);
  });

  it("fromTimestamp generates deterministic id", () => {
    const id1 = HumanReadableId.fromTimestamp(12345);
    const id2 = HumanReadableId.fromTimestamp(12345);
    expect(id1).toBe(id2);
    expect(id1.split("-").length).toBe(3);
  });

  it("slugify converts text to slug", () => {
    expect(HumanReadableId.slugify("Hello World!")).toBe("hello-world");
    expect(HumanReadableId.slugify("  Some--Text  ")).toBe("some-text");
  });
});
