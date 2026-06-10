import { describe, it, expect } from "vitest";
import {
  cuttingPower, versatility, portability, edgeRetention,
  knifeCost, oneHandOpen, hasSheath, steelType,
  bestTask, campKnives,
} from "../camp-knife-calc.js";

describe("cuttingPower", () => {
  it("fixed blade full tang most cutting power", () => {
    expect(cuttingPower("fixed_blade_full_tang")).toBeGreaterThan(cuttingPower("multi_tool_swiss"));
  });
});

describe("versatility", () => {
  it("multi tool swiss most versatile", () => {
    expect(versatility("multi_tool_swiss")).toBeGreaterThan(versatility("machete_bush_clear"));
  });
});

describe("portability", () => {
  it("multi tool swiss most portable", () => {
    expect(portability("multi_tool_swiss")).toBeGreaterThan(portability("machete_bush_clear"));
  });
});

describe("edgeRetention", () => {
  it("fixed blade full tang best edge retention", () => {
    expect(edgeRetention("fixed_blade_full_tang")).toBeGreaterThan(edgeRetention("multi_tool_swiss"));
  });
});

describe("knifeCost", () => {
  it("fixed blade full tang more expensive than mora", () => {
    expect(knifeCost("fixed_blade_full_tang")).toBeGreaterThan(knifeCost("mora_scandi_grind"));
  });
});

describe("oneHandOpen", () => {
  it("folding liner lock opens one handed", () => {
    expect(oneHandOpen("folding_liner_lock")).toBe(true);
  });
  it("fixed blade full tang does not open one handed", () => {
    expect(oneHandOpen("fixed_blade_full_tang")).toBe(false);
  });
});

describe("hasSheath", () => {
  it("fixed blade full tang has sheath", () => {
    expect(hasSheath("fixed_blade_full_tang")).toBe(true);
  });
  it("folding liner lock has no sheath", () => {
    expect(hasSheath("folding_liner_lock")).toBe(false);
  });
});

describe("steelType", () => {
  it("mora scandi grind uses carbon steel scandi", () => {
    expect(steelType("mora_scandi_grind")).toBe("carbon_steel_scandi");
  });
});

describe("bestTask", () => {
  it("multi tool swiss best for repair cook multi use", () => {
    expect(bestTask("multi_tool_swiss")).toBe("repair_cook_multi_use");
  });
});

describe("campKnives", () => {
  it("returns 5 types", () => {
    expect(campKnives()).toHaveLength(5);
  });
});
