import { describe, it, expect } from "vitest";
import {
  splitAccuracy, throughput, surfaceQuality, thicknessRange,
  smCost, automated, forGrain, machineConfig,
  bestUse, splittingMachineTypes,
} from "../splitting-machine-calc.js";

describe("splitAccuracy", () => {
  it("hydraulic auto best split accuracy", () => {
    expect(splitAccuracy("hydraulic_auto")).toBeGreaterThan(splitAccuracy("screw_adjust"));
  });
});

describe("throughput", () => {
  it("roller split highest throughput", () => {
    expect(throughput("roller_split")).toBeGreaterThan(throughput("screw_adjust"));
  });
});

describe("surfaceQuality", () => {
  it("hydraulic auto best surface quality", () => {
    expect(surfaceQuality("hydraulic_auto")).toBeGreaterThan(surfaceQuality("roller_split"));
  });
});

describe("thicknessRange", () => {
  it("hydraulic auto best thickness range", () => {
    expect(thicknessRange("hydraulic_auto")).toBeGreaterThan(thicknessRange("roller_split"));
  });
});

describe("smCost", () => {
  it("hydraulic auto most expensive", () => {
    expect(smCost("hydraulic_auto")).toBeGreaterThan(smCost("screw_adjust"));
  });
});

describe("automated", () => {
  it("band knife split is automated", () => {
    expect(automated("band_knife_split")).toBe(true);
  });
  it("screw adjust not automated", () => {
    expect(automated("screw_adjust")).toBe(false);
  });
});

describe("forGrain", () => {
  it("band knife split for grain side", () => {
    expect(forGrain("band_knife_split")).toBe(true);
  });
  it("wet blue split not for grain", () => {
    expect(forGrain("wet_blue_split")).toBe(false);
  });
});

describe("machineConfig", () => {
  it("hydraulic auto uses servo gap laser measure", () => {
    expect(machineConfig("hydraulic_auto")).toBe("hydraulic_auto_splitting_machine_servo_gap_laser_measure_precise");
  });
});

describe("bestUse", () => {
  it("roller split for high volume tannery", () => {
    expect(bestUse("roller_split")).toBe("high_volume_tannery_roller_splitter_continuous_fast_cattle_hide");
  });
});

describe("splittingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(splittingMachineTypes()).toHaveLength(5);
  });
});
