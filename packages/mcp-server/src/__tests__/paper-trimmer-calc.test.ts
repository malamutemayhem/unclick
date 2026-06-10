import { describe, it, expect } from "vitest";
import {
  cutPrecision, sheetCapacity, safetyLevel, portability,
  trimmerCost, replaceBlade, selfHealing, bladeType,
  bestProject, paperTrimmers,
} from "../paper-trimmer-calc.js";

describe("cutPrecision", () => {
  it("craft knife mat most precise", () => {
    expect(cutPrecision("craft_knife_mat")).toBeGreaterThan(cutPrecision("guillotine_arm_chop"));
  });
});

describe("sheetCapacity", () => {
  it("guillotine arm chop most sheet capacity", () => {
    expect(sheetCapacity("guillotine_arm_chop")).toBeGreaterThan(sheetCapacity("craft_knife_mat"));
  });
});

describe("safetyLevel", () => {
  it("personal trimmer mini safest", () => {
    expect(safetyLevel("personal_trimmer_mini")).toBeGreaterThan(safetyLevel("craft_knife_mat"));
  });
});

describe("portability", () => {
  it("personal trimmer mini most portable", () => {
    expect(portability("personal_trimmer_mini")).toBeGreaterThan(portability("guillotine_arm_chop"));
  });
});

describe("trimmerCost", () => {
  it("guillotine arm chop most expensive", () => {
    expect(trimmerCost("guillotine_arm_chop")).toBeGreaterThan(trimmerCost("craft_knife_mat"));
  });
});

describe("replaceBlade", () => {
  it("rotary blade slide has replaceable blade", () => {
    expect(replaceBlade("rotary_blade_slide")).toBe(true);
  });
  it("guillotine arm chop does not have replaceable blade", () => {
    expect(replaceBlade("guillotine_arm_chop")).toBe(false);
  });
});

describe("selfHealing", () => {
  it("craft knife mat is self healing", () => {
    expect(selfHealing("craft_knife_mat")).toBe(true);
  });
  it("rotary blade slide is not self healing", () => {
    expect(selfHealing("rotary_blade_slide")).toBe(false);
  });
});

describe("bladeType", () => {
  it("rotary blade slide uses circular rolling blade", () => {
    expect(bladeType("rotary_blade_slide")).toBe("circular_rolling_blade");
  });
});

describe("bestProject", () => {
  it("guillotine arm chop best for bulk stack trim", () => {
    expect(bestProject("guillotine_arm_chop")).toBe("bulk_stack_trim");
  });
});

describe("paperTrimmers", () => {
  it("returns 5 types", () => {
    expect(paperTrimmers()).toHaveLength(5);
  });
});
