import { describe, it, expect } from "vitest";
import {
  bearing, settlement, excavation, reinforcement,
  ftCost, reinforced, forHeavy, shape,
  bestUse, footingTypeTypes,
} from "../footing-type-calc.js";

describe("bearing", () => {
  it("mat raft highest bearing", () => {
    expect(bearing("mat_raft_foundation")).toBeGreaterThan(bearing("stepped_sloped_site"));
  });
});

describe("settlement", () => {
  it("mat raft best settlement control", () => {
    expect(settlement("mat_raft_foundation")).toBeGreaterThan(settlement("stepped_sloped_site"));
  });
});

describe("excavation", () => {
  it("spread easiest excavation", () => {
    expect(excavation("spread_isolated_pad")).toBeGreaterThan(excavation("mat_raft_foundation"));
  });
});

describe("reinforcement", () => {
  it("mat raft most reinforcement", () => {
    expect(reinforcement("mat_raft_foundation")).toBeGreaterThan(reinforcement("spread_isolated_pad"));
  });
});

describe("ftCost", () => {
  it("mat raft most expensive", () => {
    expect(ftCost("mat_raft_foundation")).toBeGreaterThan(ftCost("spread_isolated_pad"));
  });
});

describe("reinforced", () => {
  it("spread is reinforced", () => {
    expect(reinforced("spread_isolated_pad")).toBe(true);
  });
  it("stepped not reinforced", () => {
    expect(reinforced("stepped_sloped_site")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("mat raft for heavy loads", () => {
    expect(forHeavy("mat_raft_foundation")).toBe(true);
  });
  it("spread not for heavy", () => {
    expect(forHeavy("spread_isolated_pad")).toBe(false);
  });
});

describe("shape", () => {
  it("strip uses continuous shape", () => {
    expect(shape("strip_continuous_wall")).toBe("continuous_strip_wall_line");
  });
});

describe("bestUse", () => {
  it("mat raft for high rise", () => {
    expect(bestUse("mat_raft_foundation")).toBe("high_rise_weak_soil_uniform");
  });
});

describe("footingTypeTypes", () => {
  it("returns 5 types", () => {
    expect(footingTypeTypes()).toHaveLength(5);
  });
});
