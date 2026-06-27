import { describe, it, expect } from "vitest";
import {
  cutQuality, throughput, materialRange, edgeCleanliness,
  srCost, contactFree, forFilm, slitterConfig,
  bestUse, slitterRewinderTypes,
} from "../slitter-rewinder-calc.js";

describe("cutQuality", () => {
  it("laser slit best cut quality", () => {
    expect(cutQuality("laser_slit")).toBeGreaterThan(cutQuality("score_cut"));
  });
});

describe("throughput", () => {
  it("shear cut highest throughput", () => {
    expect(throughput("shear_cut")).toBeGreaterThan(throughput("laser_slit"));
  });
});

describe("materialRange", () => {
  it("shear cut widest material range", () => {
    expect(materialRange("shear_cut")).toBeGreaterThan(materialRange("razor_blade"));
  });
});

describe("edgeCleanliness", () => {
  it("laser slit best edge cleanliness", () => {
    expect(edgeCleanliness("laser_slit")).toBeGreaterThan(edgeCleanliness("score_cut"));
  });
});

describe("srCost", () => {
  it("laser slit most expensive", () => {
    expect(srCost("laser_slit")).toBeGreaterThan(srCost("razor_blade"));
  });
});

describe("contactFree", () => {
  it("laser slit is contact free", () => {
    expect(contactFree("laser_slit")).toBe(true);
  });
  it("shear cut not contact free", () => {
    expect(contactFree("shear_cut")).toBe(false);
  });
});

describe("forFilm", () => {
  it("razor blade for film", () => {
    expect(forFilm("razor_blade")).toBe(true);
  });
  it("shear cut not for film", () => {
    expect(forFilm("shear_cut")).toBe(false);
  });
});

describe("slitterConfig", () => {
  it("hot knife uses heated blade melt seal synthetic web", () => {
    expect(slitterConfig("hot_knife")).toBe("hot_knife_slitter_rewinder_heated_blade_melt_seal_synthetic_web");
  });
});

describe("bestUse", () => {
  it("laser slit for precision battery separator medical film", () => {
    expect(bestUse("laser_slit")).toBe("precision_laser_slit_rewinder_battery_separator_medical_film");
  });
});

describe("slitterRewinderTypes", () => {
  it("returns 5 types", () => {
    expect(slitterRewinderTypes()).toHaveLength(5);
  });
});
