import { describe, it, expect } from "vitest";
import {
  coverage, installEase, aerodynamics, durability,
  fenderCost, toolFreeMount, frontAndRear, fenderMaterial,
  bestBike, bikeFenders,
} from "../bike-fender-calc.js";

describe("coverage", () => {
  it("full wrap permanent best coverage", () => {
    expect(coverage("full_wrap_permanent")).toBeGreaterThan(coverage("ass_saver_minimal"));
  });
});

describe("installEase", () => {
  it("ass saver minimal easiest install", () => {
    expect(installEase("ass_saver_minimal")).toBeGreaterThan(installEase("full_wrap_permanent"));
  });
});

describe("aerodynamics", () => {
  it("ass saver minimal most aerodynamic", () => {
    expect(aerodynamics("ass_saver_minimal")).toBeGreaterThan(aerodynamics("fat_tire_wide"));
  });
});

describe("durability", () => {
  it("full wrap permanent most durable", () => {
    expect(durability("full_wrap_permanent")).toBeGreaterThan(durability("ass_saver_minimal"));
  });
});

describe("fenderCost", () => {
  it("full wrap permanent most expensive", () => {
    expect(fenderCost("full_wrap_permanent")).toBeGreaterThan(fenderCost("ass_saver_minimal"));
  });
});

describe("toolFreeMount", () => {
  it("clip on quick release is tool free mount", () => {
    expect(toolFreeMount("clip_on_quick_release")).toBe(true);
  });
  it("full wrap permanent is not", () => {
    expect(toolFreeMount("full_wrap_permanent")).toBe(false);
  });
});

describe("frontAndRear", () => {
  it("full wrap permanent covers front and rear", () => {
    expect(frontAndRear("full_wrap_permanent")).toBe(true);
  });
  it("ass saver minimal does not", () => {
    expect(frontAndRear("ass_saver_minimal")).toBe(false);
  });
});

describe("fenderMaterial", () => {
  it("full wrap permanent uses polycarbonate alloy stay", () => {
    expect(fenderMaterial("full_wrap_permanent")).toBe("polycarbonate_alloy_stay");
  });
});

describe("bestBike", () => {
  it("full wrap permanent best for commuter touring daily", () => {
    expect(bestBike("full_wrap_permanent")).toBe("commuter_touring_daily");
  });
});

describe("bikeFenders", () => {
  it("returns 5 types", () => {
    expect(bikeFenders()).toHaveLength(5);
  });
});
