import { describe, it, expect } from "vitest";
import {
  richterToEnergy, energyToRichter, magnitudeCompare,
  intensityDescription, estimatedFrequency,
  pWaveArrival, sWaveArrival, spTimeDifference,
  distanceFromSPTime, peakGroundAcceleration,
  mercalliFromPGA, mercalliDescription,
  tsunamiRisk, aftershockEstimate, faultLength, epicentralDistance,
} from "../seismograph-calc.js";

describe("richterToEnergy / energyToRichter", () => {
  it("magnitude 5 produces energy", () => {
    const e = richterToEnergy(5);
    expect(e).toBeGreaterThan(0);
  });

  it("round trips", () => {
    const e = richterToEnergy(6.0);
    expect(energyToRichter(e)).toBeCloseTo(6.0, 0);
  });
});

describe("magnitudeCompare", () => {
  it("1 magnitude difference = ~31.6x energy", () => {
    const comp = magnitudeCompare(6, 5);
    expect(comp.energyRatio).toBeCloseTo(31.6, 0);
    expect(comp.amplitudeRatio).toBeCloseTo(10, 0);
  });
});

describe("intensityDescription", () => {
  it("moderate for 4.5", () => {
    expect(intensityDescription(4.5)).toBe("moderate");
  });

  it("great for 7.5", () => {
    expect(intensityDescription(7.5)).toBe("great");
  });
});

describe("estimatedFrequency", () => {
  it("returns frequency string", () => {
    expect(estimatedFrequency(8)).toBe("1 per year");
  });
});

describe("wave arrivals", () => {
  it("P-wave arrives before S-wave", () => {
    expect(pWaveArrival(100)).toBeLessThan(sWaveArrival(100));
  });

  it("SP time difference positive", () => {
    expect(spTimeDifference(100)).toBeGreaterThan(0);
  });

  it("distance from SP time", () => {
    const sp = spTimeDifference(200);
    expect(distanceFromSPTime(sp)).toBeCloseTo(200, 0);
  });
});

describe("peakGroundAcceleration", () => {
  it("higher for closer quakes", () => {
    const close = peakGroundAcceleration(6, 10);
    const far = peakGroundAcceleration(6, 100);
    expect(close).toBeGreaterThan(far);
  });
});

describe("mercalliFromPGA / mercalliDescription", () => {
  it("low PGA = low intensity", () => {
    expect(mercalliFromPGA(0.1)).toBeLessThan(5);
  });

  it("describes intensity", () => {
    expect(mercalliDescription(5)).toBe("Moderate");
  });
});

describe("tsunamiRisk", () => {
  it("none for inland", () => {
    expect(tsunamiRisk(8, 10, false)).toBe("none");
  });

  it("high for large undersea", () => {
    expect(tsunamiRisk(7.8, 20, true)).toBe("high");
  });
});

describe("aftershockEstimate", () => {
  it("largest aftershock ~1.2 less", () => {
    const est = aftershockEstimate(7);
    expect(est.magnitude).toBeCloseTo(5.8);
    expect(est.count).toBeGreaterThan(0);
  });
});

describe("faultLength", () => {
  it("larger for bigger quakes", () => {
    expect(faultLength(7)).toBeGreaterThan(faultLength(5));
  });
});

describe("epicentralDistance", () => {
  it("0 for same point", () => {
    expect(epicentralDistance(0, 0, 0, 0)).toBe(0);
  });

  it("positive for different points", () => {
    expect(epicentralDistance(35, 139, 36, 140)).toBeGreaterThan(0);
  });
});
