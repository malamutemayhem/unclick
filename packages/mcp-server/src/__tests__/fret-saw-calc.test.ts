import { describe, it, expect } from "vitest";
import {
  cutDetail, cutDepth, turnAbility, bladeVariety,
  sawCost, adjustable, spiralBlade, frameStyle,
  bestUse, fretSaws,
} from "../fret-saw-calc.js";

describe("cutDetail", () => {
  it("jeweler frame fine best cut detail", () => {
    expect(cutDetail("jeweler_frame_fine")).toBeGreaterThan(cutDetail("coping_saw_round"));
  });
});

describe("cutDepth", () => {
  it("deep throat frame deepest cut", () => {
    expect(cutDepth("deep_throat_frame")).toBeGreaterThan(cutDepth("jeweler_frame_fine"));
  });
});

describe("turnAbility", () => {
  it("spiral blade omni best turn ability", () => {
    expect(turnAbility("spiral_blade_omni")).toBeGreaterThan(turnAbility("deep_throat_frame"));
  });
});

describe("bladeVariety", () => {
  it("jeweler frame fine most blade variety", () => {
    expect(bladeVariety("jeweler_frame_fine")).toBeGreaterThan(bladeVariety("spiral_blade_omni"));
  });
});

describe("sawCost", () => {
  it("deep throat frame more expensive than coping", () => {
    expect(sawCost("deep_throat_frame")).toBeGreaterThan(sawCost("coping_saw_round"));
  });
});

describe("adjustable", () => {
  it("adjustable angle tilt is adjustable", () => {
    expect(adjustable("adjustable_angle_tilt")).toBe(true);
  });
  it("deep throat frame not adjustable", () => {
    expect(adjustable("deep_throat_frame")).toBe(false);
  });
});

describe("spiralBlade", () => {
  it("spiral blade omni has spiral blade", () => {
    expect(spiralBlade("spiral_blade_omni")).toBe(true);
  });
  it("coping saw round no spiral blade", () => {
    expect(spiralBlade("coping_saw_round")).toBe(false);
  });
});

describe("frameStyle", () => {
  it("deep throat frame uses deep c frame steel", () => {
    expect(frameStyle("deep_throat_frame")).toBe("deep_c_frame_steel");
  });
});

describe("bestUse", () => {
  it("spiral blade omni best for omni direction scroll", () => {
    expect(bestUse("spiral_blade_omni")).toBe("omni_direction_scroll");
  });
});

describe("fretSaws", () => {
  it("returns 5 types", () => {
    expect(fretSaws()).toHaveLength(5);
  });
});
