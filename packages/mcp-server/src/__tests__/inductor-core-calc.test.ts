import { describe, it, expect } from "vitest";
import {
  permeability, saturation, coreLoss, frequency,
  indCost, lowProfile, forEmc, material,
  bestUse, inductorCores,
} from "../inductor-core-calc.js";

describe("permeability", () => {
  it("nanocrystalline highest permeability", () => {
    expect(permeability("nanocrystalline")).toBeGreaterThan(permeability("air_core_pcb"));
  });
});

describe("saturation", () => {
  it("air core pcb highest saturation", () => {
    expect(saturation("air_core_pcb")).toBeGreaterThan(saturation("ferrite_mnzn"));
  });
});

describe("coreLoss", () => {
  it("nanocrystalline lowest core loss", () => {
    expect(coreLoss("nanocrystalline")).toBeGreaterThan(coreLoss("iron_powder"));
  });
});

describe("frequency", () => {
  it("air core pcb highest frequency", () => {
    expect(frequency("air_core_pcb")).toBeGreaterThan(frequency("iron_powder"));
  });
});

describe("indCost", () => {
  it("nanocrystalline most expensive", () => {
    expect(indCost("nanocrystalline")).toBeGreaterThan(indCost("air_core_pcb"));
  });
});

describe("lowProfile", () => {
  it("air core pcb is low profile", () => {
    expect(lowProfile("air_core_pcb")).toBe(true);
  });
  it("ferrite mnzn not low profile", () => {
    expect(lowProfile("ferrite_mnzn")).toBe(false);
  });
});

describe("forEmc", () => {
  it("nanocrystalline for emc", () => {
    expect(forEmc("nanocrystalline")).toBe(true);
  });
  it("iron powder not for emc", () => {
    expect(forEmc("iron_powder")).toBe(false);
  });
});

describe("material", () => {
  it("nanocrystalline uses finemet", () => {
    expect(material("nanocrystalline")).toBe("finemet_fe_si_nb_cu");
  });
});

describe("bestUse", () => {
  it("air core pcb best for rf gan matching network", () => {
    expect(bestUse("air_core_pcb")).toBe("rf_gan_matching_network");
  });
});

describe("inductorCores", () => {
  it("returns 5 types", () => {
    expect(inductorCores()).toHaveLength(5);
  });
});
