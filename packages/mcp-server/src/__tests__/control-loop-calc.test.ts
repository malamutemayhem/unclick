import { describe, it, expect } from "vitest";
import {
  disturbReject, setpointTrack, complexity, stability,
  clCost, multiVariable, forBatch, structure,
  bestUse, controlLoops,
} from "../control-loop-calc.js";

describe("disturbReject", () => {
  it("feedforward best disturbance rejection", () => {
    expect(disturbReject("feedforward_disturbance")).toBeGreaterThan(disturbReject("feedback_single_pid"));
  });
});

describe("setpointTrack", () => {
  it("ratio flow best setpoint tracking", () => {
    expect(setpointTrack("ratio_flow_blend")).toBeGreaterThan(setpointTrack("feedforward_disturbance"));
  });
});

describe("complexity", () => {
  it("split range most complex", () => {
    expect(complexity("split_range_valve")).toBeGreaterThan(complexity("feedback_single_pid"));
  });
});

describe("stability", () => {
  it("feedforward most stable", () => {
    expect(stability("feedforward_disturbance")).toBeGreaterThan(stability("split_range_valve"));
  });
});

describe("clCost", () => {
  it("split range most expensive", () => {
    expect(clCost("split_range_valve")).toBeGreaterThan(clCost("feedback_single_pid"));
  });
});

describe("multiVariable", () => {
  it("ratio flow is multi variable", () => {
    expect(multiVariable("ratio_flow_blend")).toBe(true);
  });
  it("feedback single not multi variable", () => {
    expect(multiVariable("feedback_single_pid")).toBe(false);
  });
});

describe("forBatch", () => {
  it("split range for batch", () => {
    expect(forBatch("split_range_valve")).toBe(true);
  });
  it("cascade not for batch", () => {
    expect(forBatch("cascade_inner_outer")).toBe(false);
  });
});

describe("structure", () => {
  it("cascade uses nested primary secondary", () => {
    expect(structure("cascade_inner_outer")).toBe("nested_primary_secondary");
  });
});

describe("bestUse", () => {
  it("feedforward best for boiler steam demand", () => {
    expect(bestUse("feedforward_disturbance")).toBe("boiler_steam_demand_ff");
  });
});

describe("controlLoops", () => {
  it("returns 5 types", () => {
    expect(controlLoops()).toHaveLength(5);
  });
});
