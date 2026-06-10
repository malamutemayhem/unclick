import { describe, it, expect } from "vitest";
import {
  stoneProtect, setEase, shapeFlexibility, lightEntry,
  bezelCost, preMade, openBack, wallStyle,
  bestStone, bezelSettings,
} from "../bezel-setting-calc.js";

describe("stoneProtect", () => {
  it("square box frame best stone protection", () => {
    expect(stoneProtect("square_box_frame")).toBeGreaterThan(stoneProtect("freeform_gallery_wire"));
  });
});

describe("setEase", () => {
  it("round cup cabochon easiest to set", () => {
    expect(setEase("round_cup_cabochon")).toBeGreaterThan(setEase("freeform_gallery_wire"));
  });
});

describe("shapeFlexibility", () => {
  it("freeform gallery wire most shape flexibility", () => {
    expect(shapeFlexibility("freeform_gallery_wire")).toBeGreaterThan(shapeFlexibility("round_cup_cabochon"));
  });
});

describe("lightEntry", () => {
  it("freeform gallery wire best light entry", () => {
    expect(lightEntry("freeform_gallery_wire")).toBeGreaterThan(lightEntry("square_box_frame"));
  });
});

describe("bezelCost", () => {
  it("freeform gallery wire most expensive", () => {
    expect(bezelCost("freeform_gallery_wire")).toBeGreaterThan(bezelCost("round_cup_cabochon"));
  });
});

describe("preMade", () => {
  it("round cup cabochon is pre made", () => {
    expect(preMade("round_cup_cabochon")).toBe(true);
  });
  it("freeform gallery wire is not pre made", () => {
    expect(preMade("freeform_gallery_wire")).toBe(false);
  });
});

describe("openBack", () => {
  it("oval scallop edge has open back", () => {
    expect(openBack("oval_scallop_edge")).toBe(true);
  });
  it("round cup cabochon does not have open back", () => {
    expect(openBack("round_cup_cabochon")).toBe(false);
  });
});

describe("wallStyle", () => {
  it("oval scallop edge uses scalloped decorative rim", () => {
    expect(wallStyle("oval_scallop_edge")).toBe("scalloped_decorative_rim");
  });
});

describe("bestStone", () => {
  it("freeform gallery wire best for rough crystal point", () => {
    expect(bestStone("freeform_gallery_wire")).toBe("rough_crystal_point");
  });
});

describe("bezelSettings", () => {
  it("returns 5 types", () => {
    expect(bezelSettings()).toHaveLength(5);
  });
});
