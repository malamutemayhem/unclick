import { describe, it, expect } from "vitest";
import {
  shapeAccuracy, detailFine, reusability, sizeRange,
  moldCost, flexible, forBeginners, moldBase,
  bestUse, feltingMolds,
} from "../felting-mold-calc.js";

describe("shapeAccuracy", () => {
  it("silicone mold 3d most accurate shape", () => {
    expect(shapeAccuracy("silicone_mold_3d")).toBeGreaterThan(shapeAccuracy("foam_form_sculpt"));
  });
});

describe("detailFine", () => {
  it("silicone mold 3d finest detail", () => {
    expect(detailFine("silicone_mold_3d")).toBeGreaterThan(detailFine("polystyrene_core_base"));
  });
});

describe("reusability", () => {
  it("cookie cutter flat most reusable", () => {
    expect(reusability("cookie_cutter_flat")).toBeGreaterThan(reusability("polystyrene_core_base"));
  });
});

describe("sizeRange", () => {
  it("polystyrene core base widest size range", () => {
    expect(sizeRange("polystyrene_core_base")).toBeGreaterThan(sizeRange("silicone_mold_3d"));
  });
});

describe("moldCost", () => {
  it("silicone mold 3d most expensive", () => {
    expect(moldCost("silicone_mold_3d")).toBeGreaterThan(moldCost("foam_form_sculpt"));
  });
});

describe("flexible", () => {
  it("silicone mold 3d is flexible", () => {
    expect(flexible("silicone_mold_3d")).toBe(true);
  });
  it("cookie cutter flat not flexible", () => {
    expect(flexible("cookie_cutter_flat")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("cookie cutter flat is for beginners", () => {
    expect(forBeginners("cookie_cutter_flat")).toBe(true);
  });
  it("wire frame shape not for beginners", () => {
    expect(forBeginners("wire_frame_shape")).toBe(false);
  });
});

describe("moldBase", () => {
  it("wire frame shape uses bent wire armature", () => {
    expect(moldBase("wire_frame_shape")).toBe("bent_wire_armature");
  });
});

describe("bestUse", () => {
  it("cookie cutter flat best for flat shape cutout", () => {
    expect(bestUse("cookie_cutter_flat")).toBe("flat_shape_cutout");
  });
});

describe("feltingMolds", () => {
  it("returns 5 types", () => {
    expect(feltingMolds()).toHaveLength(5);
  });
});
