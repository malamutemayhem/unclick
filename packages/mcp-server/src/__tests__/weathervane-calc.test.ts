import { describe, it, expect } from "vitest";
import {
  tailArea, counterbalanceWeight, bearingFriction, responseWindSpeed,
  mountingHeight, cardinalAccuracy, lightningRodRequired,
  gildingArea, windResistanceN, maintenanceYears, vaneDesigns,
} from "../weathervane-calc.js";

describe("tailArea", () => {
  it("positive area", () => {
    expect(tailArea(60, 20)).toBeGreaterThan(0);
  });
});

describe("counterbalanceWeight", () => {
  it("positive weight", () => {
    expect(counterbalanceWeight(800, 7.8)).toBeGreaterThan(0);
  });
});

describe("bearingFriction", () => {
  it("positive friction", () => {
    expect(bearingFriction(5)).toBeGreaterThan(0);
  });
});

describe("responseWindSpeed", () => {
  it("positive speed", () => {
    expect(responseWindSpeed(5, 800)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(responseWindSpeed(5, 0)).toBe(0);
  });
});

describe("mountingHeight", () => {
  it("above building", () => {
    expect(mountingHeight(10)).toBeGreaterThan(10);
  });
});

describe("cardinalAccuracy", () => {
  it("observatory most accurate", () => {
    expect(cardinalAccuracy("observatory")).toBeLessThan(cardinalAccuracy("basic"));
  });
});

describe("lightningRodRequired", () => {
  it("needed above 10m", () => {
    expect(lightningRodRequired(15)).toBe(true);
  });
  it("not needed below 10m", () => {
    expect(lightningRodRequired(8)).toBe(false);
  });
});

describe("gildingArea", () => {
  it("banner most gilding", () => {
    expect(gildingArea(60, 20, "banner")).toBeGreaterThan(gildingArea(60, 20, "arrow"));
  });
});

describe("windResistanceN", () => {
  it("positive N", () => {
    expect(windResistanceN(10, 0.05)).toBeGreaterThan(0);
  });
});

describe("maintenanceYears", () => {
  it("copper lasts longest", () => {
    expect(maintenanceYears("copper")).toBeGreaterThan(maintenanceYears("wood"));
  });
});

describe("vaneDesigns", () => {
  it("returns 5 designs", () => {
    expect(vaneDesigns()).toHaveLength(5);
  });
});
