import { describe, it, expect } from "vitest";
import {
  conductivity, thickness, pumpOut, reworkability,
  timCost, electricIsolate, forServer, material,
  bestUse, thermalInterfaces,
} from "../thermal-interface-calc.js";

describe("conductivity", () => {
  it("liquid metal best conductivity", () => {
    expect(conductivity("liquid_metal")).toBeGreaterThan(conductivity("thermal_grease"));
  });
});

describe("thickness", () => {
  it("liquid metal thinnest bondline", () => {
    expect(thickness("liquid_metal")).toBeGreaterThan(thickness("indium_foil"));
  });
});

describe("pumpOut", () => {
  it("indium foil best pump out resistance", () => {
    expect(pumpOut("indium_foil")).toBeGreaterThan(pumpOut("thermal_grease"));
  });
});

describe("reworkability", () => {
  it("thermal grease most reworkable", () => {
    expect(reworkability("thermal_grease")).toBeGreaterThan(reworkability("liquid_metal"));
  });
});

describe("timCost", () => {
  it("indium foil most expensive", () => {
    expect(timCost("indium_foil")).toBeGreaterThan(timCost("thermal_grease"));
  });
});

describe("electricIsolate", () => {
  it("none provide electric isolation", () => {
    expect(electricIsolate("thermal_grease")).toBe(false);
    expect(electricIsolate("liquid_metal")).toBe(false);
  });
});

describe("forServer", () => {
  it("phase change pad is for server", () => {
    expect(forServer("phase_change_pad")).toBe(true);
  });
  it("thermal grease not for server", () => {
    expect(forServer("thermal_grease")).toBe(false);
  });
});

describe("material", () => {
  it("liquid metal uses gallium indium tin", () => {
    expect(material("liquid_metal")).toBe("gallium_indium_tin");
  });
});

describe("bestUse", () => {
  it("liquid metal best for extreme overclock ihs", () => {
    expect(bestUse("liquid_metal")).toBe("extreme_overclock_ihs");
  });
});

describe("thermalInterfaces", () => {
  it("returns 5 types", () => {
    expect(thermalInterfaces()).toHaveLength(5);
  });
});
