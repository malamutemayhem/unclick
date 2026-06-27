import { describe, it, expect } from "vitest";
import {
  accuracy, weight, durability, height,
  srCost, telescopic, forLevel, graduation,
  bestUse, surveyRodTypes,
} from "../survey-rod-calc.js";

describe("accuracy", () => {
  it("leveling rod most accurate", () => {
    expect(accuracy("leveling_rod_fiberglass")).toBeGreaterThan(accuracy("range_pole_red_white"));
  });
});

describe("weight", () => {
  it("prism pole lightest", () => {
    expect(weight("prism_pole_carbon_fiber")).toBeGreaterThan(weight("leveling_rod_fiberglass"));
  });
});

describe("durability", () => {
  it("range pole most durable", () => {
    expect(durability("range_pole_red_white")).toBeGreaterThan(durability("prism_pole_carbon_fiber"));
  });
});

describe("height", () => {
  it("leveling rod tallest", () => {
    expect(height("leveling_rod_fiberglass")).toBeGreaterThan(height("gps_pole_two_meter"));
  });
});

describe("srCost", () => {
  it("prism pole most expensive", () => {
    expect(srCost("prism_pole_carbon_fiber")).toBeGreaterThan(srCost("range_pole_red_white"));
  });
});

describe("telescopic", () => {
  it("leveling rod is telescopic", () => {
    expect(telescopic("leveling_rod_fiberglass")).toBe(true);
  });
  it("range pole not telescopic", () => {
    expect(telescopic("range_pole_red_white")).toBe(false);
  });
});

describe("forLevel", () => {
  it("leveling rod for level", () => {
    expect(forLevel("leveling_rod_fiberglass")).toBe(true);
  });
  it("prism pole not for level", () => {
    expect(forLevel("prism_pole_carbon_fiber")).toBe(false);
  });
});

describe("graduation", () => {
  it("gps pole uses fixed height bipod", () => {
    expect(graduation("gps_pole_two_meter")).toBe("fixed_height_bipod_mount_gnss");
  });
});

describe("bestUse", () => {
  it("leveling rod for differential leveling", () => {
    expect(bestUse("leveling_rod_fiberglass")).toBe("differential_leveling_benchmark_run");
  });
});

describe("surveyRodTypes", () => {
  it("returns 5 types", () => {
    expect(surveyRodTypes()).toHaveLength(5);
  });
});
