import { describe, it, expect } from "vitest";
import {
  colonySize, pollinationEfficiency, flightRangeKm,
  coldTolerance, honeyProduction, social,
  stings, nestLocation, economicValue, beeTypes,
} from "../bee-type-calc.js";

describe("colonySize", () => {
  it("honeybee has largest colony", () => {
    expect(colonySize("honeybee")).toBeGreaterThan(
      colonySize("bumblebee")
    );
  });
});

describe("pollinationEfficiency", () => {
  it("mason bee is most efficient pollinator", () => {
    expect(pollinationEfficiency("mason")).toBeGreaterThan(
      pollinationEfficiency("honeybee")
    );
  });
});

describe("flightRangeKm", () => {
  it("honeybee flies farthest", () => {
    expect(flightRangeKm("honeybee")).toBeGreaterThan(
      flightRangeKm("mason")
    );
  });
});

describe("coldTolerance", () => {
  it("bumblebee is most cold tolerant", () => {
    expect(coldTolerance("bumblebee")).toBeGreaterThan(
      coldTolerance("sweat")
    );
  });
});

describe("honeyProduction", () => {
  it("honeybee produces most honey", () => {
    expect(honeyProduction("honeybee")).toBeGreaterThan(
      honeyProduction("bumblebee")
    );
  });
});

describe("social", () => {
  it("honeybee is social", () => {
    expect(social("honeybee")).toBe(true);
  });
  it("mason is not", () => {
    expect(social("mason")).toBe(false);
  });
});

describe("stings", () => {
  it("honeybee stings", () => {
    expect(stings("honeybee")).toBe(true);
  });
  it("mason does not", () => {
    expect(stings("mason")).toBe(false);
  });
});

describe("nestLocation", () => {
  it("carpenter nests in wood tunnel", () => {
    expect(nestLocation("carpenter")).toBe("wood_tunnel");
  });
});

describe("economicValue", () => {
  it("honeybee has highest economic value", () => {
    expect(economicValue("honeybee")).toBeGreaterThan(
      economicValue("carpenter")
    );
  });
});

describe("beeTypes", () => {
  it("returns 5 types", () => {
    expect(beeTypes()).toHaveLength(5);
  });
});
