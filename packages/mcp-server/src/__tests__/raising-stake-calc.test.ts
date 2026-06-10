import { describe, it, expect } from "vitest";
import {
  curveControl, surfaceArea, versatility, stabilityInVise,
  stakeCost, polished, tapered, stakeMetal,
  bestUse, raisingStakes,
} from "../raising-stake-calc.js";

describe("curveControl", () => {
  it("mushroom head round best curve control", () => {
    expect(curveControl("mushroom_head_round")).toBeGreaterThan(curveControl("t_stake_flat_face"));
  });
});

describe("surfaceArea", () => {
  it("t stake flat face most surface area", () => {
    expect(surfaceArea("t_stake_flat_face")).toBeGreaterThan(surfaceArea("bick_horn_narrow"));
  });
});

describe("versatility", () => {
  it("mushroom head round most versatile", () => {
    expect(versatility("mushroom_head_round")).toBeGreaterThan(versatility("bick_horn_narrow"));
  });
});

describe("stabilityInVise", () => {
  it("t stake flat face most stable in vise", () => {
    expect(stabilityInVise("t_stake_flat_face")).toBeGreaterThan(stabilityInVise("cow_tongue_long"));
  });
});

describe("stakeCost", () => {
  it("cow tongue long most expensive", () => {
    expect(stakeCost("cow_tongue_long")).toBeGreaterThan(stakeCost("mushroom_head_round"));
  });
});

describe("polished", () => {
  it("mushroom head round is polished", () => {
    expect(polished("mushroom_head_round")).toBe(true);
  });
  it("bick horn narrow not polished", () => {
    expect(polished("bick_horn_narrow")).toBe(false);
  });
});

describe("tapered", () => {
  it("mandrel cone taper is tapered", () => {
    expect(tapered("mandrel_cone_taper")).toBe(true);
  });
  it("mushroom head round not tapered", () => {
    expect(tapered("mushroom_head_round")).toBe(false);
  });
});

describe("stakeMetal", () => {
  it("mushroom head round uses hardened steel forged", () => {
    expect(stakeMetal("mushroom_head_round")).toBe("hardened_steel_forged");
  });
});

describe("bestUse", () => {
  it("mushroom head round best for bowl vessel form", () => {
    expect(bestUse("mushroom_head_round")).toBe("bowl_vessel_form");
  });
});

describe("raisingStakes", () => {
  it("returns 5 types", () => {
    expect(raisingStakes()).toHaveLength(5);
  });
});
