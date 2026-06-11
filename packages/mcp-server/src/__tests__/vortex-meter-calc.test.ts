import { describe, it, expect } from "vitest";
import {
  accuracy, turndown, temperature, pressureLoss,
  vxCost, noMovingParts, forSteam, shedder,
  bestUse, vortexMeterTypes,
} from "../vortex-meter-calc.js";

describe("accuracy", () => {
  it("multivariable most accurate", () => {
    expect(accuracy("multivariable_mass")).toBeGreaterThan(accuracy("insertion_retractable"));
  });
});

describe("turndown", () => {
  it("multivariable best turndown", () => {
    expect(turndown("multivariable_mass")).toBeGreaterThan(turndown("wafer_compact_low_cost"));
  });
});

describe("temperature", () => {
  it("multivariable highest temp", () => {
    expect(temperature("multivariable_mass")).toBeGreaterThan(temperature("wafer_compact_low_cost"));
  });
});

describe("pressureLoss", () => {
  it("insertion lowest loss", () => {
    expect(pressureLoss("insertion_retractable")).toBeGreaterThan(pressureLoss("wafer_compact_low_cost"));
  });
});

describe("vxCost", () => {
  it("multivariable most expensive", () => {
    expect(vxCost("multivariable_mass")).toBeGreaterThan(vxCost("wafer_compact_low_cost"));
  });
});

describe("noMovingParts", () => {
  it("all have no moving parts", () => {
    expect(noMovingParts("inline_flanged_standard")).toBe(true);
  });
  it("wafer no moving parts", () => {
    expect(noMovingParts("wafer_compact_low_cost")).toBe(true);
  });
});

describe("forSteam", () => {
  it("inline for steam", () => {
    expect(forSteam("inline_flanged_standard")).toBe(true);
  });
  it("wafer not for steam", () => {
    expect(forSteam("wafer_compact_low_cost")).toBe(false);
  });
});

describe("shedder", () => {
  it("multivariable uses integrated sensor", () => {
    expect(shedder("multivariable_mass")).toBe("integrated_pressure_temp_compensated");
  });
});

describe("bestUse", () => {
  it("insertion for large pipe", () => {
    expect(bestUse("insertion_retractable")).toBe("large_pipe_retrofit_no_shutdown");
  });
});

describe("vortexMeterTypes", () => {
  it("returns 5 types", () => {
    expect(vortexMeterTypes()).toHaveLength(5);
  });
});
