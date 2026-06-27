import { describe, it, expect } from "vitest";
import {
  digging, reach, mobility, stability,
  exCost, tracked, forTrench, undercarriage,
  bestUse, excavatorTypes,
} from "../excavator-type-calc.js";

describe("digging", () => {
  it("dragline highest digging force", () => {
    expect(digging("dragline_walking_cable")).toBeGreaterThan(digging("mini_compact_zero_tail"));
  });
});

describe("reach", () => {
  it("long reach greatest", () => {
    expect(reach("long_reach_demolition")).toBeGreaterThan(reach("mini_compact_zero_tail"));
  });
});

describe("mobility", () => {
  it("wheeled most mobile", () => {
    expect(mobility("wheeled_mobile_highway")).toBeGreaterThan(mobility("dragline_walking_cable"));
  });
});

describe("stability", () => {
  it("dragline most stable", () => {
    expect(stability("dragline_walking_cable")).toBeGreaterThan(stability("mini_compact_zero_tail"));
  });
});

describe("exCost", () => {
  it("dragline most expensive", () => {
    expect(exCost("dragline_walking_cable")).toBeGreaterThan(exCost("mini_compact_zero_tail"));
  });
});

describe("tracked", () => {
  it("crawler is tracked", () => {
    expect(tracked("crawler_hydraulic_standard")).toBe(true);
  });
  it("wheeled not tracked", () => {
    expect(tracked("wheeled_mobile_highway")).toBe(false);
  });
});

describe("forTrench", () => {
  it("crawler for trench", () => {
    expect(forTrench("crawler_hydraulic_standard")).toBe(true);
  });
  it("dragline not for trench", () => {
    expect(forTrench("dragline_walking_cable")).toBe(false);
  });
});

describe("undercarriage", () => {
  it("dragline uses walking shoe", () => {
    expect(undercarriage("dragline_walking_cable")).toBe("walking_shoe_pad_dragging");
  });
});

describe("bestUse", () => {
  it("crawler for general excavation", () => {
    expect(bestUse("crawler_hydraulic_standard")).toBe("general_excavation_trench_load");
  });
});

describe("excavatorTypes", () => {
  it("returns 5 types", () => {
    expect(excavatorTypes()).toHaveLength(5);
  });
});
