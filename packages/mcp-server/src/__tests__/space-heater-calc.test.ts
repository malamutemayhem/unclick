import { describe, it, expect } from "vitest";
import {
  heatOutput, energyEfficiency, noiseLevel, portability,
  heaterCost, tipOverShutoff, wallMountable, heatMethod,
  bestRoom, spaceHeaters,
} from "../space-heater-calc.js";

describe("heatOutput", () => {
  it("oil filled radiator highest heat output", () => {
    expect(heatOutput("oil_filled_radiator")).toBeGreaterThan(heatOutput("mica_panel_flat"));
  });
});

describe("energyEfficiency", () => {
  it("infrared quartz most energy efficient", () => {
    expect(energyEfficiency("infrared_quartz")).toBeGreaterThan(energyEfficiency("fan_forced_compact"));
  });
});

describe("noiseLevel", () => {
  it("oil filled radiator quietest", () => {
    expect(noiseLevel("oil_filled_radiator")).toBeGreaterThan(noiseLevel("fan_forced_compact"));
  });
});

describe("portability", () => {
  it("fan forced compact most portable", () => {
    expect(portability("fan_forced_compact")).toBeGreaterThan(portability("oil_filled_radiator"));
  });
});

describe("heaterCost", () => {
  it("infrared quartz most expensive", () => {
    expect(heaterCost("infrared_quartz")).toBeGreaterThan(heaterCost("fan_forced_compact"));
  });
});

describe("tipOverShutoff", () => {
  it("ceramic tower has tip over shutoff", () => {
    expect(tipOverShutoff("ceramic_tower")).toBe(true);
  });
  it("mica panel flat does not", () => {
    expect(tipOverShutoff("mica_panel_flat")).toBe(false);
  });
});

describe("wallMountable", () => {
  it("infrared quartz is wall mountable", () => {
    expect(wallMountable("infrared_quartz")).toBe(true);
  });
  it("ceramic tower is not", () => {
    expect(wallMountable("ceramic_tower")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("oil filled radiator uses diathermic oil convection", () => {
    expect(heatMethod("oil_filled_radiator")).toBe("diathermic_oil_convection");
  });
});

describe("bestRoom", () => {
  it("oil filled radiator best for bedroom overnight quiet", () => {
    expect(bestRoom("oil_filled_radiator")).toBe("bedroom_overnight_quiet");
  });
});

describe("spaceHeaters", () => {
  it("returns 5 types", () => {
    expect(spaceHeaters()).toHaveLength(5);
  });
});
