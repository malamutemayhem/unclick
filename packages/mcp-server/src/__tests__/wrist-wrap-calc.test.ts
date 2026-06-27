import { describe, it, expect } from "vitest";
import {
  wristStability, comfort, easeOfUse, durability,
  wrapCost, thumbLoop, compApproved, closureMethod,
  bestLift, wristWraps,
} from "../wrist-wrap-calc.js";

describe("wristStability", () => {
  it("elastic competition stiff most wrist stability", () => {
    expect(wristStability("elastic_competition_stiff")).toBeGreaterThan(wristStability("gel_padded_comfort"));
  });
});

describe("comfort", () => {
  it("gel padded comfort most comfortable", () => {
    expect(comfort("gel_padded_comfort")).toBeGreaterThan(comfort("elastic_competition_stiff"));
  });
});

describe("easeOfUse", () => {
  it("gel padded comfort easiest to use", () => {
    expect(easeOfUse("gel_padded_comfort")).toBeGreaterThan(easeOfUse("leather_buckle_old_school"));
  });
});

describe("durability", () => {
  it("leather buckle old school most durable", () => {
    expect(durability("leather_buckle_old_school")).toBeGreaterThan(durability("gel_padded_comfort"));
  });
});

describe("wrapCost", () => {
  it("leather buckle old school most expensive", () => {
    expect(wrapCost("leather_buckle_old_school")).toBeGreaterThan(wrapCost("cotton_loop_thumb"));
  });
});

describe("thumbLoop", () => {
  it("cotton loop thumb has thumb loop", () => {
    expect(thumbLoop("cotton_loop_thumb")).toBe(true);
  });
  it("neoprene velcro support has no thumb loop", () => {
    expect(thumbLoop("neoprene_velcro_support")).toBe(false);
  });
});

describe("compApproved", () => {
  it("elastic competition stiff is comp approved", () => {
    expect(compApproved("elastic_competition_stiff")).toBe(true);
  });
  it("gel padded comfort is not comp approved", () => {
    expect(compApproved("gel_padded_comfort")).toBe(false);
  });
});

describe("closureMethod", () => {
  it("leather buckle old school uses metal buckle prong", () => {
    expect(closureMethod("leather_buckle_old_school")).toBe("metal_buckle_prong");
  });
});

describe("bestLift", () => {
  it("elastic competition stiff best for max overhead squat", () => {
    expect(bestLift("elastic_competition_stiff")).toBe("max_overhead_squat");
  });
});

describe("wristWraps", () => {
  it("returns 5 types", () => {
    expect(wristWraps()).toHaveLength(5);
  });
});
