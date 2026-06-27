import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, tempRange, vibrationImmune,
  vfCost, noMovingParts, forSteam, shedder,
  bestUse, vortexFlowTypes,
} from "../vortex-flow-calc.js";

describe("accuracy", () => {
  it("dual sensor mass highest accuracy", () => {
    expect(accuracy("dual_sensor_mass")).toBeGreaterThan(accuracy("insertion_probe_vortex"));
  });
});

describe("rangeability", () => {
  it("reducing vortex best rangeability", () => {
    expect(rangeability("reducing_vortex_low")).toBeGreaterThan(rangeability("inline_bluff_body"));
  });
});

describe("tempRange", () => {
  it("dual sensor mass widest temp range", () => {
    expect(tempRange("dual_sensor_mass")).toBeGreaterThan(tempRange("reducing_vortex_low"));
  });
});

describe("vibrationImmune", () => {
  it("dual sensor mass best vibration immunity", () => {
    expect(vibrationImmune("dual_sensor_mass")).toBeGreaterThan(vibrationImmune("insertion_probe_vortex"));
  });
});

describe("vfCost", () => {
  it("multivariable vortex most expensive", () => {
    expect(vfCost("multivariable_vortex")).toBeGreaterThan(vfCost("insertion_probe_vortex"));
  });
});

describe("noMovingParts", () => {
  it("all vortex meters have no moving parts", () => {
    expect(noMovingParts("inline_bluff_body")).toBe(true);
    expect(noMovingParts("multivariable_vortex")).toBe(true);
  });
});

describe("forSteam", () => {
  it("inline bluff body for steam", () => {
    expect(forSteam("inline_bluff_body")).toBe(true);
  });
  it("insertion probe not for steam", () => {
    expect(forSteam("insertion_probe_vortex")).toBe(false);
  });
});

describe("shedder", () => {
  it("multivariable vortex uses integrated compute", () => {
    expect(shedder("multivariable_vortex")).toBe("integrated_temp_pressure_vortex_compute");
  });
});

describe("bestUse", () => {
  it("multivariable vortex for superheated steam energy", () => {
    expect(bestUse("multivariable_vortex")).toBe("superheated_steam_energy_manage_audit");
  });
});

describe("vortexFlowTypes", () => {
  it("returns 5 types", () => {
    expect(vortexFlowTypes()).toHaveLength(5);
  });
});
