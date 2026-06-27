import { describe, it, expect } from "vitest";
import {
  reachDepth, threadEase, fabricPierce, controlGuide,
  buttonCost, curved, forDeep, pointStyle,
  bestUse, buttoningNeedles,
} from "../buttoning-needle-calc.js";

describe("reachDepth", () => {
  it("straight long reach deepest reach", () => {
    expect(reachDepth("straight_long_reach")).toBeGreaterThan(reachDepth("curved_round_body"));
  });
});

describe("threadEase", () => {
  it("spring eye thread easiest thread", () => {
    expect(threadEase("spring_eye_thread")).toBeGreaterThan(threadEase("double_point_through"));
  });
});

describe("fabricPierce", () => {
  it("bayonet point pierce best fabric pierce", () => {
    expect(fabricPierce("bayonet_point_pierce")).toBeGreaterThan(fabricPierce("curved_round_body"));
  });
});

describe("controlGuide", () => {
  it("curved round body best control guide", () => {
    expect(controlGuide("curved_round_body")).toBeGreaterThan(controlGuide("straight_long_reach"));
  });
});

describe("buttonCost", () => {
  it("bayonet point pierce most expensive", () => {
    expect(buttonCost("bayonet_point_pierce")).toBeGreaterThan(buttonCost("straight_long_reach"));
  });
});

describe("curved", () => {
  it("curved round body is curved", () => {
    expect(curved("curved_round_body")).toBe(true);
  });
  it("straight long reach not curved", () => {
    expect(curved("straight_long_reach")).toBe(false);
  });
});

describe("forDeep", () => {
  it("straight long reach is for deep", () => {
    expect(forDeep("straight_long_reach")).toBe(true);
  });
  it("curved round body not for deep", () => {
    expect(forDeep("curved_round_body")).toBe(false);
  });
});

describe("pointStyle", () => {
  it("bayonet point pierce uses triangular bayonet", () => {
    expect(pointStyle("bayonet_point_pierce")).toBe("triangular_bayonet");
  });
});

describe("bestUse", () => {
  it("spring eye thread best for quick thread change", () => {
    expect(bestUse("spring_eye_thread")).toBe("quick_thread_change");
  });
});

describe("buttoningNeedles", () => {
  it("returns 5 types", () => {
    expect(buttoningNeedles()).toHaveLength(5);
  });
});
