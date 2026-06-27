import { describe, it, expect } from "vitest";
import {
  comfort, durability, waterResist, breathability,
  coverCost, machineWash, universalFit, coverMaterial,
  bestDriver, seatCovers,
} from "../seat-cover-calc.js";

describe("comfort", () => {
  it("sheepskin wool pad most comfortable", () => {
    expect(comfort("sheepskin_wool_pad")).toBeGreaterThan(comfort("canvas_heavy_duty"));
  });
});

describe("durability", () => {
  it("canvas heavy duty most durable", () => {
    expect(durability("canvas_heavy_duty")).toBeGreaterThan(durability("sheepskin_wool_pad"));
  });
});

describe("waterResist", () => {
  it("neoprene waterproof best water resistance", () => {
    expect(waterResist("neoprene_waterproof")).toBeGreaterThan(waterResist("sheepskin_wool_pad"));
  });
});

describe("breathability", () => {
  it("mesh breathable sport most breathable", () => {
    expect(breathability("mesh_breathable_sport")).toBeGreaterThan(breathability("neoprene_waterproof"));
  });
});

describe("coverCost", () => {
  it("leather luxury fit most expensive", () => {
    expect(coverCost("leather_luxury_fit")).toBeGreaterThan(coverCost("mesh_breathable_sport"));
  });
});

describe("machineWash", () => {
  it("neoprene waterproof is machine washable", () => {
    expect(machineWash("neoprene_waterproof")).toBe(true);
  });
  it("leather luxury fit is not", () => {
    expect(machineWash("leather_luxury_fit")).toBe(false);
  });
});

describe("universalFit", () => {
  it("neoprene waterproof is universal fit", () => {
    expect(universalFit("neoprene_waterproof")).toBe(true);
  });
  it("leather luxury fit is not", () => {
    expect(universalFit("leather_luxury_fit")).toBe(false);
  });
});

describe("coverMaterial", () => {
  it("sheepskin wool pad uses natural sheep fleece", () => {
    expect(coverMaterial("sheepskin_wool_pad")).toBe("natural_sheep_fleece");
  });
});

describe("bestDriver", () => {
  it("canvas heavy duty best for work truck utility", () => {
    expect(bestDriver("canvas_heavy_duty")).toBe("work_truck_utility");
  });
});

describe("seatCovers", () => {
  it("returns 5 types", () => {
    expect(seatCovers()).toHaveLength(5);
  });
});
