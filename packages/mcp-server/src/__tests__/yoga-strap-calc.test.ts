import { describe, it, expect } from "vitest";
import {
  gripTexture, stretchAssist, durability, skinComfort,
  strapCost, hasElasticity, machineWashable, buckleType,
  bestPose, yogaStraps,
} from "../yoga-strap-calc.js";

describe("gripTexture", () => {
  it("hemp natural eco best grip texture", () => {
    expect(gripTexture("hemp_natural_eco")).toBeGreaterThan(gripTexture("silk_gentle_premium"));
  });
});

describe("stretchAssist", () => {
  it("elastic stretch assist best stretch assist", () => {
    expect(stretchAssist("elastic_stretch_assist")).toBeGreaterThan(stretchAssist("cotton_d_ring_basic"));
  });
});

describe("durability", () => {
  it("nylon cinch buckle most durable", () => {
    expect(durability("nylon_cinch_buckle")).toBeGreaterThan(durability("silk_gentle_premium"));
  });
});

describe("skinComfort", () => {
  it("silk gentle premium most skin comfort", () => {
    expect(skinComfort("silk_gentle_premium")).toBeGreaterThan(skinComfort("nylon_cinch_buckle"));
  });
});

describe("strapCost", () => {
  it("silk gentle premium most expensive", () => {
    expect(strapCost("silk_gentle_premium")).toBeGreaterThan(strapCost("cotton_d_ring_basic"));
  });
});

describe("hasElasticity", () => {
  it("elastic stretch assist has elasticity", () => {
    expect(hasElasticity("elastic_stretch_assist")).toBe(true);
  });
  it("cotton d ring basic has no elasticity", () => {
    expect(hasElasticity("cotton_d_ring_basic")).toBe(false);
  });
});

describe("machineWashable", () => {
  it("cotton d ring basic is machine washable", () => {
    expect(machineWashable("cotton_d_ring_basic")).toBe(true);
  });
  it("silk gentle premium is not machine washable", () => {
    expect(machineWashable("silk_gentle_premium")).toBe(false);
  });
});

describe("buckleType", () => {
  it("cotton d ring basic uses metal d ring double", () => {
    expect(buckleType("cotton_d_ring_basic")).toBe("metal_d_ring_double");
  });
});

describe("bestPose", () => {
  it("elastic stretch assist best for dancer pose balance", () => {
    expect(bestPose("elastic_stretch_assist")).toBe("dancer_pose_balance");
  });
});

describe("yogaStraps", () => {
  it("returns 5 types", () => {
    expect(yogaStraps()).toHaveLength(5);
  });
});
