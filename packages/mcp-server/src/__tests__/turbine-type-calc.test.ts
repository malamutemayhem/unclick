import { describe, it, expect } from "vitest";
import {
  efficiency, power, startupTime, life,
  tbCost, renewable, forBaseload, working,
  bestUse, turbineTypes,
} from "../turbine-type-calc.js";

describe("efficiency", () => {
  it("hydro francis most efficient", () => {
    expect(efficiency("hydro_francis_reaction")).toBeGreaterThan(efficiency("organic_rankine_orc"));
  });
});

describe("power", () => {
  it("steam rankine highest power", () => {
    expect(power("steam_rankine_condensing")).toBeGreaterThan(power("organic_rankine_orc"));
  });
});

describe("startupTime", () => {
  it("gas open cycle fastest startup", () => {
    expect(startupTime("gas_open_cycle_brayton")).toBeGreaterThan(startupTime("steam_rankine_condensing"));
  });
});

describe("life", () => {
  it("hydro francis longest life", () => {
    expect(life("hydro_francis_reaction")).toBeGreaterThan(life("gas_open_cycle_brayton"));
  });
});

describe("tbCost", () => {
  it("steam rankine most expensive", () => {
    expect(tbCost("steam_rankine_condensing")).toBeGreaterThan(tbCost("organic_rankine_orc"));
  });
});

describe("renewable", () => {
  it("hydro francis is renewable", () => {
    expect(renewable("hydro_francis_reaction")).toBe(true);
  });
  it("gas open cycle not renewable", () => {
    expect(renewable("gas_open_cycle_brayton")).toBe(false);
  });
});

describe("forBaseload", () => {
  it("steam rankine for baseload", () => {
    expect(forBaseload("steam_rankine_condensing")).toBe(true);
  });
  it("gas open cycle not for baseload", () => {
    expect(forBaseload("gas_open_cycle_brayton")).toBe(false);
  });
});

describe("working", () => {
  it("organic rankine uses low boil organic fluid", () => {
    expect(working("organic_rankine_orc")).toBe("low_boil_organic_fluid");
  });
});

describe("bestUse", () => {
  it("gas open cycle best for peaker plant", () => {
    expect(bestUse("gas_open_cycle_brayton")).toBe("peaker_plant_fast_dispatch");
  });
});

describe("turbineTypes", () => {
  it("returns 5 types", () => {
    expect(turbineTypes()).toHaveLength(5);
  });
});
