import { describe, it, expect } from "vitest";
import {
  scaleRange, mixingEfficiency, oxygenTransfer, shearStress,
  brCost, singleUse, forMammalian, vessel,
  bestUse, bioreactorTypes,
} from "../bioreactor-calc.js";

describe("scaleRange", () => {
  it("stirred tank widest scale range", () => {
    expect(scaleRange("stirred_tank")).toBeGreaterThan(scaleRange("wave_bag"));
  });
});

describe("mixingEfficiency", () => {
  it("stirred tank best mixing", () => {
    expect(mixingEfficiency("stirred_tank")).toBeGreaterThan(mixingEfficiency("packed_bed"));
  });
});

describe("oxygenTransfer", () => {
  it("air lift best oxygen transfer", () => {
    expect(oxygenTransfer("air_lift")).toBeGreaterThan(oxygenTransfer("packed_bed"));
  });
});

describe("shearStress", () => {
  it("packed bed lowest shear stress", () => {
    expect(shearStress("packed_bed")).toBeGreaterThan(shearStress("stirred_tank"));
  });
});

describe("brCost", () => {
  it("single use stirred most expensive", () => {
    expect(brCost("single_use_stirred")).toBeGreaterThan(brCost("air_lift"));
  });
});

describe("singleUse", () => {
  it("wave bag is single use", () => {
    expect(singleUse("wave_bag")).toBe(true);
  });
  it("stirred tank not single use", () => {
    expect(singleUse("stirred_tank")).toBe(false);
  });
});

describe("forMammalian", () => {
  it("stirred tank for mammalian", () => {
    expect(forMammalian("stirred_tank")).toBe(true);
  });
  it("air lift not for mammalian", () => {
    expect(forMammalian("air_lift")).toBe(false);
  });
});

describe("vessel", () => {
  it("wave bag uses disposable rocking platform", () => {
    expect(vessel("wave_bag")).toBe("disposable_bag_rocking_platform_wave_motion_gentle_mix");
  });
});

describe("bestUse", () => {
  it("packed bed for adherent cell culture", () => {
    expect(bestUse("packed_bed")).toBe("adherent_cell_culture_virus_production_gene_therapy_vector");
  });
});

describe("bioreactorTypes", () => {
  it("returns 5 types", () => {
    expect(bioreactorTypes()).toHaveLength(5);
  });
});
