import { describe, it, expect } from "vitest";
import {
  speed, quality, consistency, runLength,
  gpCost, engraved, forLongRun, cell,
  bestUse, gravurePrintTypes,
} from "../gravure-print-calc.js";

describe("speed", () => {
  it("publication rotogravure fastest", () => {
    expect(speed("publication_rotogravure")).toBeGreaterThan(speed("security_intaglio_banknote"));
  });
});

describe("quality", () => {
  it("security intaglio best quality", () => {
    expect(quality("security_intaglio_banknote")).toBeGreaterThan(quality("textile_roller_fabric"));
  });
});

describe("consistency", () => {
  it("publication most consistent", () => {
    expect(consistency("publication_rotogravure")).toBeGreaterThan(consistency("decorative_woodgrain_laminate"));
  });
});

describe("runLength", () => {
  it("publication longest run", () => {
    expect(runLength("publication_rotogravure")).toBeGreaterThan(runLength("security_intaglio_banknote"));
  });
});

describe("gpCost", () => {
  it("security most expensive", () => {
    expect(gpCost("security_intaglio_banknote")).toBeGreaterThan(gpCost("textile_roller_fabric"));
  });
});

describe("engraved", () => {
  it("all gravure is engraved", () => {
    expect(engraved("publication_rotogravure")).toBe(true);
  });
});

describe("forLongRun", () => {
  it("publication for long run", () => {
    expect(forLongRun("publication_rotogravure")).toBe(true);
  });
  it("security not for long run", () => {
    expect(forLongRun("security_intaglio_banknote")).toBe(false);
  });
});

describe("cell", () => {
  it("security uses hand steel die", () => {
    expect(cell("security_intaglio_banknote")).toBe("hand_steel_die_deep_engrave");
  });
});

describe("bestUse", () => {
  it("publication for magazine catalog", () => {
    expect(bestUse("publication_rotogravure")).toBe("magazine_catalog_million_run");
  });
});

describe("gravurePrintTypes", () => {
  it("returns 5 types", () => {
    expect(gravurePrintTypes()).toHaveLength(5);
  });
});
