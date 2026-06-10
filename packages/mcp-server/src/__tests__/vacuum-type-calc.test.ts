import { describe, it, expect } from "vitest";
import {
  suctionPower, runtimeMinutes, vacWeight, noiseLevel,
  vacCost, hepaFilter, selfEmpty, dustSystem,
  bestFloor, vacuumTypes,
} from "../vacuum-type-calc.js";

describe("suctionPower", () => {
  it("upright corded strongest suction", () => {
    expect(suctionPower("upright_corded")).toBeGreaterThan(suctionPower("robot_auto"));
  });
});

describe("runtimeMinutes", () => {
  it("upright corded longest runtime", () => {
    expect(runtimeMinutes("upright_corded")).toBeGreaterThan(runtimeMinutes("handheld_mini"));
  });
});

describe("vacWeight", () => {
  it("handheld mini lightest", () => {
    expect(vacWeight("handheld_mini")).toBeGreaterThan(vacWeight("upright_corded"));
  });
});

describe("noiseLevel", () => {
  it("robot auto quietest", () => {
    expect(noiseLevel("robot_auto")).toBeGreaterThan(noiseLevel("upright_corded"));
  });
});

describe("vacCost", () => {
  it("robot auto most expensive", () => {
    expect(vacCost("robot_auto")).toBeGreaterThan(vacCost("handheld_mini"));
  });
});

describe("hepaFilter", () => {
  it("upright corded has hepa filter", () => {
    expect(hepaFilter("upright_corded")).toBe(true);
  });
  it("robot auto does not", () => {
    expect(hepaFilter("robot_auto")).toBe(false);
  });
});

describe("selfEmpty", () => {
  it("robot auto is self emptying", () => {
    expect(selfEmpty("robot_auto")).toBe(true);
  });
  it("upright corded is not", () => {
    expect(selfEmpty("upright_corded")).toBe(false);
  });
});

describe("dustSystem", () => {
  it("robot auto uses auto empty dock bin", () => {
    expect(dustSystem("robot_auto")).toBe("auto_empty_dock_bin");
  });
});

describe("bestFloor", () => {
  it("robot auto for daily maintenance hands free", () => {
    expect(bestFloor("robot_auto")).toBe("daily_maintenance_hands_free");
  });
});

describe("vacuumTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumTypes()).toHaveLength(5);
  });
});
