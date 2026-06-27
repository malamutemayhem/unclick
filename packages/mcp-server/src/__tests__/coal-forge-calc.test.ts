import { describe, it, expect } from "vitest";
import {
  btuPerPound, maxTempCelsius, ashPercent, sulfurPercent, airBlastCfm,
  consumptionKgPerHour, clinkerFormation, smokeLevel, costPerKg, coalTypes,
} from "../coal-forge-calc.js";

describe("btuPerPound", () => {
  it("anthracite has highest BTU", () => {
    expect(btuPerPound("anthracite")).toBeGreaterThan(btuPerPound("charcoal"));
  });
});

describe("maxTempCelsius", () => {
  it("coke reaches highest temp", () => {
    expect(maxTempCelsius("coke")).toBeGreaterThan(maxTempCelsius("charcoal"));
  });
});

describe("ashPercent", () => {
  it("lignite has most ash", () => {
    expect(ashPercent("lignite")).toBeGreaterThan(ashPercent("coke"));
  });
});

describe("sulfurPercent", () => {
  it("charcoal has no sulfur", () => {
    expect(sulfurPercent("charcoal")).toBe(0);
  });
  it("lignite has most sulfur", () => {
    expect(sulfurPercent("lignite")).toBeGreaterThan(
      sulfurPercent("anthracite")
    );
  });
});

describe("airBlastCfm", () => {
  it("larger firepot needs more air", () => {
    expect(airBlastCfm(30)).toBeGreaterThan(airBlastCfm(15));
  });
});

describe("consumptionKgPerHour", () => {
  it("charcoal burns fastest", () => {
    expect(consumptionKgPerHour("charcoal")).toBeGreaterThan(
      consumptionKgPerHour("anthracite")
    );
  });
});

describe("clinkerFormation", () => {
  it("lignite forms most clinker", () => {
    expect(clinkerFormation("lignite")).toBeGreaterThan(
      clinkerFormation("coke")
    );
  });
});

describe("smokeLevel", () => {
  it("bituminous is smokiest", () => {
    expect(smokeLevel("bituminous")).toBeGreaterThan(
      smokeLevel("anthracite")
    );
  });
});

describe("costPerKg", () => {
  it("charcoal is most expensive", () => {
    expect(costPerKg("charcoal")).toBeGreaterThan(costPerKg("lignite"));
  });
});

describe("coalTypes", () => {
  it("returns 5 types", () => {
    expect(coalTypes()).toHaveLength(5);
  });
});
