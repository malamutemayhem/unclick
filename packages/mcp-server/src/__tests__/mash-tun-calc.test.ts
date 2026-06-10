import { describe, it, expect } from "vitest";
import {
  waterToGrainRatio, strikeWaterLiters, strikeTemperatureCelsius,
  mashDurationMinutes, spargeWaterLiters, preboilVolumeLiters,
  efficiencyPercent, grainBedDepthCm, lauterTimeMinutes, tunVolumeLiters,
  mashMethods,
} from "../mash-tun-calc.js";

describe("waterToGrainRatio", () => {
  it("turbid uses most water", () => {
    expect(waterToGrainRatio("turbid")).toBeGreaterThan(waterToGrainRatio("infusion"));
  });
});

describe("strikeWaterLiters", () => {
  it("more grain = more water", () => {
    expect(strikeWaterLiters(10, 2.5)).toBeGreaterThan(strikeWaterLiters(5, 2.5));
  });
});

describe("strikeTemperatureCelsius", () => {
  it("cold grain needs hotter water", () => {
    expect(strikeTemperatureCelsius(67, 10)).toBeGreaterThan(
      strikeTemperatureCelsius(67, 20)
    );
  });
});

describe("mashDurationMinutes", () => {
  it("turbid takes longest", () => {
    expect(mashDurationMinutes("turbid")).toBeGreaterThan(mashDurationMinutes("infusion"));
  });
});

describe("spargeWaterLiters", () => {
  it("proportional to grain weight", () => {
    expect(spargeWaterLiters(5)).toBe(16);
  });
});

describe("preboilVolumeLiters", () => {
  it("30% more than batch size", () => {
    expect(preboilVolumeLiters(20)).toBeCloseTo(26, 0);
  });
});

describe("efficiencyPercent", () => {
  it("decoction highest efficiency", () => {
    expect(efficiencyPercent("decoction")).toBeGreaterThan(efficiencyPercent("turbid"));
  });
});

describe("grainBedDepthCm", () => {
  it("more grain = deeper bed", () => {
    expect(grainBedDepthCm(10, 40)).toBeGreaterThan(grainBedDepthCm(5, 40));
  });
  it("zero diameter returns zero", () => {
    expect(grainBedDepthCm(5, 0)).toBe(0);
  });
});

describe("lauterTimeMinutes", () => {
  it("more grain = longer lauter", () => {
    expect(lauterTimeMinutes(10)).toBeGreaterThan(lauterTimeMinutes(5));
  });
});

describe("tunVolumeLiters", () => {
  it("50% larger than batch", () => {
    expect(tunVolumeLiters(20)).toBe(30);
  });
});

describe("mashMethods", () => {
  it("returns 5 methods", () => {
    expect(mashMethods()).toHaveLength(5);
  });
});
