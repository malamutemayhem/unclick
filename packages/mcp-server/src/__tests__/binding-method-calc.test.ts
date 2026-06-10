import { describe, it, expect } from "vitest";
import {
  durabilityScore, costPerUnit, pageCapacity,
  layFlatAbility, productionSpeed, spineVisible,
  handcraftFriendly, typicalProduct, spineType, bindingMethods,
} from "../binding-method-calc.js";

describe("durabilityScore", () => {
  it("case bound most durable", () => {
    expect(durabilityScore("case_bound")).toBeGreaterThan(
      durabilityScore("saddle_stitch")
    );
  });
});

describe("costPerUnit", () => {
  it("case bound most expensive", () => {
    expect(costPerUnit("case_bound")).toBeGreaterThan(
      costPerUnit("saddle_stitch")
    );
  });
});

describe("pageCapacity", () => {
  it("case bound highest page capacity", () => {
    expect(pageCapacity("case_bound")).toBeGreaterThan(
      pageCapacity("saddle_stitch")
    );
  });
});

describe("layFlatAbility", () => {
  it("spiral best lay flat", () => {
    expect(layFlatAbility("spiral")).toBeGreaterThan(
      layFlatAbility("case_bound")
    );
  });
});

describe("productionSpeed", () => {
  it("saddle stitch fastest", () => {
    expect(productionSpeed("saddle_stitch")).toBeGreaterThan(
      productionSpeed("coptic")
    );
  });
});

describe("spineVisible", () => {
  it("case bound has visible spine", () => {
    expect(spineVisible("case_bound")).toBe(true);
  });
  it("spiral does not", () => {
    expect(spineVisible("spiral")).toBe(false);
  });
});

describe("handcraftFriendly", () => {
  it("coptic is handcraft friendly", () => {
    expect(handcraftFriendly("coptic")).toBe(true);
  });
  it("perfect is not", () => {
    expect(handcraftFriendly("perfect")).toBe(false);
  });
});

describe("typicalProduct", () => {
  it("case bound for hardcover books", () => {
    expect(typicalProduct("case_bound")).toBe("hardcover_books");
  });
});

describe("spineType", () => {
  it("coptic is exposed chain stitch", () => {
    expect(spineType("coptic")).toBe("exposed_chain_stitch");
  });
});

describe("bindingMethods", () => {
  it("returns 5 methods", () => {
    expect(bindingMethods()).toHaveLength(5);
  });
});
