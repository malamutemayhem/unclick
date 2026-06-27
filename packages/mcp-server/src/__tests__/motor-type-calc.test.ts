import { describe, it, expect } from "vitest";
import {
  efficiencyScore, torqueDensity, speedRange,
  maintenanceNeed, costScore, hasBrushes,
  requiresVfd, commonApplication, controlMethod, motorTypes,
} from "../motor-type-calc.js";

describe("efficiencyScore", () => {
  it("synchronous most efficient", () => {
    expect(efficiencyScore("synchronous")).toBeGreaterThan(
      efficiencyScore("dc_brushed")
    );
  });
});

describe("torqueDensity", () => {
  it("stepper highest torque density", () => {
    expect(torqueDensity("stepper")).toBeGreaterThan(
      torqueDensity("dc_brushed")
    );
  });
});

describe("speedRange", () => {
  it("dc_brushless widest speed range", () => {
    expect(speedRange("dc_brushless")).toBeGreaterThan(
      speedRange("stepper")
    );
  });
});

describe("maintenanceNeed", () => {
  it("dc_brushed needs most maintenance", () => {
    expect(maintenanceNeed("dc_brushed")).toBeGreaterThan(
      maintenanceNeed("dc_brushless")
    );
  });
});

describe("costScore", () => {
  it("synchronous most expensive", () => {
    expect(costScore("synchronous")).toBeGreaterThan(
      costScore("dc_brushed")
    );
  });
});

describe("hasBrushes", () => {
  it("dc_brushed has brushes", () => {
    expect(hasBrushes("dc_brushed")).toBe(true);
  });
  it("dc_brushless does not", () => {
    expect(hasBrushes("dc_brushless")).toBe(false);
  });
});

describe("requiresVfd", () => {
  it("dc_brushless requires vfd", () => {
    expect(requiresVfd("dc_brushless")).toBe(true);
  });
  it("dc_brushed does not", () => {
    expect(requiresVfd("dc_brushed")).toBe(false);
  });
});

describe("commonApplication", () => {
  it("stepper for cnc and 3d printing", () => {
    expect(commonApplication("stepper")).toBe("cnc_3d_printer");
  });
});

describe("controlMethod", () => {
  it("synchronous uses field oriented control", () => {
    expect(controlMethod("synchronous")).toBe("field_oriented_control");
  });
});

describe("motorTypes", () => {
  it("returns 5 types", () => {
    expect(motorTypes()).toHaveLength(5);
  });
});
