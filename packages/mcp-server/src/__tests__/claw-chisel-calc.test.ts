import { describe, it, expect } from "vitest";
import {
  textureBite, surfaceControl, speedCarve, edgeLife,
  chiselCost, powered, forFinish, toothPattern,
  bestUse, clawChisels,
} from "../claw-chisel-calc.js";

describe("textureBite", () => {
  it("two tooth coarse strongest texture bite", () => {
    expect(textureBite("two_tooth_coarse")).toBeGreaterThan(textureBite("six_tooth_fine"));
  });
});

describe("surfaceControl", () => {
  it("six tooth fine best surface control", () => {
    expect(surfaceControl("six_tooth_fine")).toBeGreaterThan(surfaceControl("two_tooth_coarse"));
  });
});

describe("speedCarve", () => {
  it("pneumatic power fast fastest carve", () => {
    expect(speedCarve("pneumatic_power_fast")).toBeGreaterThan(speedCarve("six_tooth_fine"));
  });
});

describe("edgeLife", () => {
  it("carbide tip hard best edge life", () => {
    expect(edgeLife("carbide_tip_hard")).toBeGreaterThan(edgeLife("six_tooth_fine"));
  });
});

describe("chiselCost", () => {
  it("pneumatic power fast most expensive", () => {
    expect(chiselCost("pneumatic_power_fast")).toBeGreaterThan(chiselCost("two_tooth_coarse"));
  });
});

describe("powered", () => {
  it("pneumatic power fast is powered", () => {
    expect(powered("pneumatic_power_fast")).toBe(true);
  });
  it("four tooth medium not powered", () => {
    expect(powered("four_tooth_medium")).toBe(false);
  });
});

describe("forFinish", () => {
  it("six tooth fine is for finish", () => {
    expect(forFinish("six_tooth_fine")).toBe(true);
  });
  it("two tooth coarse not for finish", () => {
    expect(forFinish("two_tooth_coarse")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("carbide tip hard uses carbide four row", () => {
    expect(toothPattern("carbide_tip_hard")).toBe("carbide_four_row");
  });
});

describe("bestUse", () => {
  it("two tooth coarse best for rough waste remove", () => {
    expect(bestUse("two_tooth_coarse")).toBe("rough_waste_remove");
  });
});

describe("clawChisels", () => {
  it("returns 5 types", () => {
    expect(clawChisels()).toHaveLength(5);
  });
});
