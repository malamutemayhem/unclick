import { describe, it, expect } from "vitest";
import {
  pendulumLength, chainDropCm, cuckoosPerDay, bellowsPressurePa,
  gearTrainRatio, weightMassKg, carvingComplexity, musicDuration,
  maintenanceYears, nightShutoff, cuckooStyles,
} from "../cuckoo-clock.js";

describe("pendulumLength", () => {
  it("positive mm", () => {
    expect(pendulumLength(1)).toBeGreaterThan(0);
  });
});

describe("chainDropCm", () => {
  it("2.5 cm per hour", () => {
    expect(chainDropCm(24)).toBe(60);
  });
});

describe("cuckoosPerDay", () => {
  it("156 calls", () => {
    expect(cuckoosPerDay()).toBe(156);
  });
});

describe("bellowsPressurePa", () => {
  it("positive pressure", () => {
    expect(bellowsPressurePa(50, 10)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(bellowsPressurePa(50, 0)).toBe(0);
  });
});

describe("gearTrainRatio", () => {
  it("ratio of teeth", () => {
    expect(gearTrainRatio(10, 120)).toBe(12);
  });
  it("zero minute = 0", () => {
    expect(gearTrainRatio(0, 120)).toBe(0);
  });
});

describe("weightMassKg", () => {
  it("increases with run days", () => {
    expect(weightMassKg(8)).toBeGreaterThan(weightMassKg(1));
  });
});

describe("carvingComplexity", () => {
  it("positive score", () => {
    expect(carvingComplexity(3, 5)).toBe(105);
  });
});

describe("musicDuration", () => {
  it("positive seconds", () => {
    expect(musicDuration(50, 120)).toBeGreaterThan(0);
  });
  it("zero bpm = 0", () => {
    expect(musicDuration(50, 0)).toBe(0);
  });
});

describe("maintenanceYears", () => {
  it("quartz longest", () => {
    expect(maintenanceYears("quartz")).toBeGreaterThan(maintenanceYears("traditional"));
  });
});

describe("nightShutoff", () => {
  it("hours across midnight", () => {
    expect(nightShutoff(22, 6)).toBe(8);
  });
  it("same day span", () => {
    expect(nightShutoff(10, 18)).toBe(8);
  });
});

describe("cuckooStyles", () => {
  it("returns 5 styles", () => {
    expect(cuckooStyles()).toHaveLength(5);
  });
});
