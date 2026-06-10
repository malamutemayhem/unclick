import { describe, it, expect } from "vitest";
import {
  spanMeters, loadCapacityKn, memberCount,
  fabricationComplexity, deflectionResistance, woodSuitable,
  steelRequired, bestApplication, costPerMeter, trussTypes,
} from "../truss-type-calc.js";

describe("spanMeters", () => {
  it("warren spans widest", () => {
    expect(spanMeters("warren")).toBeGreaterThan(
      spanMeters("king_post")
    );
  });
});

describe("loadCapacityKn", () => {
  it("pratt has highest capacity", () => {
    expect(loadCapacityKn("pratt")).toBeGreaterThan(
      loadCapacityKn("king_post")
    );
  });
});

describe("memberCount", () => {
  it("king post has fewest members", () => {
    expect(memberCount("king_post")).toBeLessThan(
      memberCount("howe")
    );
  });
});

describe("fabricationComplexity", () => {
  it("howe is more complex than king post", () => {
    expect(fabricationComplexity("howe")).toBeGreaterThan(
      fabricationComplexity("king_post")
    );
  });
});

describe("deflectionResistance", () => {
  it("pratt resists deflection best", () => {
    expect(deflectionResistance("pratt")).toBeGreaterThan(
      deflectionResistance("king_post")
    );
  });
});

describe("woodSuitable", () => {
  it("king post suits wood", () => {
    expect(woodSuitable("king_post")).toBe(true);
  });
  it("pratt does not", () => {
    expect(woodSuitable("pratt")).toBe(false);
  });
});

describe("steelRequired", () => {
  it("warren requires steel", () => {
    expect(steelRequired("warren")).toBe(true);
  });
  it("king post does not", () => {
    expect(steelRequired("king_post")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("warren best for long span bridge", () => {
    expect(bestApplication("warren")).toBe("long_span_bridge");
  });
});

describe("costPerMeter", () => {
  it("pratt costs most", () => {
    expect(costPerMeter("pratt")).toBeGreaterThan(
      costPerMeter("king_post")
    );
  });
});

describe("trussTypes", () => {
  it("returns 5 types", () => {
    expect(trussTypes()).toHaveLength(5);
  });
});
