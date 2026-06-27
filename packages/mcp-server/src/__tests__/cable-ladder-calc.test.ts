import { describe, it, expect } from "vitest";
import {
  loadCapacity, corrosionResist, installEase, ventilation,
  ladderCost, conductive, forOutdoor, material,
  bestUse, cableLadders,
} from "../cable-ladder-calc.js";

describe("loadCapacity", () => {
  it("steel hot dip galv highest load", () => {
    expect(loadCapacity("steel_hot_dip_galv")).toBeGreaterThan(loadCapacity("wire_mesh_basket"));
  });
});

describe("corrosionResist", () => {
  it("fiberglass frp best corrosion resist", () => {
    expect(corrosionResist("fiberglass_frp_corr")).toBeGreaterThan(corrosionResist("wire_mesh_basket"));
  });
});

describe("installEase", () => {
  it("wire mesh basket easiest install", () => {
    expect(installEase("wire_mesh_basket")).toBeGreaterThan(installEase("steel_hot_dip_galv"));
  });
});

describe("ventilation", () => {
  it("wire mesh basket best ventilation", () => {
    expect(ventilation("wire_mesh_basket")).toBeGreaterThan(ventilation("steel_hot_dip_galv"));
  });
});

describe("ladderCost", () => {
  it("stainless food grade most expensive", () => {
    expect(ladderCost("stainless_food_grade")).toBeGreaterThan(ladderCost("wire_mesh_basket"));
  });
});

describe("conductive", () => {
  it("steel hot dip galv is conductive", () => {
    expect(conductive("steel_hot_dip_galv")).toBe(true);
  });
  it("fiberglass frp not conductive", () => {
    expect(conductive("fiberglass_frp_corr")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("aluminum lightweight is for outdoor", () => {
    expect(forOutdoor("aluminum_lightweight")).toBe(true);
  });
  it("wire mesh basket not for outdoor", () => {
    expect(forOutdoor("wire_mesh_basket")).toBe(false);
  });
});

describe("material", () => {
  it("stainless food grade uses stainless 316 polished", () => {
    expect(material("stainless_food_grade")).toBe("stainless_316_polished");
  });
});

describe("bestUse", () => {
  it("wire mesh basket best for office ceiling data run", () => {
    expect(bestUse("wire_mesh_basket")).toBe("office_ceiling_data_run");
  });
});

describe("cableLadders", () => {
  it("returns 5 types", () => {
    expect(cableLadders()).toHaveLength(5);
  });
});
