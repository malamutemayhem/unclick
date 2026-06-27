import { describe, it, expect } from "vitest";
import {
  diggingPower, rustResistance, handComfort, weightBalance,
  trowelCost, onepiece, depthMarks, bladeShape,
  bestTask, gardenTrowels,
} from "../garden-trowel-calc.js";

describe("diggingPower", () => {
  it("carbon steel heavy best digging power", () => {
    expect(diggingPower("carbon_steel_heavy")).toBeGreaterThan(diggingPower("aluminum_light"));
  });
});

describe("rustResistance", () => {
  it("stainless steel narrow best rust resistance", () => {
    expect(rustResistance("stainless_steel_narrow")).toBeGreaterThan(rustResistance("carbon_steel_heavy"));
  });
});

describe("handComfort", () => {
  it("ergonomic pistol grip most comfortable", () => {
    expect(handComfort("ergonomic_pistol_grip")).toBeGreaterThan(handComfort("carbon_steel_heavy"));
  });
});

describe("weightBalance", () => {
  it("aluminum light best weight balance", () => {
    expect(weightBalance("aluminum_light")).toBeGreaterThan(weightBalance("carbon_steel_heavy"));
  });
});

describe("trowelCost", () => {
  it("ergonomic pistol grip most expensive", () => {
    expect(trowelCost("ergonomic_pistol_grip")).toBeGreaterThan(trowelCost("aluminum_light"));
  });
});

describe("onepiece", () => {
  it("stainless steel narrow is one piece", () => {
    expect(onepiece("stainless_steel_narrow")).toBe(true);
  });
  it("aluminum light is not", () => {
    expect(onepiece("aluminum_light")).toBe(false);
  });
});

describe("depthMarks", () => {
  it("stainless steel narrow has depth marks", () => {
    expect(depthMarks("stainless_steel_narrow")).toBe(true);
  });
  it("carbon steel heavy does not", () => {
    expect(depthMarks("carbon_steel_heavy")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("carbon steel heavy uses broad deep cup", () => {
    expect(bladeShape("carbon_steel_heavy")).toBe("broad_deep_cup");
  });
});

describe("bestTask", () => {
  it("ergonomic pistol grip best for arthritis ease garden", () => {
    expect(bestTask("ergonomic_pistol_grip")).toBe("arthritis_ease_garden");
  });
});

describe("gardenTrowels", () => {
  it("returns 5 types", () => {
    expect(gardenTrowels()).toHaveLength(5);
  });
});
