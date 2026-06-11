import { describe, it, expect } from "vitest";
import {
  ozoneOutput, throughput, energyEfficiency, purity,
  ogCost, portable, forPotable, generatorConfig,
  bestUse, ozoneGeneratorTypes,
} from "../ozone-generator-calc.js";

describe("ozoneOutput", () => {
  it("oxygen fed corona best ozone output", () => {
    expect(ozoneOutput("oxygen_fed_corona")).toBeGreaterThan(ozoneOutput("uv_ozone"));
  });
});

describe("throughput", () => {
  it("corona discharge highest throughput", () => {
    expect(throughput("corona_discharge")).toBeGreaterThan(throughput("electrolytic_ozone"));
  });
});

describe("energyEfficiency", () => {
  it("oxygen fed corona best energy efficiency", () => {
    expect(energyEfficiency("oxygen_fed_corona")).toBeGreaterThan(energyEfficiency("uv_ozone"));
  });
});

describe("purity", () => {
  it("electrolytic ozone best purity", () => {
    expect(purity("electrolytic_ozone")).toBeGreaterThan(purity("corona_discharge"));
  });
});

describe("ogCost", () => {
  it("oxygen fed corona most expensive", () => {
    expect(ogCost("oxygen_fed_corona")).toBeGreaterThan(ogCost("uv_ozone"));
  });
});

describe("portable", () => {
  it("uv ozone is portable", () => {
    expect(portable("uv_ozone")).toBe(true);
  });
  it("corona discharge not portable", () => {
    expect(portable("corona_discharge")).toBe(false);
  });
});

describe("forPotable", () => {
  it("corona discharge for potable water", () => {
    expect(forPotable("corona_discharge")).toBe(true);
  });
  it("uv ozone not for potable", () => {
    expect(forPotable("uv_ozone")).toBe(false);
  });
});

describe("generatorConfig", () => {
  it("cold plasma uses dbd plasma field reactive species", () => {
    expect(generatorConfig("cold_plasma")).toBe("cold_plasma_ozone_generator_dbd_plasma_field_reactive_species");
  });
});

describe("bestUse", () => {
  it("electrolytic ozone for pharma food ultra pure no byproduct clean", () => {
    expect(bestUse("electrolytic_ozone")).toBe("pharma_food_electrolytic_ozone_ultra_pure_no_byproduct_clean");
  });
});

describe("ozoneGeneratorTypes", () => {
  it("returns 5 types", () => {
    expect(ozoneGeneratorTypes()).toHaveLength(5);
  });
});
