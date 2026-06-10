import { describe, it, expect } from "vitest";
import {
  cuttingPower, noiseLevel, runtimeMinutes, maintenanceEffort,
  mowerCost, selfPropelled, mulchCapable, driveType,
  bestYard, lawnMowers,
} from "../lawn-mower-calc.js";

describe("cuttingPower", () => {
  it("gas push strongest cutting", () => {
    expect(cuttingPower("gas_push")).toBeGreaterThan(cuttingPower("reel_manual"));
  });
});

describe("noiseLevel", () => {
  it("gas push loudest", () => {
    expect(noiseLevel("gas_push")).toBeGreaterThan(noiseLevel("robotic_auto"));
  });
});

describe("runtimeMinutes", () => {
  it("electric corded unlimited runtime", () => {
    expect(runtimeMinutes("electric_corded")).toBeGreaterThan(runtimeMinutes("battery_self_propelled"));
  });
});

describe("maintenanceEffort", () => {
  it("gas push most maintenance", () => {
    expect(maintenanceEffort("gas_push")).toBeGreaterThan(maintenanceEffort("robotic_auto"));
  });
});

describe("mowerCost", () => {
  it("robotic auto most expensive", () => {
    expect(mowerCost("robotic_auto")).toBeGreaterThan(mowerCost("reel_manual"));
  });
});

describe("selfPropelled", () => {
  it("battery self propelled is self propelled", () => {
    expect(selfPropelled("battery_self_propelled")).toBe(true);
  });
  it("gas push is not", () => {
    expect(selfPropelled("gas_push")).toBe(false);
  });
});

describe("mulchCapable", () => {
  it("gas push can mulch", () => {
    expect(mulchCapable("gas_push")).toBe(true);
  });
  it("reel manual cannot", () => {
    expect(mulchCapable("reel_manual")).toBe(false);
  });
});

describe("driveType", () => {
  it("robotic auto uses wheel hub motor", () => {
    expect(driveType("robotic_auto")).toBe("wheel_hub_motor");
  });
});

describe("bestYard", () => {
  it("gas push for large thick grass lot", () => {
    expect(bestYard("gas_push")).toBe("large_thick_grass_lot");
  });
});

describe("lawnMowers", () => {
  it("returns 5 types", () => {
    expect(lawnMowers()).toHaveLength(5);
  });
});
