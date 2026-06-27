import { describe, it, expect } from "vitest";
import {
  formability, precision, strength, complexity,
  hfCost, tubular, forAuto, medium,
  bestUse, hydroFormTypes,
} from "../hydro-form-calc.js";

describe("formability", () => {
  it("warm hydro and end feed highest formability", () => {
    expect(formability("warm_hydro_alloy")).toBeGreaterThan(formability("sheet_hydro_punch"));
  });
});

describe("precision", () => {
  it("active hydro die most precise", () => {
    expect(precision("active_hydro_die")).toBeGreaterThan(precision("warm_hydro_alloy"));
  });
});

describe("strength", () => {
  it("end feed highest strength", () => {
    expect(strength("tube_hydro_end_feed")).toBeGreaterThan(strength("sheet_hydro_punch"));
  });
});

describe("complexity", () => {
  it("active hydro die most complex", () => {
    expect(complexity("active_hydro_die")).toBeGreaterThan(complexity("sheet_hydro_punch"));
  });
});

describe("hfCost", () => {
  it("warm hydro most expensive", () => {
    expect(hfCost("warm_hydro_alloy")).toBeGreaterThan(hfCost("sheet_hydro_punch"));
  });
});

describe("tubular", () => {
  it("tube hydro axial is tubular", () => {
    expect(tubular("tube_hydro_axial")).toBe(true);
  });
  it("sheet hydro not tubular", () => {
    expect(tubular("sheet_hydro_punch")).toBe(false);
  });
});

describe("forAuto", () => {
  it("tube hydro for automotive", () => {
    expect(forAuto("tube_hydro_axial")).toBe(true);
  });
  it("warm hydro not for auto", () => {
    expect(forAuto("warm_hydro_alloy")).toBe(false);
  });
});

describe("medium", () => {
  it("tube hydro axial uses water glycol", () => {
    expect(medium("tube_hydro_axial")).toBe("water_glycol_internal_pressure_seal");
  });
});

describe("bestUse", () => {
  it("warm hydro for aluminum magnesium", () => {
    expect(bestUse("warm_hydro_alloy")).toBe("aluminum_magnesium_lightweight_part");
  });
});

describe("hydroFormTypes", () => {
  it("returns 5 types", () => {
    expect(hydroFormTypes()).toHaveLength(5);
  });
});
