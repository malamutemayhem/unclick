import { describe, it, expect } from "vitest";
import {
  voltageRatioRange, efficiencyPercent, sizeWeight,
  costScore, safetyIsolation, galvanicIsolation,
  forMeasurement, primaryApplication, windingConfig, transformerTypes,
} from "../transformer-type-calc.js";

describe("voltageRatioRange", () => {
  it("instrument widest ratio range", () => {
    expect(voltageRatioRange("instrument")).toBeGreaterThan(
      voltageRatioRange("autotransformer")
    );
  });
});

describe("efficiencyPercent", () => {
  it("autotransformer most efficient", () => {
    expect(efficiencyPercent("autotransformer")).toBeGreaterThan(
      efficiencyPercent("instrument")
    );
  });
});

describe("sizeWeight", () => {
  it("step_up heaviest", () => {
    expect(sizeWeight("step_up")).toBeGreaterThan(
      sizeWeight("instrument")
    );
  });
});

describe("costScore", () => {
  it("step_up most expensive", () => {
    expect(costScore("step_up")).toBeGreaterThan(
      costScore("autotransformer")
    );
  });
});

describe("safetyIsolation", () => {
  it("isolation best safety", () => {
    expect(safetyIsolation("isolation")).toBeGreaterThan(
      safetyIsolation("autotransformer")
    );
  });
});

describe("galvanicIsolation", () => {
  it("isolation provides galvanic isolation", () => {
    expect(galvanicIsolation("isolation")).toBe(true);
  });
  it("autotransformer does not", () => {
    expect(galvanicIsolation("autotransformer")).toBe(false);
  });
});

describe("forMeasurement", () => {
  it("instrument is for measurement", () => {
    expect(forMeasurement("instrument")).toBe(true);
  });
  it("step_up is not", () => {
    expect(forMeasurement("step_up")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("isolation for medical equipment", () => {
    expect(primaryApplication("isolation")).toBe("medical_sensitive_equipment");
  });
});

describe("windingConfig", () => {
  it("autotransformer has single tapped winding", () => {
    expect(windingConfig("autotransformer")).toBe("single_tapped_winding");
  });
});

describe("transformerTypes", () => {
  it("returns 5 types", () => {
    expect(transformerTypes()).toHaveLength(5);
  });
});
