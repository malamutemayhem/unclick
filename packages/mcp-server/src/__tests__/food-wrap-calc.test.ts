import { describe, it, expect } from "vitest";
import {
  sealQuality, ecoFriendly, versatility, easeOfUse,
  wrapCost, reusable, heatSafe, wrapMaterial,
  bestUse, foodWraps,
} from "../food-wrap-calc.js";

describe("sealQuality", () => {
  it("aluminum foil heavy best seal", () => {
    expect(sealQuality("aluminum_foil_heavy")).toBeGreaterThan(sealQuality("parchment_paper_roll"));
  });
});

describe("ecoFriendly", () => {
  it("beeswax reusable most eco friendly", () => {
    expect(ecoFriendly("beeswax_reusable")).toBeGreaterThan(ecoFriendly("plastic_cling_film"));
  });
});

describe("versatility", () => {
  it("aluminum foil heavy most versatile", () => {
    expect(versatility("aluminum_foil_heavy")).toBeGreaterThan(versatility("beeswax_reusable"));
  });
});

describe("easeOfUse", () => {
  it("silicone stretch lid easiest to use", () => {
    expect(easeOfUse("silicone_stretch_lid")).toBeGreaterThan(easeOfUse("beeswax_reusable"));
  });
});

describe("wrapCost", () => {
  it("beeswax reusable most expensive", () => {
    expect(wrapCost("beeswax_reusable")).toBeGreaterThan(wrapCost("plastic_cling_film"));
  });
});

describe("reusable", () => {
  it("beeswax reusable is reusable", () => {
    expect(reusable("beeswax_reusable")).toBe(true);
  });
  it("plastic cling film is not", () => {
    expect(reusable("plastic_cling_film")).toBe(false);
  });
});

describe("heatSafe", () => {
  it("aluminum foil heavy is heat safe", () => {
    expect(heatSafe("aluminum_foil_heavy")).toBe(true);
  });
  it("beeswax reusable is not", () => {
    expect(heatSafe("beeswax_reusable")).toBe(false);
  });
});

describe("wrapMaterial", () => {
  it("beeswax reusable uses organic cotton beeswax jojoba", () => {
    expect(wrapMaterial("beeswax_reusable")).toBe("organic_cotton_beeswax_jojoba");
  });
});

describe("bestUse", () => {
  it("silicone stretch lid best for bowl container leftover seal", () => {
    expect(bestUse("silicone_stretch_lid")).toBe("bowl_container_leftover_seal");
  });
});

describe("foodWraps", () => {
  it("returns 5 types", () => {
    expect(foodWraps()).toHaveLength(5);
  });
});
