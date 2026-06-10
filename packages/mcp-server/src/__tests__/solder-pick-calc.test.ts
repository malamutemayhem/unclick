import { describe, it, expect } from "vitest";
import {
  heatResist, solderRelease, tipPrecision, durability,
  pickCost, nonStick, drawsHeat, tipAlloy,
  bestUse, solderPicks,
} from "../solder-pick-calc.js";

describe("heatResist", () => {
  it("tungsten carbide tip best heat resist", () => {
    expect(heatResist("tungsten_carbide_tip")).toBeGreaterThan(heatResist("copper_heat_sink"));
  });
});

describe("solderRelease", () => {
  it("titanium fine point best solder release", () => {
    expect(solderRelease("titanium_fine_point")).toBeGreaterThan(solderRelease("copper_heat_sink"));
  });
});

describe("tipPrecision", () => {
  it("titanium fine point most precise tip", () => {
    expect(tipPrecision("titanium_fine_point")).toBeGreaterThan(tipPrecision("steel_bent_hook"));
  });
});

describe("durability", () => {
  it("tungsten carbide tip most durable", () => {
    expect(durability("tungsten_carbide_tip")).toBeGreaterThan(durability("graphite_probe_flat"));
  });
});

describe("pickCost", () => {
  it("titanium fine point most expensive", () => {
    expect(pickCost("titanium_fine_point")).toBeGreaterThan(pickCost("steel_bent_hook"));
  });
});

describe("nonStick", () => {
  it("titanium fine point is non stick", () => {
    expect(nonStick("titanium_fine_point")).toBe(true);
  });
  it("steel bent hook not non stick", () => {
    expect(nonStick("steel_bent_hook")).toBe(false);
  });
});

describe("drawsHeat", () => {
  it("copper heat sink draws heat", () => {
    expect(drawsHeat("copper_heat_sink")).toBe(true);
  });
  it("titanium fine point does not draw heat", () => {
    expect(drawsHeat("titanium_fine_point")).toBe(false);
  });
});

describe("tipAlloy", () => {
  it("titanium fine point uses grade 2 titanium", () => {
    expect(tipAlloy("titanium_fine_point")).toBe("grade_2_titanium");
  });
});

describe("bestUse", () => {
  it("titanium fine point best for place solder pallion", () => {
    expect(bestUse("titanium_fine_point")).toBe("place_solder_pallion");
  });
});

describe("solderPicks", () => {
  it("returns 5 types", () => {
    expect(solderPicks()).toHaveLength(5);
  });
});
