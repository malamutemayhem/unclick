import { describe, it, expect } from "vitest";
import {
  holdStrength, visibility, corrosionResist, fabricSafe,
  gimpCost, decorative, forOutdoor, headFinish,
  bestUse, gimpPins,
} from "../gimp-pin-calc.js";

describe("holdStrength", () => {
  it("stainless marine rust strongest hold", () => {
    expect(holdStrength("stainless_marine_rust")).toBeGreaterThan(holdStrength("crystal_clear_invisible"));
  });
});

describe("visibility", () => {
  it("antique dome finish most visible", () => {
    expect(visibility("antique_dome_finish")).toBeGreaterThan(visibility("crystal_clear_invisible"));
  });
});

describe("corrosionResist", () => {
  it("stainless marine rust best corrosion resist", () => {
    expect(corrosionResist("stainless_marine_rust")).toBeGreaterThan(corrosionResist("antique_dome_finish"));
  });
});

describe("fabricSafe", () => {
  it("crystal clear invisible safest for fabric", () => {
    expect(fabricSafe("crystal_clear_invisible")).toBeGreaterThan(fabricSafe("stainless_marine_rust"));
  });
});

describe("gimpCost", () => {
  it("crystal clear invisible most expensive", () => {
    expect(gimpCost("crystal_clear_invisible")).toBeGreaterThan(gimpCost("brass_head_standard"));
  });
});

describe("decorative", () => {
  it("brass head standard is decorative", () => {
    expect(decorative("brass_head_standard")).toBe(true);
  });
  it("black oxide dark not decorative", () => {
    expect(decorative("black_oxide_dark")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("stainless marine rust is for outdoor", () => {
    expect(forOutdoor("stainless_marine_rust")).toBe(true);
  });
  it("brass head standard not for outdoor", () => {
    expect(forOutdoor("brass_head_standard")).toBe(false);
  });
});

describe("headFinish", () => {
  it("black oxide dark uses black oxide matte", () => {
    expect(headFinish("black_oxide_dark")).toBe("black_oxide_matte");
  });
});

describe("bestUse", () => {
  it("crystal clear invisible best for invisible trim fix", () => {
    expect(bestUse("crystal_clear_invisible")).toBe("invisible_trim_fix");
  });
});

describe("gimpPins", () => {
  it("returns 5 types", () => {
    expect(gimpPins()).toHaveLength(5);
  });
});
