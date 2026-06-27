import { describe, it, expect } from "vitest";
import {
  accuracy, range, durability, response,
  pgCost, electronic, forProcess, element,
  bestUse, pressureGaugeTypes,
} from "../pressure-gauge-calc.js";

describe("accuracy", () => {
  it("digital most accurate", () => {
    expect(accuracy("digital_electronic_sensor")).toBeGreaterThan(accuracy("bourdon_tube_c_shape"));
  });
});

describe("range", () => {
  it("digital widest range", () => {
    expect(range("digital_electronic_sensor")).toBeGreaterThan(range("capsule_low_pressure"));
  });
});

describe("durability", () => {
  it("diaphragm seal most durable", () => {
    expect(durability("diaphragm_seal_flush")).toBeGreaterThan(durability("capsule_low_pressure"));
  });
});

describe("response", () => {
  it("digital fastest response", () => {
    expect(response("digital_electronic_sensor")).toBeGreaterThan(response("bourdon_tube_c_shape"));
  });
});

describe("pgCost", () => {
  it("digital most expensive", () => {
    expect(pgCost("digital_electronic_sensor")).toBeGreaterThan(pgCost("bourdon_tube_c_shape"));
  });
});

describe("electronic", () => {
  it("digital is electronic", () => {
    expect(electronic("digital_electronic_sensor")).toBe(true);
  });
  it("bourdon not electronic", () => {
    expect(electronic("bourdon_tube_c_shape")).toBe(false);
  });
});

describe("forProcess", () => {
  it("bourdon for process", () => {
    expect(forProcess("bourdon_tube_c_shape")).toBe(true);
  });
  it("capsule not for process", () => {
    expect(forProcess("capsule_low_pressure")).toBe(false);
  });
});

describe("element", () => {
  it("capsule uses twin diaphragm", () => {
    expect(element("capsule_low_pressure")).toBe("twin_diaphragm_capsule_low_range");
  });
});

describe("bestUse", () => {
  it("bourdon for general industrial", () => {
    expect(bestUse("bourdon_tube_c_shape")).toBe("general_industrial_steam_air_water");
  });
});

describe("pressureGaugeTypes", () => {
  it("returns 5 types", () => {
    expect(pressureGaugeTypes()).toHaveLength(5);
  });
});
