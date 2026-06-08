import { describe, it, expect } from "vitest";
import { Stemmer } from "../stemmer.js";

describe("Stemmer", () => {
  it("stems plural words", () => {
    expect(Stemmer.stem("cats")).toBe("cat");
    expect(Stemmer.stem("ponies")).toBe("poni");
    expect(Stemmer.stem("caresses")).toBe("caress");
  });

  it("stems -ing forms", () => {
    expect(Stemmer.stem("running")).toBe("run");
    expect(Stemmer.stem("walking")).toBe("walk");
  });

  it("stems -ed forms", () => {
    expect(Stemmer.stem("walked")).toBe("walk");
    expect(Stemmer.stem("agreed")).toBe("agree");
  });

  it("preserves short words", () => {
    expect(Stemmer.stem("a")).toBe("a");
    expect(Stemmer.stem("go")).toBe("go");
  });

  it("stems -ational to -ate", () => {
    expect(Stemmer.stem("relational")).toBe("relate");
  });

  it("stems -fulness", () => {
    expect(Stemmer.stem("hopefulness")).toBe("hope");
  });

  it("stemMany processes arrays", () => {
    const result = Stemmer.stemMany(["running", "cats", "walked"]);
    expect(result).toEqual(["run", "cat", "walk"]);
  });

  it("stemSentence processes text", () => {
    const result = Stemmer.stemSentence("the cats are running");
    expect(result).toContain("cat");
    expect(result).toContain("run");
  });

  it("group clusters words by stem", () => {
    const groups = Stemmer.group(["run", "running", "runs", "walk", "walking"]);
    expect(groups.get("run")).toContain("run");
    expect(groups.get("run")).toContain("running");
    expect(groups.get("walk")).toContain("walk");
  });

  it("handles words starting with y", () => {
    const result = Stemmer.stem("yes");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
