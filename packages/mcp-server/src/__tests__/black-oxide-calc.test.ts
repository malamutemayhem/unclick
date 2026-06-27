import { describe, it, expect } from "vitest";
import {
  corrosionProtection, adhesion, dimensionalChange, appearance,
  boCost, oilRequired, forFasteners, process,
  bestUse, blackOxideTypes,
} from "../black-oxide-calc.js";

describe("corrosionProtection", () => {
  it("hot alkaline best corrosion protection", () => {
    expect(corrosionProtection("hot_alkaline")).toBeGreaterThan(corrosionProtection("room_temperature"));
  });
});

describe("adhesion", () => {
  it("hot alkaline best adhesion", () => {
    expect(adhesion("hot_alkaline")).toBeGreaterThan(adhesion("room_temperature"));
  });
});

describe("dimensionalChange", () => {
  it("room temperature least dimensional change", () => {
    expect(dimensionalChange("room_temperature")).toBeGreaterThan(dimensionalChange("hot_alkaline"));
  });
});

describe("appearance", () => {
  it("hot alkaline best appearance", () => {
    expect(appearance("hot_alkaline")).toBeGreaterThan(appearance("room_temperature"));
  });
});

describe("boCost", () => {
  it("hot acid most expensive", () => {
    expect(boCost("hot_acid")).toBeGreaterThan(boCost("room_temperature"));
  });
});

describe("oilRequired", () => {
  it("hot alkaline requires oil", () => {
    expect(oilRequired("hot_alkaline")).toBe(true);
  });
  it("steam oxide no oil required", () => {
    expect(oilRequired("steam_oxide")).toBe(false);
  });
});

describe("forFasteners", () => {
  it("hot alkaline for fasteners", () => {
    expect(forFasteners("hot_alkaline")).toBe(true);
  });
  it("room temperature not for fasteners", () => {
    expect(forFasteners("room_temperature")).toBe(false);
  });
});

describe("process", () => {
  it("steam oxide uses superheated steam", () => {
    expect(process("steam_oxide")).toBe("superheated_steam_540c_furnace_thick_fe3o4_powder_metal_seal");
  });
});

describe("bestUse", () => {
  it("hot acid for stainless steel surgical", () => {
    expect(bestUse("hot_acid")).toBe("stainless_steel_black_finish_surgical_instrument_marine");
  });
});

describe("blackOxideTypes", () => {
  it("returns 5 types", () => {
    expect(blackOxideTypes()).toHaveLength(5);
  });
});
