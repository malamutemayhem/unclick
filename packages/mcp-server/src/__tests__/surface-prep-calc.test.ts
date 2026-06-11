import { describe, it, expect } from "vitest";
import {
  profile, speed, cleanliness, dustFree,
  spCost, ecofriendly, forCoating, media,
  bestUse, surfacePrepTypes,
} from "../surface-prep-calc.js";

describe("profile", () => {
  it("abrasive blast deepest profile", () => {
    expect(profile("abrasive_blast_grit")).toBeGreaterThan(profile("chemical_acid_pickle"));
  });
});

describe("speed", () => {
  it("abrasive blast fastest", () => {
    expect(speed("abrasive_blast_grit")).toBeGreaterThan(speed("power_tool_grind"));
  });
});

describe("cleanliness", () => {
  it("laser ablation cleanest", () => {
    expect(cleanliness("laser_ablation_clean")).toBeGreaterThan(cleanliness("power_tool_grind"));
  });
});

describe("dustFree", () => {
  it("laser ablation most dust free", () => {
    expect(dustFree("laser_ablation_clean")).toBeGreaterThan(dustFree("abrasive_blast_grit"));
  });
});

describe("spCost", () => {
  it("laser ablation most expensive", () => {
    expect(spCost("laser_ablation_clean")).toBeGreaterThan(spCost("power_tool_grind"));
  });
});

describe("ecofriendly", () => {
  it("wet blast is eco friendly", () => {
    expect(ecofriendly("wet_blast_slurry")).toBe(true);
  });
  it("abrasive blast not eco friendly", () => {
    expect(ecofriendly("abrasive_blast_grit")).toBe(false);
  });
});

describe("forCoating", () => {
  it("all surface prep types for coating", () => {
    expect(forCoating("abrasive_blast_grit")).toBe(true);
  });
  it("laser ablation for coating", () => {
    expect(forCoating("laser_ablation_clean")).toBe(true);
  });
});

describe("media", () => {
  it("wet blast uses water abrasive slurry", () => {
    expect(media("wet_blast_slurry")).toBe("water_abrasive_slurry_garnet_mix");
  });
});

describe("bestUse", () => {
  it("laser ablation for precision mold", () => {
    expect(bestUse("laser_ablation_clean")).toBe("precision_mold_heritage_selective");
  });
});

describe("surfacePrepTypes", () => {
  it("returns 5 types", () => {
    expect(surfacePrepTypes()).toHaveLength(5);
  });
});
