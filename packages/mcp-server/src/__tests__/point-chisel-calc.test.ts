import { describe, it, expect } from "vitest";
import {
  breakForce, tipLife, controlAim, speedRemove,
  pointCost, powered, forGranite, pointAngle,
  bestUse, pointChisels,
} from "../point-chisel-calc.js";

describe("breakForce", () => {
  it("pneumatic air drive strongest break", () => {
    expect(breakForce("pneumatic_air_drive")).toBeGreaterThan(breakForce("hand_forged_steel"));
  });
});

describe("tipLife", () => {
  it("carbide tip hard longest tip life", () => {
    expect(tipLife("carbide_tip_hard")).toBeGreaterThan(tipLife("bull_point_heavy"));
  });
});

describe("controlAim", () => {
  it("hand forged steel best control", () => {
    expect(controlAim("hand_forged_steel")).toBeGreaterThan(controlAim("pneumatic_air_drive"));
  });
});

describe("speedRemove", () => {
  it("pneumatic air drive fastest remove", () => {
    expect(speedRemove("pneumatic_air_drive")).toBeGreaterThan(speedRemove("hand_forged_steel"));
  });
});

describe("pointCost", () => {
  it("pneumatic air drive most expensive", () => {
    expect(pointCost("pneumatic_air_drive")).toBeGreaterThan(pointCost("bull_point_heavy"));
  });
});

describe("powered", () => {
  it("pneumatic air drive is powered", () => {
    expect(powered("pneumatic_air_drive")).toBe(true);
  });
  it("carbide tip hard not powered", () => {
    expect(powered("carbide_tip_hard")).toBe(false);
  });
});

describe("forGranite", () => {
  it("carbide tip hard is for granite", () => {
    expect(forGranite("carbide_tip_hard")).toBe(true);
  });
  it("hand forged steel not for granite", () => {
    expect(forGranite("hand_forged_steel")).toBe(false);
  });
});

describe("pointAngle", () => {
  it("star drill multi uses four point star", () => {
    expect(pointAngle("star_drill_multi")).toBe("four_point_star");
  });
});

describe("bestUse", () => {
  it("bull point heavy best for heavy rubble break", () => {
    expect(bestUse("bull_point_heavy")).toBe("heavy_rubble_break");
  });
});

describe("pointChisels", () => {
  it("returns 5 types", () => {
    expect(pointChisels()).toHaveLength(5);
  });
});
