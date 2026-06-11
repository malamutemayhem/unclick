import { describe, it, expect } from "vitest";
import {
  energyDensity, thermal, packability, structural,
  cellCost, tabless, forEv, form,
  bestUse, cellFormats,
} from "../cell-format-calc.js";

describe("energyDensity", () => {
  it("pouch laminate highest energy density", () => {
    expect(energyDensity("pouch_laminate")).toBeGreaterThan(energyDensity("coin_button"));
  });
});

describe("thermal", () => {
  it("coin button best thermal", () => {
    expect(thermal("coin_button")).toBeGreaterThan(thermal("pouch_laminate"));
  });
});

describe("packability", () => {
  it("prismatic blade best packability", () => {
    expect(packability("prismatic_blade")).toBeGreaterThan(packability("coin_button"));
  });
});

describe("structural", () => {
  it("coin button best structural", () => {
    expect(structural("coin_button")).toBeGreaterThan(structural("pouch_laminate"));
  });
});

describe("cellCost", () => {
  it("pouch laminate most expensive", () => {
    expect(cellCost("pouch_laminate")).toBeGreaterThan(cellCost("coin_button"));
  });
});

describe("tabless", () => {
  it("cylindrical 4680 is tabless", () => {
    expect(tabless("cylindrical_4680")).toBe(true);
  });
  it("cylindrical 18650 not tabless", () => {
    expect(tabless("cylindrical_18650")).toBe(false);
  });
});

describe("forEv", () => {
  it("cylindrical 4680 for ev", () => {
    expect(forEv("cylindrical_4680")).toBe(true);
  });
  it("coin button not for ev", () => {
    expect(forEv("coin_button")).toBe(false);
  });
});

describe("form", () => {
  it("cylindrical 4680 uses large format tabless roll", () => {
    expect(form("cylindrical_4680")).toBe("large_format_tabless_roll");
  });
});

describe("bestUse", () => {
  it("prismatic blade best for cell to pack ctp bus", () => {
    expect(bestUse("prismatic_blade")).toBe("cell_to_pack_ctp_bus");
  });
});

describe("cellFormats", () => {
  it("returns 5 types", () => {
    expect(cellFormats()).toHaveLength(5);
  });
});
