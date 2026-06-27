import { describe, it, expect } from "vitest";
import {
  heatingRadius, windResistance, energyEfficiency, visualAppeal,
  heaterCost, needsVentilation, tipOverSafe, heatSource,
  bestPatio, patioHeaters,
} from "../patio-heater-calc.js";

describe("heatingRadius", () => {
  it("mushroom propane widest radius", () => {
    expect(heatingRadius("mushroom_propane")).toBeGreaterThan(heatingRadius("tabletop_portable"));
  });
});

describe("windResistance", () => {
  it("wall mount radiant best wind resistance", () => {
    expect(windResistance("wall_mount_radiant")).toBeGreaterThan(windResistance("pyramid_flame"));
  });
});

describe("energyEfficiency", () => {
  it("infrared electric most efficient", () => {
    expect(energyEfficiency("infrared_electric")).toBeGreaterThan(energyEfficiency("pyramid_flame"));
  });
});

describe("visualAppeal", () => {
  it("pyramid flame most visually appealing", () => {
    expect(visualAppeal("pyramid_flame")).toBeGreaterThan(visualAppeal("wall_mount_radiant"));
  });
});

describe("heaterCost", () => {
  it("pyramid flame most expensive", () => {
    expect(heaterCost("pyramid_flame")).toBeGreaterThan(heaterCost("tabletop_portable"));
  });
});

describe("needsVentilation", () => {
  it("mushroom propane needs ventilation", () => {
    expect(needsVentilation("mushroom_propane")).toBe(true);
  });
  it("infrared electric does not", () => {
    expect(needsVentilation("infrared_electric")).toBe(false);
  });
});

describe("tipOverSafe", () => {
  it("mushroom propane is tip over safe", () => {
    expect(tipOverSafe("mushroom_propane")).toBe(true);
  });
  it("tabletop portable is also tip over safe", () => {
    expect(tipOverSafe("tabletop_portable")).toBe(true);
  });
});

describe("heatSource", () => {
  it("pyramid flame uses quartz tube open flame", () => {
    expect(heatSource("pyramid_flame")).toBe("quartz_tube_open_flame");
  });
});

describe("bestPatio", () => {
  it("infrared electric for covered porch garage", () => {
    expect(bestPatio("infrared_electric")).toBe("covered_porch_garage");
  });
});

describe("patioHeaters", () => {
  it("returns 5 types", () => {
    expect(patioHeaters()).toHaveLength(5);
  });
});
