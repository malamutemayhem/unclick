import { describe, it, expect } from "vitest";
import {
  disinfectionRate, throughput, energyEfficiency, lampLife,
  udCost, chemical, forDrinking, disinfectorConfig,
  bestUse, uvDisinfectorTypes,
} from "../uv-disinfector-calc.js";

describe("disinfectionRate", () => {
  it("medium pressure best disinfection rate", () => {
    expect(disinfectionRate("medium_pressure")).toBeGreaterThan(disinfectionRate("led_uv"));
  });
});

describe("throughput", () => {
  it("open channel highest throughput", () => {
    expect(throughput("open_channel")).toBeGreaterThan(throughput("led_uv"));
  });
});

describe("energyEfficiency", () => {
  it("amalgam lamp best energy efficiency", () => {
    expect(energyEfficiency("amalgam_lamp")).toBeGreaterThan(energyEfficiency("medium_pressure"));
  });
});

describe("lampLife", () => {
  it("amalgam lamp longest lamp life", () => {
    expect(lampLife("amalgam_lamp")).toBeGreaterThan(lampLife("medium_pressure"));
  });
});

describe("udCost", () => {
  it("open channel most expensive", () => {
    expect(udCost("open_channel")).toBeGreaterThan(udCost("low_pressure"));
  });
});

describe("chemical", () => {
  it("no uv type uses chemicals", () => {
    expect(chemical("low_pressure")).toBe(false);
  });
  it("led uv also chemical free", () => {
    expect(chemical("led_uv")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("low pressure for drinking water", () => {
    expect(forDrinking("low_pressure")).toBe(true);
  });
  it("open channel not for drinking", () => {
    expect(forDrinking("open_channel")).toBe(false);
  });
});

describe("disinfectorConfig", () => {
  it("led uv uses solid state compact instant on 265nm", () => {
    expect(disinfectorConfig("led_uv")).toBe("led_uv_disinfector_solid_state_compact_instant_on_265nm");
  });
});

describe("bestUse", () => {
  it("amalgam lamp for water utility long life high output efficient", () => {
    expect(bestUse("amalgam_lamp")).toBe("water_utility_amalgam_uv_lamp_long_life_high_output_efficient");
  });
});

describe("uvDisinfectorTypes", () => {
  it("returns 5 types", () => {
    expect(uvDisinfectorTypes()).toHaveLength(5);
  });
});
