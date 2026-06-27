import { describe, it, expect } from "vitest";
import {
  protection, flexibility, corrosion, pullEase,
  cdCost, metallic, forOutdoor, fitting,
  bestUse, conduitTypeTypes,
} from "../conduit-type-calc.js";

describe("protection", () => {
  it("rigid galvanized best protection", () => {
    expect(protection("rigid_galvanized_heavy")).toBeGreaterThan(protection("flexible_metal_fmc_spiral"));
  });
});

describe("flexibility", () => {
  it("fmc most flexible", () => {
    expect(flexibility("flexible_metal_fmc_spiral")).toBeGreaterThan(flexibility("rigid_galvanized_heavy"));
  });
});

describe("corrosion", () => {
  it("pvc best corrosion resistance", () => {
    expect(corrosion("pvc_schedule_40_plastic")).toBeGreaterThan(corrosion("flexible_metal_fmc_spiral"));
  });
});

describe("pullEase", () => {
  it("pvc easiest pull", () => {
    expect(pullEase("pvc_schedule_40_plastic")).toBeGreaterThan(pullEase("rigid_galvanized_heavy"));
  });
});

describe("cdCost", () => {
  it("rigid most expensive", () => {
    expect(cdCost("rigid_galvanized_heavy")).toBeGreaterThan(cdCost("pvc_schedule_40_plastic"));
  });
});

describe("metallic", () => {
  it("emt is metallic", () => {
    expect(metallic("emt_thin_wall_steel")).toBe(true);
  });
  it("pvc not metallic", () => {
    expect(metallic("pvc_schedule_40_plastic")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("rigid for outdoor", () => {
    expect(forOutdoor("rigid_galvanized_heavy")).toBe(true);
  });
  it("emt not for outdoor", () => {
    expect(forOutdoor("emt_thin_wall_steel")).toBe(false);
  });
});

describe("fitting", () => {
  it("pvc uses solvent weld", () => {
    expect(fitting("pvc_schedule_40_plastic")).toBe("solvent_weld_glue_coupling");
  });
});

describe("bestUse", () => {
  it("rigid for hazardous location", () => {
    expect(bestUse("rigid_galvanized_heavy")).toBe("outdoor_exposed_hazardous_location");
  });
});

describe("conduitTypeTypes", () => {
  it("returns 5 types", () => {
    expect(conduitTypeTypes()).toHaveLength(5);
  });
});
