import { describe, it, expect } from "vitest";
import {
  maxRpm, sampleCapacity, temperatureControl, purchaseCost,
  footprint, vacuumSealed, portableUnit, rotorType,
  bestApplication, centrifugeTypes,
} from "../centrifuge-type-calc.js";

describe("maxRpm", () => {
  it("ultracentrifuge highest rpm", () => {
    expect(maxRpm("ultracentrifuge")).toBeGreaterThan(maxRpm("benchtop"));
  });
});

describe("sampleCapacity", () => {
  it("floor standing largest capacity", () => {
    expect(sampleCapacity("floor_standing")).toBeGreaterThan(sampleCapacity("microcentrifuge"));
  });
});

describe("temperatureControl", () => {
  it("refrigerated best temperature control", () => {
    expect(temperatureControl("refrigerated")).toBeGreaterThan(temperatureControl("benchtop"));
  });
});

describe("purchaseCost", () => {
  it("ultracentrifuge most expensive", () => {
    expect(purchaseCost("ultracentrifuge")).toBeGreaterThan(purchaseCost("microcentrifuge"));
  });
});

describe("footprint", () => {
  it("floor standing largest footprint", () => {
    expect(footprint("floor_standing")).toBeGreaterThan(footprint("microcentrifuge"));
  });
});

describe("vacuumSealed", () => {
  it("ultracentrifuge is vacuum sealed", () => {
    expect(vacuumSealed("ultracentrifuge")).toBe(true);
  });
  it("benchtop is not", () => {
    expect(vacuumSealed("benchtop")).toBe(false);
  });
});

describe("portableUnit", () => {
  it("microcentrifuge is portable", () => {
    expect(portableUnit("microcentrifuge")).toBe(true);
  });
  it("floor standing is not", () => {
    expect(portableUnit("floor_standing")).toBe(false);
  });
});

describe("rotorType", () => {
  it("ultracentrifuge uses titanium fixed angle", () => {
    expect(rotorType("ultracentrifuge")).toBe("titanium_fixed_angle");
  });
});

describe("bestApplication", () => {
  it("microcentrifuge for pcr tube quick spin", () => {
    expect(bestApplication("microcentrifuge")).toBe("pcr_tube_quick_spin");
  });
});

describe("centrifugeTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugeTypes()).toHaveLength(5);
  });
});
