import { describe, it, expect } from "vitest";
import { pluralize, singularize, withCount } from "../pluralize.js";

describe("pluralize", () => {
  it("adds s to regular words", () => {
    expect(pluralize("cat")).toBe("cats");
    expect(pluralize("dog")).toBe("dogs");
  });

  it("adds es to sibilants", () => {
    expect(pluralize("bus")).toBe("buses");
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("dish")).toBe("dishes");
    expect(pluralize("church")).toBe("churches");
  });

  it("handles y ending", () => {
    expect(pluralize("city")).toBe("cities");
    expect(pluralize("day")).toBe("days");
  });

  it("handles irregular words", () => {
    expect(pluralize("child")).toBe("children");
    expect(pluralize("person")).toBe("people");
    expect(pluralize("mouse")).toBe("mice");
  });

  it("handles uncountable words", () => {
    expect(pluralize("sheep")).toBe("sheep");
    expect(pluralize("fish")).toBe("fish");
  });

  it("returns singular when count is 1", () => {
    expect(pluralize("cat", 1)).toBe("cat");
  });
});

describe("singularize", () => {
  it("removes s", () => {
    expect(singularize("cats")).toBe("cat");
  });

  it("handles ies", () => {
    expect(singularize("cities")).toBe("city");
  });

  it("handles es", () => {
    expect(singularize("buses")).toBe("bus");
  });

  it("handles irregular", () => {
    expect(singularize("children")).toBe("child");
    expect(singularize("people")).toBe("person");
  });

  it("handles uncountable", () => {
    expect(singularize("sheep")).toBe("sheep");
  });
});

describe("withCount", () => {
  it("formats with count", () => {
    expect(withCount("item", 0)).toBe("0 items");
    expect(withCount("item", 1)).toBe("1 item");
    expect(withCount("item", 5)).toBe("5 items");
  });
});
