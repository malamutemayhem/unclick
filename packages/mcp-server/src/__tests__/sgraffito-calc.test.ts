import { describe, it, expect } from "vitest";
import {
  timingHoursAfterThrow, toolSharpness, moisturePercent,
  slipLayerCount, detailPrecision, reversible,
  dustGeneration, skillLevel, timePerStageMinutes, sgraffitoStages,
} from "../sgraffito-calc.js";

describe("timingHoursAfterThrow", () => {
  it("bisque fire comes last", () => {
    expect(timingHoursAfterThrow("bisque_fire")).toBeGreaterThan(
      timingHoursAfterThrow("incising")
    );
  });
});

describe("toolSharpness", () => {
  it("incising needs sharpest tools", () => {
    expect(toolSharpness("incising")).toBeGreaterThan(
      toolSharpness("slip_coat")
    );
  });
});

describe("moisturePercent", () => {
  it("slip coat has most moisture", () => {
    expect(moisturePercent("slip_coat")).toBeGreaterThan(
      moisturePercent("bisque_fire")
    );
  });
});

describe("slipLayerCount", () => {
  it("only slip coat has layers", () => {
    expect(slipLayerCount("slip_coat")).toBe(3);
    expect(slipLayerCount("incising")).toBe(0);
  });
});

describe("detailPrecision", () => {
  it("incising is most precise", () => {
    expect(detailPrecision("incising")).toBeGreaterThan(
      detailPrecision("cleanup")
    );
  });
});

describe("reversible", () => {
  it("slip coat is reversible", () => {
    expect(reversible("slip_coat")).toBe(true);
  });
  it("incising is not", () => {
    expect(reversible("incising")).toBe(false);
  });
});

describe("dustGeneration", () => {
  it("cleanup generates most dust", () => {
    expect(dustGeneration("cleanup")).toBeGreaterThan(
      dustGeneration("slip_coat")
    );
  });
});

describe("skillLevel", () => {
  it("incising needs most skill", () => {
    expect(skillLevel("incising")).toBeGreaterThan(
      skillLevel("bisque_fire")
    );
  });
});

describe("timePerStageMinutes", () => {
  it("bisque fire takes longest", () => {
    expect(timePerStageMinutes("bisque_fire")).toBeGreaterThan(
      timePerStageMinutes("incising")
    );
  });
});

describe("sgraffitoStages", () => {
  it("returns 5 stages", () => {
    expect(sgraffitoStages()).toHaveLength(5);
  });
});
