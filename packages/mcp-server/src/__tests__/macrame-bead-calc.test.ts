import { describe, it, expect } from "vitest";
import {
  holeSize, visualWeight, colorVariety, durability,
  beadCost, lightweight, handcrafted, beadMaterial,
  bestProject, macrameBeads,
} from "../macrame-bead-calc.js";

describe("holeSize", () => {
  it("glass pony color largest hole size", () => {
    expect(holeSize("glass_pony_color")).toBeGreaterThan(holeSize("gemstone_natural_drill"));
  });
});

describe("visualWeight", () => {
  it("gemstone natural drill most visual weight", () => {
    expect(visualWeight("gemstone_natural_drill")).toBeGreaterThan(visualWeight("metal_spacer_tube"));
  });
});

describe("colorVariety", () => {
  it("glass pony color most color variety", () => {
    expect(colorVariety("glass_pony_color")).toBeGreaterThan(colorVariety("metal_spacer_tube"));
  });
});

describe("durability", () => {
  it("gemstone natural drill most durable", () => {
    expect(durability("gemstone_natural_drill")).toBeGreaterThan(durability("ceramic_handmade_glaze"));
  });
});

describe("beadCost", () => {
  it("gemstone natural drill most expensive", () => {
    expect(beadCost("gemstone_natural_drill")).toBeGreaterThan(beadCost("wood_round_large"));
  });
});

describe("lightweight", () => {
  it("wood round large is lightweight", () => {
    expect(lightweight("wood_round_large")).toBe(true);
  });
  it("gemstone natural drill is not lightweight", () => {
    expect(lightweight("gemstone_natural_drill")).toBe(false);
  });
});

describe("handcrafted", () => {
  it("ceramic handmade glaze is handcrafted", () => {
    expect(handcrafted("ceramic_handmade_glaze")).toBe(true);
  });
  it("wood round large is not handcrafted", () => {
    expect(handcrafted("wood_round_large")).toBe(false);
  });
});

describe("beadMaterial", () => {
  it("gemstone natural drill is polished stone drilled", () => {
    expect(beadMaterial("gemstone_natural_drill")).toBe("polished_stone_drilled");
  });
});

describe("bestProject", () => {
  it("ceramic handmade glaze best for artisan necklace focal", () => {
    expect(bestProject("ceramic_handmade_glaze")).toBe("artisan_necklace_focal");
  });
});

describe("macrameBeads", () => {
  it("returns 5 types", () => {
    expect(macrameBeads()).toHaveLength(5);
  });
});
