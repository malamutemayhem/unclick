import { describe, it, expect } from "vitest";
import {
  yarnControl, stability, yarnSafe, portability,
  bowlCost, breakResist, collapsible, bowlMaterial,
  bestProject, yarnBowls,
} from "../yarn-bowl-calc.js";

describe("yarnControl", () => {
  it("marble stone luxury best yarn control", () => {
    expect(yarnControl("marble_stone_luxury")).toBeGreaterThan(yarnControl("silicone_travel_fold"));
  });
});

describe("stability", () => {
  it("marble stone luxury most stable", () => {
    expect(stability("marble_stone_luxury")).toBeGreaterThan(stability("silicone_travel_fold"));
  });
});

describe("yarnSafe", () => {
  it("wood turned smooth safest for yarn", () => {
    expect(yarnSafe("wood_turned_smooth")).toBeGreaterThan(yarnSafe("marble_stone_luxury"));
  });
});

describe("portability", () => {
  it("silicone travel fold most portable", () => {
    expect(portability("silicone_travel_fold")).toBeGreaterThan(portability("marble_stone_luxury"));
  });
});

describe("bowlCost", () => {
  it("marble stone luxury most expensive", () => {
    expect(bowlCost("marble_stone_luxury")).toBeGreaterThan(bowlCost("bamboo_light_eco"));
  });
});

describe("breakResist", () => {
  it("wood turned smooth is break resistant", () => {
    expect(breakResist("wood_turned_smooth")).toBe(true);
  });
  it("ceramic heavy glaze is not break resistant", () => {
    expect(breakResist("ceramic_heavy_glaze")).toBe(false);
  });
});

describe("collapsible", () => {
  it("silicone travel fold is collapsible", () => {
    expect(collapsible("silicone_travel_fold")).toBe(true);
  });
  it("wood turned smooth is not collapsible", () => {
    expect(collapsible("wood_turned_smooth")).toBe(false);
  });
});

describe("bowlMaterial", () => {
  it("ceramic heavy glaze uses stoneware fired glaze", () => {
    expect(bowlMaterial("ceramic_heavy_glaze")).toBe("stoneware_fired_glaze");
  });
});

describe("bestProject", () => {
  it("silicone travel fold best for travel knit portable", () => {
    expect(bestProject("silicone_travel_fold")).toBe("travel_knit_portable");
  });
});

describe("yarnBowls", () => {
  it("returns 5 types", () => {
    expect(yarnBowls()).toHaveLength(5);
  });
});
