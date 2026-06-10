import { describe, it, expect } from "vitest";
import {
  penetration, woundChannel, targetDamage, flightAccuracy,
  recoverability, legalForHunting, hasCuttingEdge, primaryUse,
  historicalEra, arrowheadTypes,
} from "../arrowhead-type-calc.js";

describe("penetration", () => {
  it("broadhead highest penetration", () => {
    expect(penetration("broadhead")).toBeGreaterThan(penetration("blunt"));
  });
});

describe("woundChannel", () => {
  it("broadhead largest wound channel", () => {
    expect(woundChannel("broadhead")).toBeGreaterThan(woundChannel("field_point"));
  });
});

describe("targetDamage", () => {
  it("broadhead most target damage", () => {
    expect(targetDamage("broadhead")).toBeGreaterThan(targetDamage("judo"));
  });
});

describe("flightAccuracy", () => {
  it("field point most accurate in flight", () => {
    expect(flightAccuracy("field_point")).toBeGreaterThan(flightAccuracy("broadhead"));
  });
});

describe("recoverability", () => {
  it("judo most recoverable", () => {
    expect(recoverability("judo")).toBeGreaterThan(recoverability("broadhead"));
  });
});

describe("legalForHunting", () => {
  it("broadhead is legal for hunting", () => {
    expect(legalForHunting("broadhead")).toBe(true);
  });
  it("field point is not", () => {
    expect(legalForHunting("field_point")).toBe(false);
  });
});

describe("hasCuttingEdge", () => {
  it("broadhead has cutting edge", () => {
    expect(hasCuttingEdge("broadhead")).toBe(true);
  });
  it("blunt does not", () => {
    expect(hasCuttingEdge("blunt")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("field point for target practice", () => {
    expect(primaryUse("field_point")).toBe("target_practice");
  });
});

describe("historicalEra", () => {
  it("bodkin is medieval", () => {
    expect(historicalEra("bodkin")).toBe("medieval");
  });
});

describe("arrowheadTypes", () => {
  it("returns 5 types", () => {
    expect(arrowheadTypes()).toHaveLength(5);
  });
});
