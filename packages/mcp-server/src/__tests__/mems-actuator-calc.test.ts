import { describe, it, expect } from "vitest";
import {
  force, displacement, speed, powerDraw,
  actuatorCost, linear, forOptical, mechanism,
  bestUse, memsActuators,
} from "../mems-actuator-calc.js";

describe("force", () => {
  it("shape memory alloy highest force", () => {
    expect(force("shape_memory_alloy")).toBeGreaterThan(force("electrostatic_comb"));
  });
});

describe("displacement", () => {
  it("shape memory alloy greatest displacement", () => {
    expect(displacement("shape_memory_alloy")).toBeGreaterThan(displacement("electrostatic_comb"));
  });
});

describe("speed", () => {
  it("electrostatic comb fastest speed", () => {
    expect(speed("electrostatic_comb")).toBeGreaterThan(speed("shape_memory_alloy"));
  });
});

describe("powerDraw", () => {
  it("electromagnetic coil highest power draw", () => {
    expect(powerDraw("electromagnetic_coil")).toBeGreaterThan(powerDraw("electrostatic_comb"));
  });
});

describe("actuatorCost", () => {
  it("shape memory alloy most expensive", () => {
    expect(actuatorCost("shape_memory_alloy")).toBeGreaterThan(actuatorCost("thermal_bimorph"));
  });
});

describe("linear", () => {
  it("electrostatic comb is linear", () => {
    expect(linear("electrostatic_comb")).toBe(true);
  });
  it("thermal bimorph not linear", () => {
    expect(linear("thermal_bimorph")).toBe(false);
  });
});

describe("forOptical", () => {
  it("electrostatic comb is for optical", () => {
    expect(forOptical("electrostatic_comb")).toBe(true);
  });
  it("thermal bimorph not for optical", () => {
    expect(forOptical("thermal_bimorph")).toBe(false);
  });
});

describe("mechanism", () => {
  it("shape memory alloy uses martensite transform", () => {
    expect(mechanism("shape_memory_alloy")).toBe("martensite_transform");
  });
});

describe("bestUse", () => {
  it("electrostatic comb best for mems mirror scanner", () => {
    expect(bestUse("electrostatic_comb")).toBe("mems_mirror_scanner");
  });
});

describe("memsActuators", () => {
  it("returns 5 types", () => {
    expect(memsActuators()).toHaveLength(5);
  });
});
