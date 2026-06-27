import { describe, it, expect } from "vitest";
import {
  maxDepthM, ata, airConsumption, diveTime, mod, ead,
  bestMix, safetyStop, ascentRate, ascentTime, weightKg,
  nitrogenLoad, surfaceInterval, gasMixes,
} from "../scuba-calc.js";

describe("maxDepthM", () => {
  it("open water is 18m", () => {
    expect(maxDepthM("open_water")).toBe(18);
  });

  it("divemaster is 40m", () => {
    expect(maxDepthM("divemaster")).toBe(40);
  });
});

describe("ata", () => {
  it("surface is 1", () => {
    expect(ata(0)).toBe(1);
  });

  it("10m is 2", () => {
    expect(ata(10)).toBe(2);
  });
});

describe("airConsumption", () => {
  it("doubles at 10m", () => {
    expect(airConsumption(20, 10)).toBe(40);
  });
});

describe("diveTime", () => {
  it("positive minutes", () => {
    expect(diveTime(200, 20, 20)).toBeGreaterThan(0);
  });
});

describe("mod", () => {
  it("air MOD around 56m", () => {
    expect(mod(21)).toBeGreaterThan(50);
  });

  it("ean36 shallower", () => {
    expect(mod(36)).toBeLessThan(mod(21));
  });
});

describe("ead", () => {
  it("shallower with nitrox", () => {
    expect(ead(30, 36)).toBeLessThan(30);
  });
});

describe("bestMix", () => {
  it("higher O2 for shallow", () => {
    expect(bestMix(20)).toBeGreaterThan(bestMix(30));
  });
});

describe("safetyStop", () => {
  it("5m for 3 min", () => {
    const stop = safetyStop();
    expect(stop.depthM).toBe(5);
    expect(stop.minutes).toBe(3);
  });
});

describe("ascentRate", () => {
  it("max 9m/min", () => {
    expect(ascentRate(30)).toBe(9);
  });
});

describe("ascentTime", () => {
  it("includes safety stop", () => {
    expect(ascentTime(20)).toBeGreaterThan(3);
  });
});

describe("weightKg", () => {
  it("more in salt water", () => {
    expect(weightKg(80, 5, "salt")).toBeGreaterThan(weightKg(80, 5, "fresh"));
  });
});

describe("nitrogenLoad", () => {
  it("positive load", () => {
    expect(nitrogenLoad(20, 40)).toBeGreaterThan(0);
  });
});

describe("surfaceInterval", () => {
  it("positive minutes", () => {
    expect(surfaceInterval(1.5)).toBeGreaterThan(0);
  });
});

describe("gasMixes", () => {
  it("returns 4 mixes", () => {
    expect(gasMixes()).toHaveLength(4);
  });
});
