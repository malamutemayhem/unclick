import { describe, it, expect } from "vitest";
import {
  grooveClean, dragControl, speedScore, edgeLife,
  chiselCost, powered, forDetail, spurCount,
  bestUse, cockspurChisels,
} from "../cockspur-chisel-calc.js";

describe("grooveClean", () => {
  it("narrow spur detail cleanest groove", () => {
    expect(grooveClean("narrow_spur_detail")).toBeGreaterThan(grooveClean("double_spur_fast"));
  });
});

describe("dragControl", () => {
  it("narrow spur detail best drag control", () => {
    expect(dragControl("narrow_spur_detail")).toBeGreaterThan(dragControl("pneumatic_spur_power"));
  });
});

describe("speedScore", () => {
  it("pneumatic spur power fastest score", () => {
    expect(speedScore("pneumatic_spur_power")).toBeGreaterThan(speedScore("narrow_spur_detail"));
  });
});

describe("edgeLife", () => {
  it("carbide spur hard best edge life", () => {
    expect(edgeLife("carbide_spur_hard")).toBeGreaterThan(edgeLife("pneumatic_spur_power"));
  });
});

describe("chiselCost", () => {
  it("pneumatic spur power most expensive", () => {
    expect(chiselCost("pneumatic_spur_power")).toBeGreaterThan(chiselCost("single_spur_standard"));
  });
});

describe("powered", () => {
  it("pneumatic spur power is powered", () => {
    expect(powered("pneumatic_spur_power")).toBe(true);
  });
  it("single spur standard not powered", () => {
    expect(powered("single_spur_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("narrow spur detail is for detail", () => {
    expect(forDetail("narrow_spur_detail")).toBe(true);
  });
  it("single spur standard not for detail", () => {
    expect(forDetail("single_spur_standard")).toBe(false);
  });
});

describe("spurCount", () => {
  it("double spur fast uses double point spur", () => {
    expect(spurCount("double_spur_fast")).toBe("double_point_spur");
  });
});

describe("bestUse", () => {
  it("single spur standard best for general groove score", () => {
    expect(bestUse("single_spur_standard")).toBe("general_groove_score");
  });
});

describe("cockspurChisels", () => {
  it("returns 5 types", () => {
    expect(cockspurChisels()).toHaveLength(5);
  });
});
