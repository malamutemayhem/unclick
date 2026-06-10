import { describe, it, expect } from "vitest";
import {
  brewRichness, heatKeep, durabilityScore, servingSize,
  pressCost, dishwasherSafe, leakProof, filterMesh,
  bestMoment, frenchPresses,
} from "../french-press-calc.js";

describe("brewRichness", () => {
  it("large carafe richest brew", () => {
    expect(brewRichness("large_carafe")).toBeGreaterThan(brewRichness("travel_press"));
  });
});

describe("heatKeep", () => {
  it("stainless insulated best heat retention", () => {
    expect(heatKeep("stainless_insulated")).toBeGreaterThan(heatKeep("glass_classic"));
  });
});

describe("durabilityScore", () => {
  it("stainless insulated most durable", () => {
    expect(durabilityScore("stainless_insulated")).toBeGreaterThan(durabilityScore("glass_classic"));
  });
});

describe("servingSize", () => {
  it("large carafe largest serving", () => {
    expect(servingSize("large_carafe")).toBeGreaterThan(servingSize("ceramic_mug"));
  });
});

describe("pressCost", () => {
  it("stainless insulated most expensive", () => {
    expect(pressCost("stainless_insulated")).toBeGreaterThan(pressCost("glass_classic"));
  });
});

describe("dishwasherSafe", () => {
  it("glass classic is dishwasher safe", () => {
    expect(dishwasherSafe("glass_classic")).toBe(true);
  });
  it("travel press is not", () => {
    expect(dishwasherSafe("travel_press")).toBe(false);
  });
});

describe("leakProof", () => {
  it("travel press is leak proof", () => {
    expect(leakProof("travel_press")).toBe(true);
  });
  it("glass classic is not", () => {
    expect(leakProof("glass_classic")).toBe(false);
  });
});

describe("filterMesh", () => {
  it("travel press uses sealed micro mesh lid", () => {
    expect(filterMesh("travel_press")).toBe("sealed_micro_mesh_lid");
  });
});

describe("bestMoment", () => {
  it("stainless insulated for camping outdoor durable", () => {
    expect(bestMoment("stainless_insulated")).toBe("camping_outdoor_durable");
  });
});

describe("frenchPresses", () => {
  it("returns 5 types", () => {
    expect(frenchPresses()).toHaveLength(5);
  });
});
