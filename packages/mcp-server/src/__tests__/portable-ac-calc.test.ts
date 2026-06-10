import { describe, it, expect } from "vitest";
import {
  coolingPower, energyEfficiency, noiseLevel, portability,
  acCost, noVentNeeded, dehumidifies, compressorType,
  bestRoom, portableAcs,
} from "../portable-ac-calc.js";

describe("coolingPower", () => {
  it("spot cooler industrial highest cooling power", () => {
    expect(coolingPower("spot_cooler_industrial")).toBeGreaterThan(coolingPower("evaporative_swamp"));
  });
});

describe("energyEfficiency", () => {
  it("evaporative swamp most energy efficient", () => {
    expect(energyEfficiency("evaporative_swamp")).toBeGreaterThan(energyEfficiency("spot_cooler_industrial"));
  });
});

describe("noiseLevel", () => {
  it("evaporative swamp quietest", () => {
    expect(noiseLevel("evaporative_swamp")).toBeGreaterThan(noiseLevel("spot_cooler_industrial"));
  });
});

describe("portability", () => {
  it("evaporative swamp most portable", () => {
    expect(portability("evaporative_swamp")).toBeGreaterThan(portability("spot_cooler_industrial"));
  });
});

describe("acCost", () => {
  it("spot cooler industrial most expensive", () => {
    expect(acCost("spot_cooler_industrial")).toBeGreaterThan(acCost("evaporative_swamp"));
  });
});

describe("noVentNeeded", () => {
  it("evaporative swamp needs no vent", () => {
    expect(noVentNeeded("evaporative_swamp")).toBe(true);
  });
  it("single hose basic does", () => {
    expect(noVentNeeded("single_hose_basic")).toBe(false);
  });
});

describe("dehumidifies", () => {
  it("dual hose efficient dehumidifies", () => {
    expect(dehumidifies("dual_hose_efficient")).toBe(true);
  });
  it("evaporative swamp does not", () => {
    expect(dehumidifies("evaporative_swamp")).toBe(false);
  });
});

describe("compressorType", () => {
  it("evaporative swamp uses no compressor water pad", () => {
    expect(compressorType("evaporative_swamp")).toBe("no_compressor_water_pad");
  });
});

describe("bestRoom", () => {
  it("dual hose efficient best for living room large open", () => {
    expect(bestRoom("dual_hose_efficient")).toBe("living_room_large_open");
  });
});

describe("portableAcs", () => {
  it("returns 5 types", () => {
    expect(portableAcs()).toHaveLength(5);
  });
});
