import { describe, it, expect } from "vitest";
import {
  blowControl, gatherCapacity, heatBalance, spinWeight,
  pipeCost, insulated, forBeginner, pipeLength,
  bestUse, pipeBlows,
} from "../pipe-blow-calc.js";

describe("blowControl", () => {
  it("short gather pipe best blow control", () => {
    expect(blowControl("short_gather_pipe")).toBeGreaterThan(blowControl("long_reach_extend"));
  });
});

describe("gatherCapacity", () => {
  it("long reach extend largest gather", () => {
    expect(gatherCapacity("long_reach_extend")).toBeGreaterThan(gatherCapacity("short_gather_pipe"));
  });
});

describe("heatBalance", () => {
  it("lightweight alloy thin best heat balance", () => {
    expect(heatBalance("lightweight_alloy_thin")).toBeGreaterThan(heatBalance("long_reach_extend"));
  });
});

describe("spinWeight", () => {
  it("lightweight alloy thin lightest spin", () => {
    expect(spinWeight("lightweight_alloy_thin")).toBeGreaterThan(spinWeight("long_reach_extend"));
  });
});

describe("pipeCost", () => {
  it("lightweight alloy thin most expensive", () => {
    expect(pipeCost("lightweight_alloy_thin")).toBeGreaterThan(pipeCost("short_gather_pipe"));
  });
});

describe("insulated", () => {
  it("color coated grip is insulated", () => {
    expect(insulated("color_coated_grip")).toBe(true);
  });
  it("standard steel pipe not insulated", () => {
    expect(insulated("standard_steel_pipe")).toBe(false);
  });
});

describe("forBeginner", () => {
  it("short gather pipe is for beginner", () => {
    expect(forBeginner("short_gather_pipe")).toBe(true);
  });
  it("long reach extend not for beginner", () => {
    expect(forBeginner("long_reach_extend")).toBe(false);
  });
});

describe("pipeLength", () => {
  it("long reach extend uses five foot long", () => {
    expect(pipeLength("long_reach_extend")).toBe("five_foot_long");
  });
});

describe("bestUse", () => {
  it("lightweight alloy thin best for extended session light", () => {
    expect(bestUse("lightweight_alloy_thin")).toBe("extended_session_light");
  });
});

describe("pipeBlows", () => {
  it("returns 5 types", () => {
    expect(pipeBlows()).toHaveLength(5);
  });
});
