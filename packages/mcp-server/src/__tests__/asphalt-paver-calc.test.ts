import { describe, it, expect } from "vitest";
import {
  width, speed, smoothness, capacity,
  apCost, tracked, forHighway, screed,
  bestUse, asphaltPaverTypes,
} from "../asphalt-paver-calc.js";

describe("width", () => {
  it("extend screed widest", () => {
    expect(width("screed_extend_wide")).toBeGreaterThan(width("mini_paver_path_utility"));
  });
});

describe("speed", () => {
  it("wheeled paver fastest", () => {
    expect(speed("wheeled_paver_urban")).toBeGreaterThan(speed("mini_paver_path_utility"));
  });
});

describe("smoothness", () => {
  it("tracked paver smoothest", () => {
    expect(smoothness("tracked_paver_highway")).toBeGreaterThan(smoothness("mini_paver_path_utility"));
  });
});

describe("capacity", () => {
  it("tracked paver highest capacity", () => {
    expect(capacity("tracked_paver_highway")).toBeGreaterThan(capacity("mini_paver_path_utility"));
  });
});

describe("apCost", () => {
  it("extend screed most expensive", () => {
    expect(apCost("screed_extend_wide")).toBeGreaterThan(apCost("mini_paver_path_utility"));
  });
});

describe("tracked", () => {
  it("tracked paver is tracked", () => {
    expect(tracked("tracked_paver_highway")).toBe(true);
  });
  it("wheeled not tracked", () => {
    expect(tracked("wheeled_paver_urban")).toBe(false);
  });
});

describe("forHighway", () => {
  it("tracked paver for highway", () => {
    expect(forHighway("tracked_paver_highway")).toBe(true);
  });
  it("mini paver not for highway", () => {
    expect(forHighway("mini_paver_path_utility")).toBe(false);
  });
});

describe("screed", () => {
  it("extend uses telescopic hydraulic", () => {
    expect(screed("screed_extend_wide")).toBe("telescopic_extend_hydraulic_wide");
  });
});

describe("bestUse", () => {
  it("tracked paver for highway mainline", () => {
    expect(bestUse("tracked_paver_highway")).toBe("highway_mainline_thick_lift");
  });
});

describe("asphaltPaverTypes", () => {
  it("returns 5 types", () => {
    expect(asphaltPaverTypes()).toHaveLength(5);
  });
});
