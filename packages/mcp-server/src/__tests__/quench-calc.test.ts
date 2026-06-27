import { describe, it, expect } from "vitest";
import {
  coolingRateCPerSec, bathVolumeLiters, bathTemperatureCelsius,
  soakTimeSeconds, hardnessHrc, distortionRisk, crackRisk,
  agitationRequired, vaporBarrierBreakCelsius, costPerLiter, quenchMedia,
} from "../quench-calc.js";

describe("coolingRateCPerSec", () => {
  it("brine fastest", () => {
    expect(coolingRateCPerSec("brine")).toBeGreaterThan(coolingRateCPerSec("oil"));
  });
});

describe("bathVolumeLiters", () => {
  it("10x piece weight", () => {
    expect(bathVolumeLiters(5)).toBe(50);
  });
});

describe("bathTemperatureCelsius", () => {
  it("oil warmest", () => {
    expect(bathTemperatureCelsius("oil")).toBeGreaterThan(bathTemperatureCelsius("brine"));
  });
});

describe("soakTimeSeconds", () => {
  it("air slowest", () => {
    expect(soakTimeSeconds(10, "air")).toBeGreaterThan(soakTimeSeconds(10, "water"));
  });
});

describe("hardnessHrc", () => {
  it("brine hardest", () => {
    expect(hardnessHrc(0.8, "brine")).toBeGreaterThan(hardnessHrc(0.8, "air"));
  });
});

describe("distortionRisk", () => {
  it("brine highest risk", () => {
    expect(distortionRisk("brine")).toBeGreaterThan(distortionRisk("air"));
  });
});

describe("crackRisk", () => {
  it("brine highest risk", () => {
    expect(crackRisk("brine", 10)).toBeGreaterThan(crackRisk("air", 10));
  });
});

describe("agitationRequired", () => {
  it("water needs agitation", () => {
    expect(agitationRequired("water")).toBe(true);
  });
  it("air does not", () => {
    expect(agitationRequired("air")).toBe(false);
  });
});

describe("vaporBarrierBreakCelsius", () => {
  it("brine lowest break temp", () => {
    expect(vaporBarrierBreakCelsius("brine")).toBeLessThan(vaporBarrierBreakCelsius("oil"));
  });
});

describe("costPerLiter", () => {
  it("polymer most expensive", () => {
    expect(costPerLiter("polymer")).toBeGreaterThan(costPerLiter("water"));
  });
});

describe("quenchMedia", () => {
  it("returns 5 media", () => {
    expect(quenchMedia()).toHaveLength(5);
  });
});
