import { describe, it, expect } from "vitest";
import {
  dose, efficiency, lifespan, footprint,
  uvCost, led, forDrinking, lamp,
  bestUse, uvDisinfectTypes,
} from "../uv-disinfect-calc.js";

describe("dose", () => {
  it("medium pressure highest dose", () => {
    expect(dose("medium_pressure_mp_polychrome")).toBeGreaterThan(dose("uv_led_solid_state"));
  });
});

describe("efficiency", () => {
  it("low pressure most efficient", () => {
    expect(efficiency("low_pressure_lp_monochrome")).toBeGreaterThan(efficiency("medium_pressure_mp_polychrome"));
  });
});

describe("lifespan", () => {
  it("led longest lifespan", () => {
    expect(lifespan("uv_led_solid_state")).toBeGreaterThan(lifespan("medium_pressure_mp_polychrome"));
  });
});

describe("footprint", () => {
  it("led smallest footprint", () => {
    expect(footprint("uv_led_solid_state")).toBeGreaterThan(footprint("low_pressure_lp_monochrome"));
  });
});

describe("uvCost", () => {
  it("led most expensive", () => {
    expect(uvCost("uv_led_solid_state")).toBeGreaterThan(uvCost("low_pressure_lp_monochrome"));
  });
});

describe("led", () => {
  it("uv led is led", () => {
    expect(led("uv_led_solid_state")).toBe(true);
  });
  it("low pressure not led", () => {
    expect(led("low_pressure_lp_monochrome")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("low pressure for drinking", () => {
    expect(forDrinking("low_pressure_lp_monochrome")).toBe(true);
  });
  it("led not for drinking", () => {
    expect(forDrinking("uv_led_solid_state")).toBe(false);
  });
});

describe("lamp", () => {
  it("led uses led chip 265nm", () => {
    expect(lamp("uv_led_solid_state")).toBe("led_chip_265nm_solid_state");
  });
});

describe("bestUse", () => {
  it("medium pressure for large flow wastewater", () => {
    expect(bestUse("medium_pressure_mp_polychrome")).toBe("large_flow_wastewater_chloramine_break");
  });
});

describe("uvDisinfectTypes", () => {
  it("returns 5 types", () => {
    expect(uvDisinfectTypes()).toHaveLength(5);
  });
});
