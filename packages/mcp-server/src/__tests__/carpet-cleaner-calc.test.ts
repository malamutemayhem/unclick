import { describe, it, expect } from "vitest";
import {
  cleaningPower, dryingTime, tankCapacity, portability,
  cleanerCost, heatedClean, noWater, cleanMethod,
  bestJob, carpetCleaners,
} from "../carpet-cleaner-calc.js";

describe("cleaningPower", () => {
  it("canister pro most cleaning power", () => {
    expect(cleaningPower("canister_pro")).toBeGreaterThan(cleaningPower("dry_powder_host"));
  });
});

describe("dryingTime", () => {
  it("dry powder host fastest drying", () => {
    expect(dryingTime("dry_powder_host")).toBeGreaterThan(dryingTime("canister_pro"));
  });
});

describe("tankCapacity", () => {
  it("canister pro largest tank", () => {
    expect(tankCapacity("canister_pro")).toBeGreaterThan(tankCapacity("portable_spot"));
  });
});

describe("portability", () => {
  it("robotic auto most portable", () => {
    expect(portability("robotic_auto")).toBeGreaterThan(portability("canister_pro"));
  });
});

describe("cleanerCost", () => {
  it("canister pro most expensive", () => {
    expect(cleanerCost("canister_pro")).toBeGreaterThan(cleanerCost("dry_powder_host"));
  });
});

describe("heatedClean", () => {
  it("upright deep clean has heated clean", () => {
    expect(heatedClean("upright_deep_clean")).toBe(true);
  });
  it("portable spot does not", () => {
    expect(heatedClean("portable_spot")).toBe(false);
  });
});

describe("noWater", () => {
  it("dry powder host uses no water", () => {
    expect(noWater("dry_powder_host")).toBe(true);
  });
  it("upright deep clean uses water", () => {
    expect(noWater("upright_deep_clean")).toBe(false);
  });
});

describe("cleanMethod", () => {
  it("robotic auto uses brush roll solution spray", () => {
    expect(cleanMethod("robotic_auto")).toBe("brush_roll_solution_spray");
  });
});

describe("bestJob", () => {
  it("portable spot for pet stain spill quick", () => {
    expect(bestJob("portable_spot")).toBe("pet_stain_spill_quick");
  });
});

describe("carpetCleaners", () => {
  it("returns 5 types", () => {
    expect(carpetCleaners()).toHaveLength(5);
  });
});
