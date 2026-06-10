import { describe, it, expect } from "vitest";
import {
  cookTempCelsius, cookTimeMinutes, stirringFrequencyMinutes, gelPhase,
  usableImmediately, textureControl, burnRisk, batchSizeMaxKg,
  costPerBatch, heatSources,
} from "../hot-process-soap-calc.js";

describe("cookTempCelsius", () => {
  it("direct heat is hottest", () => {
    expect(cookTempCelsius("direct_heat")).toBeGreaterThan(
      cookTempCelsius("double_boiler")
    );
  });
});

describe("cookTimeMinutes", () => {
  it("oven takes longest", () => {
    expect(cookTimeMinutes("oven")).toBeGreaterThan(
      cookTimeMinutes("microwave")
    );
  });
});

describe("stirringFrequencyMinutes", () => {
  it("microwave needs most stirring", () => {
    expect(stirringFrequencyMinutes("microwave")).toBeLessThan(
      stirringFrequencyMinutes("crockpot")
    );
  });
});

describe("gelPhase", () => {
  it("crockpot achieves gel phase", () => {
    expect(gelPhase("crockpot")).toBe(true);
  });
  it("microwave does not", () => {
    expect(gelPhase("microwave")).toBe(false);
  });
});

describe("usableImmediately", () => {
  it("returns true", () => {
    expect(usableImmediately()).toBe(true);
  });
});

describe("textureControl", () => {
  it("double boiler gives best control", () => {
    expect(textureControl("double_boiler")).toBeGreaterThan(
      textureControl("microwave")
    );
  });
});

describe("burnRisk", () => {
  it("direct heat has highest risk", () => {
    expect(burnRisk("direct_heat")).toBeGreaterThan(
      burnRisk("crockpot")
    );
  });
});

describe("batchSizeMaxKg", () => {
  it("direct heat handles largest batch", () => {
    expect(batchSizeMaxKg("direct_heat")).toBeGreaterThan(
      batchSizeMaxKg("microwave")
    );
  });
});

describe("costPerBatch", () => {
  it("double boiler costs most", () => {
    expect(costPerBatch("double_boiler")).toBeGreaterThan(
      costPerBatch("microwave")
    );
  });
});

describe("heatSources", () => {
  it("returns 5 sources", () => {
    expect(heatSources()).toHaveLength(5);
  });
});
