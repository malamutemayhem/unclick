import { describe, it, expect } from "vitest";
import { pluralize, singularize, isPlural, isSingular, inflect } from "../pluralize.js";

describe("pluralize", () => {
  it("adds s to regular words", () => { expect(pluralize("cat")).toBe("cats"); });
  it("handles -y ending", () => { expect(pluralize("city")).toBe("cities"); });
  it("handles -ch ending", () => { expect(pluralize("watch")).toBe("watches"); });
  it("handles -sh ending", () => { expect(pluralize("bush")).toBe("bushes"); });
  it("handles -s ending", () => { expect(pluralize("bus")).toBe("buses"); });
  it("handles irregular child", () => { expect(pluralize("child")).toBe("children"); });
  it("handles irregular person", () => { expect(pluralize("person")).toBe("people"); });
  it("handles irregular man", () => { expect(pluralize("man")).toBe("men"); });
  it("handles uncountable", () => { expect(pluralize("sheep")).toBe("sheep"); });
  it("handles uncountable fish", () => { expect(pluralize("fish")).toBe("fish"); });
});

describe("singularize", () => {
  it("removes s from regular words", () => { expect(singularize("cats")).toBe("cat"); });
  it("handles -ies", () => { expect(singularize("cities")).toBe("city"); });
  it("handles -ches", () => { expect(singularize("watches")).toBe("watch"); });
  it("handles irregular children", () => { expect(singularize("children")).toBe("child"); });
  it("handles irregular people", () => { expect(singularize("people")).toBe("person"); });
  it("handles uncountable", () => { expect(singularize("sheep")).toBe("sheep"); });
});

describe("inflect", () => {
  it("returns singular for 1", () => { expect(inflect("cats", 1)).toBe("cat"); });
  it("returns plural for 0", () => { expect(inflect("cat", 0)).toBe("cats"); });
  it("returns plural for many", () => { expect(inflect("cat", 5)).toBe("cats"); });
});

describe("isPlural/isSingular", () => {
  it("cats is plural", () => { expect(isPlural("cats")).toBe(true); });
  it("cat is singular", () => { expect(isSingular("cat")).toBe(true); });
});
