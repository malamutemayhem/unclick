import { describe, it, expect } from "vitest";
import {
  efficiency, throughput, pressureRise, turndown,
  tbCost, oilFree, forWwtp, blowerConfig,
  bestUse, turboBlowerTypes,
} from "../turbo-blower-calc.js";

describe("efficiency", () => {
  it("magnetic bearing best efficiency", () => {
    expect(efficiency("magnetic_bearing")).toBeGreaterThan(efficiency("centrifugal_turbo"));
  });
});

describe("throughput", () => {
  it("integrally geared highest throughput", () => {
    expect(throughput("integrally_geared")).toBeGreaterThan(throughput("air_foil_bearing"));
  });
});

describe("pressureRise", () => {
  it("integrally geared best pressure rise", () => {
    expect(pressureRise("integrally_geared")).toBeGreaterThan(pressureRise("centrifugal_turbo"));
  });
});

describe("turndown", () => {
  it("magnetic bearing best turndown", () => {
    expect(turndown("magnetic_bearing")).toBeGreaterThan(turndown("centrifugal_turbo"));
  });
});

describe("tbCost", () => {
  it("magnetic bearing most expensive", () => {
    expect(tbCost("magnetic_bearing")).toBeGreaterThan(tbCost("centrifugal_turbo"));
  });
});

describe("oilFree", () => {
  it("magnetic bearing is oil free", () => {
    expect(oilFree("magnetic_bearing")).toBe(true);
  });
  it("centrifugal turbo not oil free", () => {
    expect(oilFree("centrifugal_turbo")).toBe(false);
  });
});

describe("forWwtp", () => {
  it("centrifugal turbo for wwtp", () => {
    expect(forWwtp("centrifugal_turbo")).toBe(true);
  });
  it("integrally geared not for wwtp", () => {
    expect(forWwtp("integrally_geared")).toBe(false);
  });
});

describe("blowerConfig", () => {
  it("air foil bearing uses gas film support compact light", () => {
    expect(blowerConfig("air_foil_bearing")).toBe("air_foil_bearing_turbo_blower_gas_film_support_compact_light");
  });
});

describe("bestUse", () => {
  it("magnetic bearing for clean air oil free energy save", () => {
    expect(bestUse("magnetic_bearing")).toBe("clean_air_magnetic_bearing_turbo_blower_oil_free_energy_save");
  });
});

describe("turboBlowerTypes", () => {
  it("returns 5 types", () => {
    expect(turboBlowerTypes()).toHaveLength(5);
  });
});
