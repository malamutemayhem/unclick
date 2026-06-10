import { describe, it, expect } from "vitest";
import {
  elasticity, holdStrength, durability, versatility,
  bandCost, uvResist, latexFree, bandMaterial,
  bestUse, rubberBands,
} from "../rubber-band-calc.js";

describe("elasticity", () => {
  it("silicone heat resist most elastic", () => {
    expect(elasticity("silicone_heat_resist")).toBeGreaterThan(elasticity("wide_flat_file_band"));
  });
});

describe("holdStrength", () => {
  it("heavy duty pallet strap strongest hold", () => {
    expect(holdStrength("heavy_duty_pallet_strap")).toBeGreaterThan(holdStrength("standard_office_assorted"));
  });
});

describe("durability", () => {
  it("silicone heat resist most durable", () => {
    expect(durability("silicone_heat_resist")).toBeGreaterThan(durability("standard_office_assorted"));
  });
});

describe("versatility", () => {
  it("standard office assorted most versatile", () => {
    expect(versatility("standard_office_assorted")).toBeGreaterThan(versatility("rubber_ball_desk_toy"));
  });
});

describe("bandCost", () => {
  it("silicone heat resist most expensive", () => {
    expect(bandCost("silicone_heat_resist")).toBeGreaterThan(bandCost("standard_office_assorted"));
  });
});

describe("uvResist", () => {
  it("silicone heat resist is uv resistant", () => {
    expect(uvResist("silicone_heat_resist")).toBe(true);
  });
  it("standard office assorted is not", () => {
    expect(uvResist("standard_office_assorted")).toBe(false);
  });
});

describe("latexFree", () => {
  it("silicone heat resist is latex free", () => {
    expect(latexFree("silicone_heat_resist")).toBe(true);
  });
  it("standard office assorted is not", () => {
    expect(latexFree("standard_office_assorted")).toBe(false);
  });
});

describe("bandMaterial", () => {
  it("heavy duty pallet strap uses epdm industrial rubber", () => {
    expect(bandMaterial("heavy_duty_pallet_strap")).toBe("epdm_industrial_rubber");
  });
});

describe("bestUse", () => {
  it("standard office assorted best for general office bundle", () => {
    expect(bestUse("standard_office_assorted")).toBe("general_office_bundle");
  });
});

describe("rubberBands", () => {
  it("returns 5 types", () => {
    expect(rubberBands()).toHaveLength(5);
  });
});
