import { describe, it, expect } from "vitest";
import {
  emulsionStability, hlbValue, heatTolerance,
  dosageRequired, flavorImpact, isNatural,
  veganFriendly, commonApplication, sourceOrigin, emulsifierTypes,
} from "../emulsifier-type-calc.js";

describe("emulsionStability", () => {
  it("mono diglycerides most stable", () => {
    expect(emulsionStability("mono_diglycerides")).toBeGreaterThan(
      emulsionStability("mustard")
    );
  });
});

describe("hlbValue", () => {
  it("egg yolk highest hlb", () => {
    expect(hlbValue("egg_yolk")).toBeGreaterThan(
      hlbValue("mono_diglycerides")
    );
  });
});

describe("heatTolerance", () => {
  it("mono diglycerides best heat tolerance", () => {
    expect(heatTolerance("mono_diglycerides")).toBeGreaterThan(
      heatTolerance("egg_yolk")
    );
  });
});

describe("dosageRequired", () => {
  it("egg yolk needs most", () => {
    expect(dosageRequired("egg_yolk")).toBeGreaterThan(
      dosageRequired("xanthan_gum")
    );
  });
});

describe("flavorImpact", () => {
  it("mustard strongest flavor impact", () => {
    expect(flavorImpact("mustard")).toBeGreaterThan(
      flavorImpact("lecithin")
    );
  });
});

describe("isNatural", () => {
  it("lecithin is natural", () => {
    expect(isNatural("lecithin")).toBe(true);
  });
  it("mono diglycerides is not", () => {
    expect(isNatural("mono_diglycerides")).toBe(false);
  });
});

describe("veganFriendly", () => {
  it("xanthan gum is vegan", () => {
    expect(veganFriendly("xanthan_gum")).toBe(true);
  });
  it("egg yolk is not", () => {
    expect(veganFriendly("egg_yolk")).toBe(false);
  });
});

describe("commonApplication", () => {
  it("egg yolk for mayonnaise", () => {
    expect(commonApplication("egg_yolk")).toBe("mayonnaise_custard");
  });
});

describe("sourceOrigin", () => {
  it("xanthan gum from fermentation", () => {
    expect(sourceOrigin("xanthan_gum")).toBe("bacterial_fermentation");
  });
});

describe("emulsifierTypes", () => {
  it("returns 5 types", () => {
    expect(emulsifierTypes()).toHaveLength(5);
  });
});
