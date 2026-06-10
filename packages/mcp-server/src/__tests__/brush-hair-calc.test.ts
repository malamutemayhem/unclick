import { describe, it, expect } from "vitest";
import {
  springiness, colorCapacity, pointRetention,
  durability, stiffness, veganFriendly,
  bestMedium, waterAbsorption, costPerBrush, brushHairs,
} from "../brush-hair-calc.js";

describe("springiness", () => {
  it("kolinsky is springiest", () => {
    expect(springiness("kolinsky")).toBeGreaterThan(
      springiness("squirrel")
    );
  });
});

describe("colorCapacity", () => {
  it("kolinsky holds most color", () => {
    expect(colorCapacity("kolinsky")).toBeGreaterThan(
      colorCapacity("synthetic_nylon")
    );
  });
});

describe("pointRetention", () => {
  it("kolinsky retains point best", () => {
    expect(pointRetention("kolinsky")).toBeGreaterThan(
      pointRetention("squirrel")
    );
  });
});

describe("durability", () => {
  it("hog is most durable", () => {
    expect(durability("hog")).toBeGreaterThan(
      durability("squirrel")
    );
  });
});

describe("stiffness", () => {
  it("hog is stiffest", () => {
    expect(stiffness("hog")).toBeGreaterThan(
      stiffness("squirrel")
    );
  });
});

describe("veganFriendly", () => {
  it("synthetic nylon is vegan", () => {
    expect(veganFriendly("synthetic_nylon")).toBe(true);
  });
  it("kolinsky is not vegan", () => {
    expect(veganFriendly("kolinsky")).toBe(false);
  });
});

describe("bestMedium", () => {
  it("kolinsky best for watercolor", () => {
    expect(bestMedium("kolinsky")).toBe("watercolor");
  });
});

describe("waterAbsorption", () => {
  it("squirrel absorbs most water", () => {
    expect(waterAbsorption("squirrel")).toBeGreaterThan(
      waterAbsorption("synthetic_nylon")
    );
  });
});

describe("costPerBrush", () => {
  it("kolinsky costs most", () => {
    expect(costPerBrush("kolinsky")).toBeGreaterThan(
      costPerBrush("synthetic_nylon")
    );
  });
});

describe("brushHairs", () => {
  it("returns 5 types", () => {
    expect(brushHairs()).toHaveLength(5);
  });
});
