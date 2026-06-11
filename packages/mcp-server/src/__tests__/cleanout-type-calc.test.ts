import { describe, it, expect } from "vitest";
import {
  accessibility, flow, durability, installEase,
  coCost, adjustable, forMainline, plug,
  bestUse, cleanoutTypes,
} from "../cleanout-type-calc.js";

describe("accessibility", () => {
  it("wall access most accessible", () => {
    expect(accessibility("wall_access_recessed")).toBeGreaterThan(accessibility("roof_vent_combo"));
  });
});

describe("flow", () => {
  it("two way highest flow", () => {
    expect(flow("two_way_directional")).toBeGreaterThan(flow("floor_access_round"));
  });
});

describe("durability", () => {
  it("test tee most durable", () => {
    expect(durability("test_tee_wye_branch")).toBeGreaterThan(durability("wall_access_recessed"));
  });
});

describe("installEase", () => {
  it("test tee easiest install", () => {
    expect(installEase("test_tee_wye_branch")).toBeGreaterThan(installEase("two_way_directional"));
  });
});

describe("coCost", () => {
  it("two way most expensive", () => {
    expect(coCost("two_way_directional")).toBeGreaterThan(coCost("test_tee_wye_branch"));
  });
});

describe("adjustable", () => {
  it("floor access is adjustable", () => {
    expect(adjustable("floor_access_round")).toBe(true);
  });
  it("wall access not adjustable", () => {
    expect(adjustable("wall_access_recessed")).toBe(false);
  });
});

describe("forMainline", () => {
  it("two way for mainline", () => {
    expect(forMainline("two_way_directional")).toBe(true);
  });
  it("floor access not mainline", () => {
    expect(forMainline("floor_access_round")).toBe(false);
  });
});

describe("plug", () => {
  it("two way uses dual plug", () => {
    expect(plug("two_way_directional")).toBe("dual_plug_bidirectional_body");
  });
});

describe("bestUse", () => {
  it("wall access for finished wall", () => {
    expect(bestUse("wall_access_recessed")).toBe("finished_wall_hidden_access");
  });
});

describe("cleanoutTypes", () => {
  it("returns 5 types", () => {
    expect(cleanoutTypes()).toHaveLength(5);
  });
});
