import { describe, it, expect } from "vitest";
import {
  generateName, generateNames, generateFullName,
  getStyles, blendStyles, syllableCount, nameLength,
  alliterate,
} from "../name-gen.js";

describe("generateName", () => {
  it("generates fantasy name", () => {
    const name = generateName("fantasy", 42);
    expect(name.length).toBeGreaterThan(3);
    expect(typeof name).toBe("string");
  });

  it("deterministic with seed", () => {
    const a = generateName("scifi", 123);
    const b = generateName("scifi", 123);
    expect(a).toBe(b);
  });

  it("different seeds produce different names", () => {
    const a = generateName("elvish", 1);
    const b = generateName("elvish", 999);
    expect(a).not.toBe(b);
  });
});

describe("generateNames", () => {
  it("generates requested count", () => {
    const names = generateNames("dwarven", 5, 42);
    expect(names.length).toBe(5);
  });

  it("names are unique", () => {
    const names = generateNames("fantasy", 10, 42);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

describe("generateFullName", () => {
  it("returns first and last name", () => {
    const name = generateFullName("roman", 42);
    expect(name.firstName.length).toBeGreaterThan(0);
    expect(name.lastName.length).toBeGreaterThan(0);
  });

  it("first and last are different", () => {
    const name = generateFullName("fantasy", 42);
    expect(name.firstName).not.toBe(name.lastName);
  });
});

describe("getStyles", () => {
  it("returns all styles", () => {
    const styles = getStyles();
    expect(styles.length).toBe(8);
    expect(styles).toContain("fantasy");
    expect(styles).toContain("scifi");
  });
});

describe("blendStyles", () => {
  it("creates blended name", () => {
    const name = blendStyles("fantasy", "scifi", 42);
    expect(name.length).toBeGreaterThan(3);
  });
});

describe("syllableCount", () => {
  it("counts vowel groups", () => {
    expect(syllableCount("Aragorn")).toBe(3);
  });

  it("minimum 1 syllable", () => {
    expect(syllableCount("xyz")).toBe(1);
  });
});

describe("nameLength", () => {
  it("returns character count", () => {
    expect(nameLength("Gandalf")).toBe(7);
  });
});

describe("alliterate", () => {
  it("generates names starting with letter", () => {
    const names = alliterate("fantasy", "A", 3, 42);
    for (const name of names) {
      expect(name[0]).toBe("A");
    }
  });

  it("returns empty for missing letter", () => {
    expect(alliterate("fantasy", "X", 3, 42).length).toBe(0);
  });
});
