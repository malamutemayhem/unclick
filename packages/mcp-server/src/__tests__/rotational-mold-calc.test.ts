import { describe, it, expect } from "vitest";
import {
  partSize, wallControl, throughput, moldComplexity,
  rmCost_, multiArm, forLargePart, rotation,
  bestUse, rotationalMoldTypes,
} from "../rotational-mold-calc.js";

describe("partSize", () => {
  it("rock and roll largest part size", () => {
    expect(partSize("rock_and_roll")).toBeGreaterThan(partSize("clamshell"));
  });
});

describe("wallControl", () => {
  it("carousel three arm best wall control", () => {
    expect(wallControl("carousel_three_arm")).toBeGreaterThan(wallControl("rock_and_roll"));
  });
});

describe("throughput", () => {
  it("carousel three arm highest throughput", () => {
    expect(throughput("carousel_three_arm")).toBeGreaterThan(throughput("clamshell"));
  });
});

describe("moldComplexity", () => {
  it("drop arm highest mold complexity", () => {
    expect(moldComplexity("drop_arm")).toBeGreaterThan(moldComplexity("rock_and_roll"));
  });
});

describe("rmCost_", () => {
  it("carousel three arm most expensive", () => {
    expect(rmCost_("carousel_three_arm")).toBeGreaterThan(rmCost_("clamshell"));
  });
});

describe("multiArm", () => {
  it("carousel three arm is multi arm", () => {
    expect(multiArm("carousel_three_arm")).toBe(true);
  });
  it("rock and roll not multi arm", () => {
    expect(multiArm("rock_and_roll")).toBe(false);
  });
});

describe("forLargePart", () => {
  it("rock and roll for large part", () => {
    expect(forLargePart("rock_and_roll")).toBe(true);
  });
  it("clamshell not for large part", () => {
    expect(forLargePart("clamshell")).toBe(false);
  });
});

describe("rotation", () => {
  it("drop arm uses independent drop arm", () => {
    expect(rotation("drop_arm")).toBe("independent_drop_arm_different_mold_size_mix_flexible_run");
  });
});

describe("bestUse", () => {
  it("rock and roll for long narrow tank", () => {
    expect(bestUse("rock_and_roll")).toBe("long_narrow_tank_canoe_kayak_pipe_elongated_hollow_part");
  });
});

describe("rotationalMoldTypes", () => {
  it("returns 5 types", () => {
    expect(rotationalMoldTypes()).toHaveLength(5);
  });
});
