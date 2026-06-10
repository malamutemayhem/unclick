import { describe, it, expect } from "vitest";
import {
  lightFilter, insulation, drapeFlow, washability,
  drapeCost, machineWash, blackout, fabricWeight,
  bestRoom, drapes,
} from "../drape-calc.js";

describe("lightFilter", () => {
  it("velvet heavy blackout best light filter", () => {
    expect(lightFilter("velvet_heavy_blackout")).toBeGreaterThan(lightFilter("sheer_voile_light"));
  });
});

describe("insulation", () => {
  it("thermal insulated layer best insulation", () => {
    expect(insulation("thermal_insulated_layer")).toBeGreaterThan(insulation("sheer_voile_light"));
  });
});

describe("drapeFlow", () => {
  it("sheer voile light best flow", () => {
    expect(drapeFlow("sheer_voile_light")).toBeGreaterThan(drapeFlow("thermal_insulated_layer"));
  });
});

describe("washability", () => {
  it("sheer voile light most washable", () => {
    expect(washability("sheer_voile_light")).toBeGreaterThan(washability("velvet_heavy_blackout"));
  });
});

describe("drapeCost", () => {
  it("velvet heavy blackout most expensive", () => {
    expect(drapeCost("velvet_heavy_blackout")).toBeGreaterThan(drapeCost("sheer_voile_light"));
  });
});

describe("machineWash", () => {
  it("sheer voile light is machine washable", () => {
    expect(machineWash("sheer_voile_light")).toBe(true);
  });
  it("velvet heavy blackout is not machine washable", () => {
    expect(machineWash("velvet_heavy_blackout")).toBe(false);
  });
});

describe("blackout", () => {
  it("velvet heavy blackout is blackout", () => {
    expect(blackout("velvet_heavy_blackout")).toBe(true);
  });
  it("sheer voile light is not blackout", () => {
    expect(blackout("sheer_voile_light")).toBe(false);
  });
});

describe("fabricWeight", () => {
  it("velvet heavy blackout uses velvet triple weave heavy", () => {
    expect(fabricWeight("velvet_heavy_blackout")).toBe("velvet_triple_weave_heavy");
  });
});

describe("bestRoom", () => {
  it("thermal insulated layer best for cold climate energy save", () => {
    expect(bestRoom("thermal_insulated_layer")).toBe("cold_climate_energy_save");
  });
});

describe("drapes", () => {
  it("returns 5 types", () => {
    expect(drapes()).toHaveLength(5);
  });
});
