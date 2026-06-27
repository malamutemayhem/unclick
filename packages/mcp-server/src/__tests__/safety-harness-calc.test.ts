import { describe, it, expect } from "vitest";
import {
  comfort, protection, mobility, durability,
  shCost, rescueRated, forConstruction, connection,
  bestUse, safetyHarnessTypes,
} from "../safety-harness-calc.js";

describe("comfort", () => {
  it("vest style most comfortable", () => {
    expect(comfort("vest_style_high_vis")).toBeGreaterThan(comfort("rescue_suspension_rated"));
  });
});

describe("protection", () => {
  it("rescue highest protection", () => {
    expect(protection("rescue_suspension_rated")).toBeGreaterThan(protection("vest_style_high_vis"));
  });
});

describe("mobility", () => {
  it("vest style best mobility", () => {
    expect(mobility("vest_style_high_vis")).toBeGreaterThan(mobility("rescue_suspension_rated"));
  });
});

describe("durability", () => {
  it("construction most durable", () => {
    expect(durability("construction_tool_belt")).toBeGreaterThan(durability("vest_style_high_vis"));
  });
});

describe("shCost", () => {
  it("rescue most expensive", () => {
    expect(shCost("rescue_suspension_rated")).toBeGreaterThan(shCost("full_body_dorsal_d_ring"));
  });
});

describe("rescueRated", () => {
  it("rescue is rescue rated", () => {
    expect(rescueRated("rescue_suspension_rated")).toBe(true);
  });
  it("full body not rescue rated", () => {
    expect(rescueRated("full_body_dorsal_d_ring")).toBe(false);
  });
});

describe("forConstruction", () => {
  it("full body for construction", () => {
    expect(forConstruction("full_body_dorsal_d_ring")).toBe(true);
  });
  it("rescue not for construction", () => {
    expect(forConstruction("rescue_suspension_rated")).toBe(false);
  });
});

describe("connection", () => {
  it("tower climbing uses chest dorsal side", () => {
    expect(connection("tower_climbing_front_back")).toBe("chest_dorsal_side_d_ring_tower");
  });
});

describe("bestUse", () => {
  it("full body for general fall arrest", () => {
    expect(bestUse("full_body_dorsal_d_ring")).toBe("general_fall_arrest_roof_scaffold");
  });
});

describe("safetyHarnessTypes", () => {
  it("returns 5 types", () => {
    expect(safetyHarnessTypes()).toHaveLength(5);
  });
});
