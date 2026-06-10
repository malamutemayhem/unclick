import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, burnTimeHours, smokeLevel,
  colorVariation, carbonTrapping, ashGlazeEffect,
  pitDepthCm, predictability, costPerFiring, pitFiringFuels,
} from "../pit-firing-calc.js";

describe("maxTempCelsius", () => {
  it("charcoal reaches highest temp", () => {
    expect(maxTempCelsius("charcoal")).toBeGreaterThan(
      maxTempCelsius("straw")
    );
  });
});

describe("burnTimeHours", () => {
  it("charcoal burns longest", () => {
    expect(burnTimeHours("charcoal")).toBeGreaterThan(
      burnTimeHours("straw")
    );
  });
});

describe("smokeLevel", () => {
  it("dung produces most smoke", () => {
    expect(smokeLevel("dung")).toBeGreaterThan(
      smokeLevel("charcoal")
    );
  });
});

describe("colorVariation", () => {
  it("sawdust gives most variation", () => {
    expect(colorVariation("sawdust")).toBeGreaterThan(
      colorVariation("charcoal")
    );
  });
});

describe("carbonTrapping", () => {
  it("sawdust traps most carbon", () => {
    expect(carbonTrapping("sawdust")).toBeGreaterThan(
      carbonTrapping("straw")
    );
  });
});

describe("ashGlazeEffect", () => {
  it("wood produces best ash glaze", () => {
    expect(ashGlazeEffect("wood")).toBeGreaterThan(
      ashGlazeEffect("charcoal")
    );
  });
});

describe("pitDepthCm", () => {
  it("wood needs deepest pit", () => {
    expect(pitDepthCm("wood")).toBeGreaterThan(
      pitDepthCm("straw")
    );
  });
});

describe("predictability", () => {
  it("charcoal is most predictable", () => {
    expect(predictability("charcoal")).toBeGreaterThan(
      predictability("straw")
    );
  });
});

describe("costPerFiring", () => {
  it("charcoal is most expensive", () => {
    expect(costPerFiring("charcoal")).toBeGreaterThan(
      costPerFiring("dung")
    );
  });
});

describe("pitFiringFuels", () => {
  it("returns 5 fuels", () => {
    expect(pitFiringFuels()).toHaveLength(5);
  });
});
