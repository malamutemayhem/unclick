import { describe, it, expect } from "vitest";
import {
  controlRange, flowCapacity, tightShutoff, cavitationResist,
  bvCost, characterized, forSlurry, trim,
  bestUse, ballValveControlTypes,
} from "../ball-valve-control-calc.js";

describe("controlRange", () => {
  it("segmented ball best control range", () => {
    expect(controlRange("segmented_ball_high_cv")).toBeGreaterThan(controlRange("full_bore_on_off"));
  });
});

describe("flowCapacity", () => {
  it("full bore highest flow capacity", () => {
    expect(flowCapacity("full_bore_on_off")).toBeGreaterThanOrEqual(flowCapacity("trunnion_mounted_large"));
  });
});

describe("tightShutoff", () => {
  it("full bore tightest shutoff", () => {
    expect(tightShutoff("full_bore_on_off")).toBeGreaterThan(tightShutoff("segmented_ball_high_cv"));
  });
});

describe("cavitationResist", () => {
  it("segmented ball best cavitation resist", () => {
    expect(cavitationResist("segmented_ball_high_cv")).toBeGreaterThan(cavitationResist("full_bore_on_off"));
  });
});

describe("bvCost", () => {
  it("cryogenic most expensive", () => {
    expect(bvCost("cryogenic_extended_bon")).toBeGreaterThan(bvCost("full_bore_on_off"));
  });
});

describe("characterized", () => {
  it("v port is characterized", () => {
    expect(characterized("v_port_characterized")).toBe(true);
  });
  it("full bore not characterized", () => {
    expect(characterized("full_bore_on_off")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("segmented ball for slurry", () => {
    expect(forSlurry("segmented_ball_high_cv")).toBe(true);
  });
  it("cryogenic not for slurry", () => {
    expect(forSlurry("cryogenic_extended_bon")).toBe(false);
  });
});

describe("trim", () => {
  it("trunnion uses double block bleed", () => {
    expect(trim("trunnion_mounted_large")).toBe("trunnion_support_double_block_bleed_large");
  });
});

describe("bestUse", () => {
  it("cryogenic for lng service", () => {
    expect(bestUse("cryogenic_extended_bon")).toBe("lng_cryogenic_liquid_nitrogen_oxygen_service");
  });
});

describe("ballValveControlTypes", () => {
  it("returns 5 types", () => {
    expect(ballValveControlTypes()).toHaveLength(5);
  });
});
