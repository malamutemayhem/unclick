import { describe, it, expect } from "vitest";
import {
  lineDetail, clearSpeed, controlFeel, bladeVariety,
  cutterCost, interchangeable, forOutline, bladeShape,
  bestUse, linoCutters,
} from "../lino-cutter-calc.js";

describe("lineDetail", () => {
  it("v gouge fine line best detail", () => {
    expect(lineDetail("v_gouge_fine_line")).toBeGreaterThan(lineDetail("clearing_gouge_large"));
  });
});

describe("clearSpeed", () => {
  it("clearing gouge large fastest clear", () => {
    expect(clearSpeed("clearing_gouge_large")).toBeGreaterThan(clearSpeed("v_gouge_fine_line"));
  });
});

describe("controlFeel", () => {
  it("mushroom palm push best control", () => {
    expect(controlFeel("mushroom_palm_push")).toBeGreaterThan(controlFeel("clearing_gouge_large"));
  });
});

describe("bladeVariety", () => {
  it("mushroom palm push most blade variety", () => {
    expect(bladeVariety("mushroom_palm_push")).toBeGreaterThan(bladeVariety("clearing_gouge_large"));
  });
});

describe("cutterCost", () => {
  it("mushroom palm push more expensive", () => {
    expect(cutterCost("mushroom_palm_push")).toBeGreaterThan(cutterCost("v_gouge_fine_line"));
  });
});

describe("interchangeable", () => {
  it("mushroom palm push is interchangeable", () => {
    expect(interchangeable("mushroom_palm_push")).toBe(true);
  });
  it("v gouge fine line not interchangeable", () => {
    expect(interchangeable("v_gouge_fine_line")).toBe(false);
  });
});

describe("forOutline", () => {
  it("knife blade outline is for outline", () => {
    expect(forOutline("knife_blade_outline")).toBe(true);
  });
  it("u gouge scoop wide not for outline", () => {
    expect(forOutline("u_gouge_scoop_wide")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("v gouge fine line uses v shape narrow", () => {
    expect(bladeShape("v_gouge_fine_line")).toBe("v_shape_narrow");
  });
});

describe("bestUse", () => {
  it("clearing gouge large best for background clear", () => {
    expect(bestUse("clearing_gouge_large")).toBe("background_clear");
  });
});

describe("linoCutters", () => {
  it("returns 5 types", () => {
    expect(linoCutters()).toHaveLength(5);
  });
});
