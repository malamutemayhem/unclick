import { describe, it, expect } from "vitest";
import {
  flagInsert, trimClean, controlGuide, bladeLife,
  chivCost, curved, forRush, edgeType,
  bestUse, chivKnives,
} from "../chiv-knife-calc.js";

describe("flagInsert", () => {
  it("straight blade flag best insert", () => {
    expect(flagInsert("straight_blade_flag")).toBeGreaterThan(flagInsert("serrated_grip_rush"));
  });
});

describe("trimClean", () => {
  it("double edge trim cleanest trim", () => {
    expect(trimClean("double_edge_trim")).toBeGreaterThan(trimClean("serrated_grip_rush"));
  });
});

describe("controlGuide", () => {
  it("hooked tip pull best control", () => {
    expect(controlGuide("hooked_tip_pull")).toBeGreaterThan(controlGuide("serrated_grip_rush"));
  });
});

describe("bladeLife", () => {
  it("serrated grip rush longest blade life", () => {
    expect(bladeLife("serrated_grip_rush")).toBeGreaterThan(bladeLife("hooked_tip_pull"));
  });
});

describe("chivCost", () => {
  it("double edge trim most expensive", () => {
    expect(chivCost("double_edge_trim")).toBeGreaterThan(chivCost("straight_blade_flag"));
  });
});

describe("curved", () => {
  it("curved blade stave is curved", () => {
    expect(curved("curved_blade_stave")).toBe(true);
  });
  it("straight blade flag not curved", () => {
    expect(curved("straight_blade_flag")).toBe(false);
  });
});

describe("forRush", () => {
  it("serrated grip rush is for rush", () => {
    expect(forRush("serrated_grip_rush")).toBe(true);
  });
  it("straight blade flag not for rush", () => {
    expect(forRush("straight_blade_flag")).toBe(false);
  });
});

describe("edgeType", () => {
  it("double edge trim uses double sided sharp", () => {
    expect(edgeType("double_edge_trim")).toBe("double_sided_sharp");
  });
});

describe("bestUse", () => {
  it("hooked tip pull best for old flag remove", () => {
    expect(bestUse("hooked_tip_pull")).toBe("old_flag_remove");
  });
});

describe("chivKnives", () => {
  it("returns 5 types", () => {
    expect(chivKnives()).toHaveLength(5);
  });
});
