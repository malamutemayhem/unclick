import { describe, it, expect } from "vitest";
import {
  splitForce, lineControl, durability, sizeRange,
  wedgeCost, carbide, forQuarry, setSize,
  bestUse, featherWedges,
} from "../feather-wedge-calc.js";

describe("splitForce", () => {
  it("large quarry heavy most split force", () => {
    expect(splitForce("large_quarry_heavy")).toBeGreaterThan(splitForce("small_plug_trim"));
  });
});

describe("lineControl", () => {
  it("small plug trim best line control", () => {
    expect(lineControl("small_plug_trim")).toBeGreaterThan(lineControl("large_quarry_heavy"));
  });
});

describe("durability", () => {
  it("carbide face hard most durable", () => {
    expect(durability("carbide_face_hard")).toBeGreaterThan(durability("small_plug_trim"));
  });
});

describe("sizeRange", () => {
  it("large quarry heavy best size range", () => {
    expect(sizeRange("large_quarry_heavy")).toBeGreaterThan(sizeRange("small_plug_trim"));
  });
});

describe("wedgeCost", () => {
  it("carbide face hard most expensive", () => {
    expect(wedgeCost("carbide_face_hard")).toBeGreaterThan(wedgeCost("small_plug_trim"));
  });
});

describe("carbide", () => {
  it("carbide face hard has carbide", () => {
    expect(carbide("carbide_face_hard")).toBe(true);
  });
  it("standard steel set no carbide", () => {
    expect(carbide("standard_steel_set")).toBe(false);
  });
});

describe("forQuarry", () => {
  it("large quarry heavy is for quarry", () => {
    expect(forQuarry("large_quarry_heavy")).toBe(true);
  });
  it("standard steel set not for quarry", () => {
    expect(forQuarry("standard_steel_set")).toBe(false);
  });
});

describe("setSize", () => {
  it("hand forged custom uses custom forged set", () => {
    expect(setSize("hand_forged_custom")).toBe("custom_forged_set");
  });
});

describe("bestUse", () => {
  it("carbide face hard best for hard granite split", () => {
    expect(bestUse("carbide_face_hard")).toBe("hard_granite_split");
  });
});

describe("featherWedges", () => {
  it("returns 5 types", () => {
    expect(featherWedges()).toHaveLength(5);
  });
});
