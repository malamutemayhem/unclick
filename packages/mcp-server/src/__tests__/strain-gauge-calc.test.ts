import { describe, it, expect } from "vitest";
import {
  gaugeFactor, accuracy, fatigue, tempComp,
  sgCost, wireless, forStructural, material,
  bestUse, strainGauges,
} from "../strain-gauge-calc.js";

describe("gaugeFactor", () => {
  it("semiconductor piezo highest gauge factor", () => {
    expect(gaugeFactor("semiconductor_piezo")).toBeGreaterThan(gaugeFactor("foil_metallic"));
  });
});

describe("accuracy", () => {
  it("thin film sputter most accurate", () => {
    expect(accuracy("thin_film_sputter")).toBeGreaterThan(accuracy("semiconductor_piezo"));
  });
});

describe("fatigue", () => {
  it("thin film sputter best fatigue life", () => {
    expect(fatigue("thin_film_sputter")).toBeGreaterThan(fatigue("semiconductor_piezo"));
  });
});

describe("tempComp", () => {
  it("thin film sputter best temp compensation", () => {
    expect(tempComp("thin_film_sputter")).toBeGreaterThan(tempComp("semiconductor_piezo"));
  });
});

describe("sgCost", () => {
  it("fiber bragg grating most expensive", () => {
    expect(sgCost("fiber_bragg_grating")).toBeGreaterThan(sgCost("foil_metallic"));
  });
});

describe("wireless", () => {
  it("vibrating wire is wireless", () => {
    expect(wireless("vibrating_wire")).toBe(true);
  });
  it("foil metallic not wireless", () => {
    expect(wireless("foil_metallic")).toBe(false);
  });
});

describe("forStructural", () => {
  it("foil metallic for structural", () => {
    expect(forStructural("foil_metallic")).toBe(true);
  });
  it("semiconductor piezo not for structural", () => {
    expect(forStructural("semiconductor_piezo")).toBe(false);
  });
});

describe("material", () => {
  it("vibrating wire uses tensioned steel wire", () => {
    expect(material("vibrating_wire")).toBe("tensioned_steel_wire");
  });
});

describe("bestUse", () => {
  it("fiber bragg grating best for bridge dam shm monitor", () => {
    expect(bestUse("fiber_bragg_grating")).toBe("bridge_dam_shm_monitor");
  });
});

describe("strainGauges", () => {
  it("returns 5 types", () => {
    expect(strainGauges()).toHaveLength(5);
  });
});
