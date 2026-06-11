import { describe, it, expect } from "vitest";
import {
  waveAttenuation, durability, depth, environmental,
  bwCost, permeable, forHarbor, structure,
  bestUse, breakwaterTypes,
} from "../breakwater-type-calc.js";

describe("waveAttenuation", () => {
  it("caisson best wave attenuation", () => {
    expect(waveAttenuation("caisson_vertical_wall")).toBeGreaterThan(waveAttenuation("floating_pontoon_moored"));
  });
});

describe("durability", () => {
  it("rubble mound most durable", () => {
    expect(durability("rubble_mound_armor_stone")).toBeGreaterThan(durability("floating_pontoon_moored"));
  });
});

describe("depth", () => {
  it("floating handles deepest water", () => {
    expect(depth("floating_pontoon_moored")).toBeGreaterThan(depth("submerged_reef_low_crest"));
  });
});

describe("environmental", () => {
  it("submerged reef best environmental", () => {
    expect(environmental("submerged_reef_low_crest")).toBeGreaterThan(environmental("caisson_vertical_wall"));
  });
});

describe("bwCost", () => {
  it("caisson most expensive", () => {
    expect(bwCost("caisson_vertical_wall")).toBeGreaterThan(bwCost("submerged_reef_low_crest"));
  });
});

describe("permeable", () => {
  it("rubble mound is permeable", () => {
    expect(permeable("rubble_mound_armor_stone")).toBe(true);
  });
  it("caisson not permeable", () => {
    expect(permeable("caisson_vertical_wall")).toBe(false);
  });
});

describe("forHarbor", () => {
  it("rubble mound for harbor", () => {
    expect(forHarbor("rubble_mound_armor_stone")).toBe(true);
  });
  it("floating not for harbor", () => {
    expect(forHarbor("floating_pontoon_moored")).toBe(false);
  });
});

describe("structure", () => {
  it("caisson uses concrete box", () => {
    expect(structure("caisson_vertical_wall")).toBe("concrete_box_filled_sand_ballast");
  });
});

describe("bestUse", () => {
  it("rubble mound for harbor protection", () => {
    expect(bestUse("rubble_mound_armor_stone")).toBe("harbor_protection_open_coast");
  });
});

describe("breakwaterTypes", () => {
  it("returns 5 types", () => {
    expect(breakwaterTypes()).toHaveLength(5);
  });
});
