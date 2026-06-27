import { describe, it, expect } from "vitest";
import { createTag, isTag, matchTag, narrow } from "../tagged-union.js";

type Shape =
  | { tag: "circle"; radius: number }
  | { tag: "rect"; width: number; height: number };

describe("createTag", () => {
  it("creates tagged value", () => {
    const circle = createTag("circle");
    const c = circle({ radius: 5 });
    expect(c.tag).toBe("circle");
    expect(c.radius).toBe(5);
  });
});

describe("isTag", () => {
  it("checks tag", () => {
    const shape: Shape = { tag: "circle", radius: 5 };
    expect(isTag(shape, "circle")).toBe(true);
    expect(isTag(shape, "rect")).toBe(false);
  });
});

describe("matchTag", () => {
  it("dispatches to correct handler", () => {
    const area = (s: Shape) => matchTag(s, {
      circle: (c) => Math.PI * c.radius ** 2,
      rect: (r) => r.width * r.height,
    });
    expect(area({ tag: "circle", radius: 1 })).toBeCloseTo(Math.PI);
    expect(area({ tag: "rect", width: 3, height: 4 })).toBe(12);
  });

  it("throws for unknown tag", () => {
    const bad = { tag: "triangle" } as unknown as Shape;
    expect(() => matchTag(bad, {
      circle: () => 0,
      rect: () => 0,
    })).toThrow("No handler");
  });
});

describe("narrow", () => {
  it("returns value for matching tag", () => {
    const s: Shape = { tag: "rect", width: 2, height: 3 };
    const r = narrow(s, "rect");
    expect(r?.width).toBe(2);
  });

  it("returns undefined for non-matching tag", () => {
    const s = { tag: "circle", radius: 5 } as Shape;
    expect(narrow(s, "rect")).toBeUndefined();
  });
});
