import { describe, it, expect } from "vitest";
import {
  uprightCount, wattleRods, daubVolumeLiters, clayRatio,
  dryingDays, thermalResistance, loadBearing, plasterCoats,
  maintenanceYears, soundInsulation, wallFinishes,
} from "../wattle-daub.js";

describe("uprightCount", () => {
  it("positive count", () => {
    expect(uprightCount(5, 30)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(uprightCount(5, 0)).toBe(0);
  });
});

describe("wattleRods", () => {
  it("positive rods", () => {
    expect(wattleRods(10, 5)).toBeGreaterThan(0);
  });
});

describe("daubVolumeLiters", () => {
  it("positive liters", () => {
    expect(daubVolumeLiters(10, 5)).toBeGreaterThan(0);
  });
});

describe("clayRatio", () => {
  it("sums to 100", () => {
    const r = clayRatio();
    expect(r.clay + r.sand + r.straw + r.water).toBe(100);
  });
});

describe("dryingDays", () => {
  it("faster in warmth", () => {
    expect(dryingDays(5, 25)).toBeLessThan(dryingDays(5, 5));
  });
});

describe("thermalResistance", () => {
  it("increases with thickness", () => {
    expect(thermalResistance(20)).toBeGreaterThan(thermalResistance(10));
  });
});

describe("loadBearing", () => {
  it("true for thick low wall", () => {
    expect(loadBearing(20, 2.5)).toBe(true);
  });
  it("false for thin wall", () => {
    expect(loadBearing(10, 2)).toBe(false);
  });
});

describe("plasterCoats", () => {
  it("exposed = 0", () => {
    expect(plasterCoats("exposed")).toBe(0);
  });
  it("limewash = 3", () => {
    expect(plasterCoats("limewash")).toBe(3);
  });
});

describe("maintenanceYears", () => {
  it("roughcast longest", () => {
    expect(maintenanceYears("roughcast")).toBeGreaterThan(maintenanceYears("limewash"));
  });
});

describe("soundInsulation", () => {
  it("positive dB", () => {
    expect(soundInsulation(15)).toBeGreaterThan(0);
  });
});

describe("wallFinishes", () => {
  it("returns 5 finishes", () => {
    expect(wallFinishes()).toHaveLength(5);
  });
});
