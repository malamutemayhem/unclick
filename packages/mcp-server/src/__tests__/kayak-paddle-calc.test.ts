import { describe, it, expect } from "vitest";
import {
  paddleWeight, strokeEfficiency, durabilityScore, bladeArea,
  paddleCost, feathered, twopiece, bladeMaterial,
  bestStyle, kayakPaddles,
} from "../kayak-paddle-calc.js";

describe("paddleWeight", () => {
  it("aluminum entry heaviest", () => {
    expect(paddleWeight("aluminum_entry")).toBeGreaterThan(paddleWeight("carbon_performance"));
  });
});

describe("strokeEfficiency", () => {
  it("carbon performance most efficient", () => {
    expect(strokeEfficiency("carbon_performance")).toBeGreaterThan(strokeEfficiency("aluminum_entry"));
  });
});

describe("durabilityScore", () => {
  it("aluminum entry most durable", () => {
    expect(durabilityScore("aluminum_entry")).toBeGreaterThan(durabilityScore("carbon_performance"));
  });
});

describe("bladeArea", () => {
  it("carbon performance largest blade", () => {
    expect(bladeArea("carbon_performance")).toBeGreaterThan(bladeArea("greenland_narrow"));
  });
});

describe("paddleCost", () => {
  it("carbon performance most expensive", () => {
    expect(paddleCost("carbon_performance")).toBeGreaterThan(paddleCost("aluminum_entry"));
  });
});

describe("feathered", () => {
  it("carbon performance is feathered", () => {
    expect(feathered("carbon_performance")).toBe(true);
  });
  it("greenland narrow is not", () => {
    expect(feathered("greenland_narrow")).toBe(false);
  });
});

describe("twopiece", () => {
  it("fiberglass touring is two piece", () => {
    expect(twopiece("fiberglass_touring")).toBe(true);
  });
  it("wood traditional is not", () => {
    expect(twopiece("wood_traditional")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("carbon performance uses prepreg carbon fiber", () => {
    expect(bladeMaterial("carbon_performance")).toBe("prepreg_carbon_fiber");
  });
});

describe("bestStyle", () => {
  it("greenland narrow for rolling technique practice", () => {
    expect(bestStyle("greenland_narrow")).toBe("rolling_technique_practice");
  });
});

describe("kayakPaddles", () => {
  it("returns 5 types", () => {
    expect(kayakPaddles()).toHaveLength(5);
  });
});
