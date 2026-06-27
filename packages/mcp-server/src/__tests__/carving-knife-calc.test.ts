import { describe, it, expect } from "vitest";
import {
  cutControl, materialRemoval, edgeHold, beginnerFriendly,
  knifeCost, oneHanded, curvedBlade, bladeShape,
  bestProject, carvingKnives,
} from "../carving-knife-calc.js";

describe("cutControl", () => {
  it("detail knife fine best cut control", () => {
    expect(cutControl("detail_knife_fine")).toBeGreaterThan(cutControl("drawknife_two_hand"));
  });
});

describe("materialRemoval", () => {
  it("drawknife two hand most material removal", () => {
    expect(materialRemoval("drawknife_two_hand")).toBeGreaterThan(materialRemoval("detail_knife_fine"));
  });
});

describe("edgeHold", () => {
  it("chip carving stab best edge hold", () => {
    expect(edgeHold("chip_carving_stab")).toBeGreaterThan(edgeHold("hook_knife_spoon"));
  });
});

describe("beginnerFriendly", () => {
  it("sloyd knife general most beginner friendly", () => {
    expect(beginnerFriendly("sloyd_knife_general")).toBeGreaterThan(beginnerFriendly("drawknife_two_hand"));
  });
});

describe("knifeCost", () => {
  it("hook knife spoon more expensive than sloyd", () => {
    expect(knifeCost("hook_knife_spoon")).toBeGreaterThan(knifeCost("sloyd_knife_general"));
  });
});

describe("oneHanded", () => {
  it("sloyd knife general is one handed", () => {
    expect(oneHanded("sloyd_knife_general")).toBe(true);
  });
  it("drawknife two hand is not one handed", () => {
    expect(oneHanded("drawknife_two_hand")).toBe(false);
  });
});

describe("curvedBlade", () => {
  it("hook knife spoon has curved blade", () => {
    expect(curvedBlade("hook_knife_spoon")).toBe(true);
  });
  it("sloyd knife general does not have curved blade", () => {
    expect(curvedBlade("sloyd_knife_general")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("chip carving stab uses short rigid blade", () => {
    expect(bladeShape("chip_carving_stab")).toBe("short_rigid_blade");
  });
});

describe("bestProject", () => {
  it("hook knife spoon best for spoon bowl hollow", () => {
    expect(bestProject("hook_knife_spoon")).toBe("spoon_bowl_hollow");
  });
});

describe("carvingKnives", () => {
  it("returns 5 types", () => {
    expect(carvingKnives()).toHaveLength(5);
  });
});
