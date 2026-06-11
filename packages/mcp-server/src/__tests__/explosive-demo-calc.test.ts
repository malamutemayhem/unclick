import { describe, it, expect } from "vitest";
import {
  power, precision, safety, waterResist,
  edCost, bulkLoaded, forQuarry, initiation,
  bestUse, explosiveDemoTypes,
} from "../explosive-demo-calc.js";

describe("power", () => {
  it("emulsion most powerful", () => {
    expect(power("emulsion_bulk_pump_truck")).toBeGreaterThan(power("det_cord_pentaerythritol"));
  });
});

describe("precision", () => {
  it("shaped charge most precise", () => {
    expect(precision("shaped_charge_linear_cut")).toBeGreaterThan(precision("anfo_ammonium_nitrate_fuel"));
  });
});

describe("safety", () => {
  it("emulsion safest", () => {
    expect(safety("emulsion_bulk_pump_truck")).toBeGreaterThan(safety("dynamite_nitroglycerin_stick"));
  });
});

describe("waterResist", () => {
  it("emulsion best water resistance", () => {
    expect(waterResist("emulsion_bulk_pump_truck")).toBeGreaterThan(waterResist("anfo_ammonium_nitrate_fuel"));
  });
});

describe("edCost", () => {
  it("shaped charge most expensive", () => {
    expect(edCost("shaped_charge_linear_cut")).toBeGreaterThan(edCost("anfo_ammonium_nitrate_fuel"));
  });
});

describe("bulkLoaded", () => {
  it("emulsion is bulk loaded", () => {
    expect(bulkLoaded("emulsion_bulk_pump_truck")).toBe(true);
  });
  it("dynamite not bulk loaded", () => {
    expect(bulkLoaded("dynamite_nitroglycerin_stick")).toBe(false);
  });
});

describe("forQuarry", () => {
  it("anfo for quarry", () => {
    expect(forQuarry("anfo_ammonium_nitrate_fuel")).toBe(true);
  });
  it("shaped charge not for quarry", () => {
    expect(forQuarry("shaped_charge_linear_cut")).toBe(false);
  });
});

describe("initiation", () => {
  it("shaped charge uses copper liner jet", () => {
    expect(initiation("shaped_charge_linear_cut")).toBe("copper_liner_focused_jet_cut");
  });
});

describe("bestUse", () => {
  it("emulsion for open pit mine", () => {
    expect(bestUse("emulsion_bulk_pump_truck")).toBe("open_pit_mine_bench_blast_wet_hole");
  });
});

describe("explosiveDemoTypes", () => {
  it("returns 5 types", () => {
    expect(explosiveDemoTypes()).toHaveLength(5);
  });
});
