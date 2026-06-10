import { describe, it, expect } from "vitest";
import {
  darknessRange, lineControl, blendability, smudgeResist,
  stickCost, waterSoluble, woodCased, gradeType,
  bestTechnique, graphiteSticks,
} from "../graphite-stick-calc.js";

describe("darknessRange", () => {
  it("soft 6b dark shade darkest range", () => {
    expect(darknessRange("soft_6b_dark_shade")).toBeGreaterThan(darknessRange("hard_2h_fine_detail"));
  });
});

describe("lineControl", () => {
  it("hard 2h fine detail best line control", () => {
    expect(lineControl("hard_2h_fine_detail")).toBeGreaterThan(lineControl("soft_6b_dark_shade"));
  });
});

describe("blendability", () => {
  it("water soluble wash most blendable", () => {
    expect(blendability("water_soluble_wash")).toBeGreaterThan(blendability("hard_2h_fine_detail"));
  });
});

describe("smudgeResist", () => {
  it("hard 2h fine detail best smudge resist", () => {
    expect(smudgeResist("hard_2h_fine_detail")).toBeGreaterThan(smudgeResist("soft_6b_dark_shade"));
  });
});

describe("stickCost", () => {
  it("woodless full graphite most expensive", () => {
    expect(stickCost("woodless_full_graphite")).toBeGreaterThan(stickCost("medium_hb_general"));
  });
});

describe("waterSoluble", () => {
  it("water soluble wash is water soluble", () => {
    expect(waterSoluble("water_soluble_wash")).toBe(true);
  });
  it("soft 6b dark shade is not water soluble", () => {
    expect(waterSoluble("soft_6b_dark_shade")).toBe(false);
  });
});

describe("woodCased", () => {
  it("all graphite sticks are not wood cased", () => {
    expect(woodCased("soft_6b_dark_shade")).toBe(false);
    expect(woodCased("woodless_full_graphite")).toBe(false);
  });
});

describe("gradeType", () => {
  it("medium hb general uses standard hb middle", () => {
    expect(gradeType("medium_hb_general")).toBe("standard_hb_middle");
  });
});

describe("bestTechnique", () => {
  it("hard 2h fine detail best for architectural precise", () => {
    expect(bestTechnique("hard_2h_fine_detail")).toBe("architectural_precise");
  });
});

describe("graphiteSticks", () => {
  it("returns 5 types", () => {
    expect(graphiteSticks()).toHaveLength(5);
  });
});
