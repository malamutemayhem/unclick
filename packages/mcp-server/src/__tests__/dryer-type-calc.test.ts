import { describe, it, expect } from "vitest";
import {
  dryingSpeed, energyEfficiency, operatingCost, purchasePrice,
  fabricCare, requiresVentDuct, requiresGasLine, heatSource,
  bestInstallation, dryerTypes,
} from "../dryer-type-calc.js";

describe("dryingSpeed", () => {
  it("vented gas fastest drying", () => {
    expect(dryingSpeed("vented_gas")).toBeGreaterThan(dryingSpeed("heat_pump"));
  });
});

describe("energyEfficiency", () => {
  it("heat pump most efficient", () => {
    expect(energyEfficiency("heat_pump")).toBeGreaterThan(energyEfficiency("vented_electric"));
  });
});

describe("operatingCost", () => {
  it("vented electric highest operating cost", () => {
    expect(operatingCost("vented_electric")).toBeGreaterThan(operatingCost("heat_pump"));
  });
});

describe("purchasePrice", () => {
  it("heat pump most expensive", () => {
    expect(purchasePrice("heat_pump")).toBeGreaterThan(purchasePrice("vented_electric"));
  });
});

describe("fabricCare", () => {
  it("heat pump best fabric care", () => {
    expect(fabricCare("heat_pump")).toBeGreaterThan(fabricCare("vented_electric"));
  });
});

describe("requiresVentDuct", () => {
  it("vented electric requires vent", () => {
    expect(requiresVentDuct("vented_electric")).toBe(true);
  });
  it("heat pump does not", () => {
    expect(requiresVentDuct("heat_pump")).toBe(false);
  });
});

describe("requiresGasLine", () => {
  it("vented gas requires gas line", () => {
    expect(requiresGasLine("vented_gas")).toBe(true);
  });
  it("vented electric does not", () => {
    expect(requiresGasLine("vented_electric")).toBe(false);
  });
});

describe("heatSource", () => {
  it("heat pump uses refrigerant cycle", () => {
    expect(heatSource("heat_pump")).toBe("refrigerant_cycle_low_temp");
  });
});

describe("bestInstallation", () => {
  it("condenser for apartment", () => {
    expect(bestInstallation("condenser")).toBe("apartment_no_vent_access");
  });
});

describe("dryerTypes", () => {
  it("returns 5 types", () => {
    expect(dryerTypes()).toHaveLength(5);
  });
});
