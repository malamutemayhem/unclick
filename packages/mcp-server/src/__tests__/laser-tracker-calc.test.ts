import { describe, it, expect } from "vitest";
import {
  accuracy, range, portability, measureSpeed,
  ltCost, singlePerson, forLargeScale, technology,
  bestUse, laserTrackerTypes,
} from "../laser-tracker-calc.js";

describe("accuracy", () => {
  it("interferometric highest accuracy", () => {
    expect(accuracy("interferometric")).toBeGreaterThan(accuracy("indoor_gps"));
  });
});

describe("range", () => {
  it("indoor gps longest range", () => {
    expect(range("indoor_gps")).toBeGreaterThan(range("portable_arm_hybrid"));
  });
});

describe("portability", () => {
  it("portable arm hybrid most portable", () => {
    expect(portability("portable_arm_hybrid")).toBeGreaterThan(portability("indoor_gps"));
  });
});

describe("measureSpeed", () => {
  it("six dof probe fastest measurement", () => {
    expect(measureSpeed("six_dof_probe")).toBeGreaterThan(measureSpeed("indoor_gps"));
  });
});

describe("ltCost", () => {
  it("six dof probe most expensive", () => {
    expect(ltCost("six_dof_probe")).toBeGreaterThan(ltCost("portable_arm_hybrid"));
  });
});

describe("singlePerson", () => {
  it("absolute distance single person operation", () => {
    expect(singlePerson("absolute_distance")).toBe(true);
  });
  it("indoor gps requires multiple people", () => {
    expect(singlePerson("indoor_gps")).toBe(false);
  });
});

describe("forLargeScale", () => {
  it("absolute distance for large scale", () => {
    expect(forLargeScale("absolute_distance")).toBe(true);
  });
  it("portable arm hybrid not for large scale", () => {
    expect(forLargeScale("portable_arm_hybrid")).toBe(false);
  });
});

describe("technology", () => {
  it("indoor gps uses multiple fan beam transmitters", () => {
    expect(technology("indoor_gps")).toBe("multiple_transmitter_fan_beam_laser_triangulate_large_volume");
  });
});

describe("bestUse", () => {
  it("portable arm hybrid for first article inspection", () => {
    expect(bestUse("portable_arm_hybrid")).toBe("first_article_inspection_reverse_engineering_shop_floor");
  });
});

describe("laserTrackerTypes", () => {
  it("returns 5 types", () => {
    expect(laserTrackerTypes()).toHaveLength(5);
  });
});
