import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, firingHours, temperatureControl,
  atmosphereControl, fuelCostPerFiring, outdoorRequired,
  reduction, bestGlazeType, setupCost, kilnTypes,
} from "../kiln-type-calc.js";

describe("maxTempCelsius", () => {
  it("wood fired reaches highest temp", () => {
    expect(maxTempCelsius("wood_fired")).toBeGreaterThan(
      maxTempCelsius("pit_firing")
    );
  });
});

describe("firingHours", () => {
  it("wood fired takes longest", () => {
    expect(firingHours("wood_fired")).toBeGreaterThan(
      firingHours("electric")
    );
  });
});

describe("temperatureControl", () => {
  it("electric has best control", () => {
    expect(temperatureControl("electric")).toBeGreaterThan(
      temperatureControl("pit_firing")
    );
  });
});

describe("atmosphereControl", () => {
  it("gas reduction has best atmosphere control", () => {
    expect(atmosphereControl("gas_reduction")).toBeGreaterThan(
      atmosphereControl("electric")
    );
  });
});

describe("fuelCostPerFiring", () => {
  it("gas reduction costs most per firing", () => {
    expect(fuelCostPerFiring("gas_reduction")).toBeGreaterThan(
      fuelCostPerFiring("pit_firing")
    );
  });
});

describe("outdoorRequired", () => {
  it("wood fired requires outdoors", () => {
    expect(outdoorRequired("wood_fired")).toBe(true);
  });
  it("electric does not", () => {
    expect(outdoorRequired("electric")).toBe(false);
  });
});

describe("reduction", () => {
  it("gas reduction fires in reduction", () => {
    expect(reduction("gas_reduction")).toBe(true);
  });
  it("electric does not", () => {
    expect(reduction("electric")).toBe(false);
  });
});

describe("bestGlazeType", () => {
  it("wood fired best with ash glaze", () => {
    expect(bestGlazeType("wood_fired")).toBe("ash_glaze");
  });
});

describe("setupCost", () => {
  it("wood fired costs most to set up", () => {
    expect(setupCost("wood_fired")).toBeGreaterThan(
      setupCost("electric")
    );
  });
});

describe("kilnTypes", () => {
  it("returns 5 types", () => {
    expect(kilnTypes()).toHaveLength(5);
  });
});
