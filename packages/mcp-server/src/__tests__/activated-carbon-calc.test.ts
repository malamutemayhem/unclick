import { describe, it, expect } from "vitest";
import {
  adsorption, surface, hardness, regenerability,
  acCost, reactivatable, forWater, feedstock,
  bestUse, activatedCarbonTypes,
} from "../activated-carbon-calc.js";

describe("adsorption", () => {
  it("pac highest adsorption", () => {
    expect(adsorption("powdered_pac_slurry")).toBeGreaterThan(adsorption("extruded_pellet_cylindrical"));
  });
});

describe("surface", () => {
  it("coconut shell highest surface area", () => {
    expect(surface("coconut_shell_micropore")).toBeGreaterThan(surface("impregnated_chemical_treated"));
  });
});

describe("hardness", () => {
  it("extruded pellet hardest", () => {
    expect(hardness("extruded_pellet_cylindrical")).toBeGreaterThan(hardness("powdered_pac_slurry"));
  });
});

describe("regenerability", () => {
  it("gac most regenerable", () => {
    expect(regenerability("granular_gac_fixed_bed")).toBeGreaterThan(regenerability("powdered_pac_slurry"));
  });
});

describe("acCost", () => {
  it("impregnated most expensive", () => {
    expect(acCost("impregnated_chemical_treated")).toBeGreaterThan(acCost("powdered_pac_slurry"));
  });
});

describe("reactivatable", () => {
  it("gac is reactivatable", () => {
    expect(reactivatable("granular_gac_fixed_bed")).toBe(true);
  });
  it("pac not reactivatable", () => {
    expect(reactivatable("powdered_pac_slurry")).toBe(false);
  });
});

describe("forWater", () => {
  it("gac for water", () => {
    expect(forWater("granular_gac_fixed_bed")).toBe(true);
  });
  it("extruded not for water", () => {
    expect(forWater("extruded_pellet_cylindrical")).toBe(false);
  });
});

describe("feedstock", () => {
  it("coconut shell uses coconut", () => {
    expect(feedstock("coconut_shell_micropore")).toBe("coconut_shell_steam_high_micro");
  });
});

describe("bestUse", () => {
  it("gac for municipal water", () => {
    expect(bestUse("granular_gac_fixed_bed")).toBe("municipal_water_taste_odor_organic");
  });
});

describe("activatedCarbonTypes", () => {
  it("returns 5 types", () => {
    expect(activatedCarbonTypes()).toHaveLength(5);
  });
});
