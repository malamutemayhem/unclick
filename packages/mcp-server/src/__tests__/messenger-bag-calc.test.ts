import { describe, it, expect } from "vitest";
import {
  laptopFit, comfort, durability, styleAppeal,
  bagCost, waterResist, convertsToBackpack, strapType,
  bestUse, messengerBags,
} from "../messenger-bag-calc.js";

describe("laptopFit", () => {
  it("nylon tech slim best laptop fit", () => {
    expect(laptopFit("nylon_tech_slim")).toBeGreaterThan(laptopFit("waxed_cotton_heritage"));
  });
});

describe("comfort", () => {
  it("convertible backpack hybrid most comfortable", () => {
    expect(comfort("convertible_backpack_hybrid")).toBeGreaterThan(comfort("waxed_cotton_heritage"));
  });
});

describe("durability", () => {
  it("leather professional most durable", () => {
    expect(durability("leather_professional")).toBeGreaterThan(durability("nylon_tech_slim"));
  });
});

describe("styleAppeal", () => {
  it("leather professional most stylish", () => {
    expect(styleAppeal("leather_professional")).toBeGreaterThan(styleAppeal("nylon_tech_slim"));
  });
});

describe("bagCost", () => {
  it("leather professional most expensive", () => {
    expect(bagCost("leather_professional")).toBeGreaterThan(bagCost("canvas_classic_flap"));
  });
});

describe("waterResist", () => {
  it("waxed cotton heritage is water resistant", () => {
    expect(waterResist("waxed_cotton_heritage")).toBe(true);
  });
  it("canvas classic flap is not water resistant", () => {
    expect(waterResist("canvas_classic_flap")).toBe(false);
  });
});

describe("convertsToBackpack", () => {
  it("convertible backpack hybrid converts", () => {
    expect(convertsToBackpack("convertible_backpack_hybrid")).toBe(true);
  });
  it("leather professional does not convert", () => {
    expect(convertsToBackpack("leather_professional")).toBe(false);
  });
});

describe("strapType", () => {
  it("leather professional uses leather padded shoulder", () => {
    expect(strapType("leather_professional")).toBe("leather_padded_shoulder");
  });
});

describe("bestUse", () => {
  it("leather professional best for business meeting client", () => {
    expect(bestUse("leather_professional")).toBe("business_meeting_client");
  });
});

describe("messengerBags", () => {
  it("returns 5 types", () => {
    expect(messengerBags()).toHaveLength(5);
  });
});
