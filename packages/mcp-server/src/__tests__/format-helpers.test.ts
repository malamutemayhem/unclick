import { describe, it, expect } from "vitest";
import {
  humanList,
  truncate,
  pluralize,
  countLabel,
  relativeTime,
  chunkArray,
  slugify,
} from "../format-helpers.js";

describe("humanList", () => {
  it("returns empty for no items", () => {
    expect(humanList([])).toBe("");
  });

  it("returns the item for one item", () => {
    expect(humanList(["apple"])).toBe("apple");
  });

  it("joins two items with conjunction", () => {
    expect(humanList(["apple", "banana"])).toBe("apple or banana");
    expect(humanList(["apple", "banana"], "and")).toBe("apple and banana");
  });

  it("joins three+ items with commas and conjunction", () => {
    expect(humanList(["a", "b", "c"])).toBe("a, b, or c");
    expect(humanList(["a", "b", "c"], "and")).toBe("a, b, and c");
  });

  it("handles four items", () => {
    expect(humanList(["a", "b", "c", "d"])).toBe("a, b, c, or d");
  });
});

describe("truncate", () => {
  it("returns short strings unchanged", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates with ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("handles maxLength <= 3", () => {
    expect(truncate("hello", 3)).toBe("hel");
    expect(truncate("hello", 1)).toBe("h");
  });

  it("handles exact length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("pluralize", () => {
  it("returns singular for count 1", () => {
    expect(pluralize(1, "item")).toBe("item");
  });

  it("returns default plural for other counts", () => {
    expect(pluralize(0, "item")).toBe("items");
    expect(pluralize(5, "item")).toBe("items");
  });

  it("uses custom plural", () => {
    expect(pluralize(2, "person", "people")).toBe("people");
    expect(pluralize(1, "person", "people")).toBe("person");
  });
});

describe("countLabel", () => {
  it("formats zero with 'no'", () => {
    expect(countLabel(0, "item")).toBe("no items");
  });

  it("formats one", () => {
    expect(countLabel(1, "item")).toBe("1 item");
  });

  it("formats many", () => {
    expect(countLabel(5, "item")).toBe("5 items");
  });

  it("uses custom plural", () => {
    expect(countLabel(0, "person", "people")).toBe("no people");
    expect(countLabel(3, "person", "people")).toBe("3 people");
  });
});

describe("relativeTime", () => {
  const now = new Date("2025-01-15T12:00:00Z");

  it("says 'just now' for recent times", () => {
    const date = new Date("2025-01-15T11:59:30Z");
    expect(relativeTime(date, now)).toBe("just now");
  });

  it("formats minutes ago", () => {
    const date = new Date("2025-01-15T11:55:00Z");
    expect(relativeTime(date, now)).toBe("5 minutes ago");
  });

  it("formats 1 minute ago", () => {
    const date = new Date("2025-01-15T11:58:50Z");
    expect(relativeTime(date, now)).toBe("1 minute ago");
  });

  it("formats hours ago", () => {
    const date = new Date("2025-01-15T09:00:00Z");
    expect(relativeTime(date, now)).toBe("3 hours ago");
  });

  it("formats days ago", () => {
    const date = new Date("2025-01-13T12:00:00Z");
    expect(relativeTime(date, now)).toBe("2 days ago");
  });

  it("formats future times with 'in'", () => {
    const date = new Date("2025-01-15T14:00:00Z");
    expect(relativeTime(date, now)).toBe("in 2 hours");
  });
});

describe("chunkArray", () => {
  it("chunks into equal parts", () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it("handles remainder", () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns single chunk for small arrays", () => {
    expect(chunkArray([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("handles empty array", () => {
    expect(chunkArray([], 3)).toEqual([]);
  });

  it("puts everything in one chunk for size <= 0", () => {
    expect(chunkArray([1, 2, 3], 0)).toEqual([[1, 2, 3]]);
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("a - - b")).toBe("a-b");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify(" -hello- ")).toBe("hello");
  });

  it("replaces underscores with hyphens", () => {
    expect(slugify("my_cool_thing")).toBe("my-cool-thing");
  });
});
