import { describe, it, expect } from "vitest";
import {
  reliability, pressure, speed, temperature,
  msCost, apiPlan, forHazardous, face,
  bestUse, mechanicalSealTypes,
} from "../mechanical-seal-calc.js";

describe("reliability", () => {
  it("double pressurized most reliable", () => {
    expect(reliability("double_pressurized_tandem")).toBeGreaterThan(reliability("single_unbalanced_pusher"));
  });
});

describe("pressure", () => {
  it("gas seal highest pressure", () => {
    expect(pressure("gas_seal_dry_running")).toBeGreaterThan(pressure("single_unbalanced_pusher"));
  });
});

describe("speed", () => {
  it("gas seal highest speed", () => {
    expect(speed("gas_seal_dry_running")).toBeGreaterThan(speed("split_seal_retrofit"));
  });
});

describe("temperature", () => {
  it("double pressurized high temperature", () => {
    expect(temperature("double_pressurized_tandem")).toBeGreaterThan(temperature("single_unbalanced_pusher"));
  });
});

describe("msCost", () => {
  it("gas seal most expensive", () => {
    expect(msCost("gas_seal_dry_running")).toBeGreaterThan(msCost("single_unbalanced_pusher"));
  });
});

describe("apiPlan", () => {
  it("cartridge is API plan", () => {
    expect(apiPlan("cartridge_preassembled")).toBe(true);
  });
  it("split seal not API plan", () => {
    expect(apiPlan("split_seal_retrofit")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("double pressurized for hazardous", () => {
    expect(forHazardous("double_pressurized_tandem")).toBe(true);
  });
  it("single unbalanced not for hazardous", () => {
    expect(forHazardous("single_unbalanced_pusher")).toBe(false);
  });
});

describe("face", () => {
  it("gas seal uses spiral groove non-contacting", () => {
    expect(face("gas_seal_dry_running")).toBe("spiral_groove_non_contacting");
  });
});

describe("bestUse", () => {
  it("cartridge for refinery easy install", () => {
    expect(bestUse("cartridge_preassembled")).toBe("refinery_chemical_easy_install");
  });
});

describe("mechanicalSealTypes", () => {
  it("returns 5 types", () => {
    expect(mechanicalSealTypes()).toHaveLength(5);
  });
});
