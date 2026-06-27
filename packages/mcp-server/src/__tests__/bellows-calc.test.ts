import { describe, it, expect } from "vitest";
import {
  volumeLiters, airflowLpm, pressureKpa, plateArea, hingeAngle,
  nozzleDiameter, leatherArea, foldCount, handleForceN,
  valveSize, lifespan, bellowsTypes,
} from "../bellows-calc.js";

describe("volumeLiters", () => {
  it("blast_furnace largest", () => {
    expect(volumeLiters("blast_furnace")).toBeGreaterThan(volumeLiters("forge"));
  });
});

describe("airflowLpm", () => {
  it("positive flow", () => {
    expect(airflowLpm(15, 10)).toBeGreaterThan(0);
  });
});

describe("pressureKpa", () => {
  it("blast_furnace highest", () => {
    expect(pressureKpa("blast_furnace")).toBeGreaterThan(pressureKpa("fireplace"));
  });
});

describe("plateArea", () => {
  it("positive area", () => {
    expect(plateArea(15, 20)).toBeGreaterThan(0);
  });
  it("zero stroke = 0", () => {
    expect(plateArea(15, 0)).toBe(0);
  });
});

describe("hingeAngle", () => {
  it("positive degrees", () => {
    expect(hingeAngle(10, 30)).toBeGreaterThan(0);
  });
});

describe("nozzleDiameter", () => {
  it("positive mm", () => {
    expect(nozzleDiameter(100)).toBeGreaterThan(0);
  });
});

describe("leatherArea", () => {
  it("positive cm2", () => {
    expect(leatherArea(30, 20, 1)).toBeGreaterThan(0);
  });
});

describe("foldCount", () => {
  it("accordion = 12", () => {
    expect(foldCount("accordion")).toBe(12);
  });
});

describe("handleForceN", () => {
  it("positive newtons", () => {
    expect(handleForceN(3, 0.05)).toBeGreaterThan(0);
  });
});

describe("valveSize", () => {
  it("1.5x nozzle", () => {
    expect(valveSize(10)).toBe(15);
  });
});

describe("lifespan", () => {
  it("synthetic longest", () => {
    expect(lifespan("synthetic")).toBeGreaterThan(lifespan("canvas"));
  });
});

describe("bellowsTypes", () => {
  it("returns 5 types", () => {
    expect(bellowsTypes()).toHaveLength(5);
  });
});
