import { describe, it, expect } from "vitest";
import {
  indicatedToTrue, machNumber, groundSpeed,
  windCorrectionAngle, densityAltitude, pressureAltitude,
  fuelBurn, endurance, range, timeEnRoute,
  topOfDescent, crosswindComponent, weightAndBalance,
  isaTemperature, cloudBase, visibilityCategory,
  fuelRequired, formatTime,
} from "../aviation-calc.js";

describe("indicatedToTrue", () => {
  it("TAS > IAS at altitude", () => {
    const tas = indicatedToTrue(120, 5000, 10);
    expect(tas).toBeGreaterThan(120);
  });
});

describe("machNumber", () => {
  it("positive mach at cruise speed", () => {
    const m = machNumber(250, -20);
    expect(m).toBeGreaterThan(0);
    expect(m).toBeLessThan(1);
  });
});

describe("groundSpeed", () => {
  it("headwind reduces GS", () => {
    expect(groundSpeed(120, 20, 0)).toBeCloseTo(100);
  });

  it("tailwind increases GS", () => {
    expect(groundSpeed(120, 20, 180)).toBeCloseTo(140);
  });
});

describe("windCorrectionAngle", () => {
  it("zero for headwind", () => {
    expect(windCorrectionAngle(120, 20, 0)).toBeCloseTo(0);
  });

  it("positive for crosswind", () => {
    const wca = windCorrectionAngle(120, 20, 90);
    expect(Math.abs(wca)).toBeGreaterThan(0);
  });
});

describe("densityAltitude", () => {
  it("higher in hot weather", () => {
    const hot = densityAltitude(5000, 30);
    const cold = densityAltitude(5000, 0);
    expect(hot).toBeGreaterThan(cold);
  });
});

describe("pressureAltitude", () => {
  it("standard setting = field elevation", () => {
    expect(pressureAltitude(5000, 29.92)).toBe(5000);
  });
});

describe("fuelBurn", () => {
  it("computes total fuel", () => {
    expect(fuelBurn(10, 2)).toBe(20);
  });
});

describe("endurance", () => {
  it("subtracts reserve", () => {
    const hrs = endurance(50, 10, 45);
    expect(hrs).toBeCloseTo(4.25);
  });
});

describe("range", () => {
  it("distance = time * speed", () => {
    expect(range(4, 120)).toBe(480);
  });
});

describe("timeEnRoute", () => {
  it("time = distance / speed", () => {
    expect(timeEnRoute(240, 120)).toBe(2);
  });
});

describe("topOfDescent", () => {
  it("returns positive distance", () => {
    expect(topOfDescent(8000, 1000)).toBeGreaterThan(0);
  });
});

describe("crosswindComponent", () => {
  it("pure headwind", () => {
    const result = crosswindComponent(20, 0);
    expect(result.headwind).toBeCloseTo(20);
    expect(result.crosswind).toBeCloseTo(0);
  });

  it("pure crosswind", () => {
    const result = crosswindComponent(20, 90);
    expect(result.headwind).toBeCloseTo(0);
    expect(result.crosswind).toBeCloseTo(20);
  });
});

describe("weightAndBalance", () => {
  it("computes CG", () => {
    const result = weightAndBalance([
      { weight: 170, arm: 37 },
      { weight: 200, arm: 73 },
    ]);
    expect(result.totalWeight).toBe(370);
    expect(result.cg).toBeGreaterThan(37);
    expect(result.cg).toBeLessThan(73);
  });
});

describe("isaTemperature", () => {
  it("15C at sea level", () => {
    expect(isaTemperature(0)).toBe(15);
  });
});

describe("cloudBase", () => {
  it("higher with larger spread", () => {
    expect(cloudBase(20, 10)).toBeGreaterThan(cloudBase(20, 15));
  });
});

describe("visibilityCategory", () => {
  it("VFR for good conditions", () => {
    expect(visibilityCategory(10, 5000)).toBe("VFR");
  });

  it("IFR for poor conditions", () => {
    expect(visibilityCategory(2, 800)).toBe("IFR");
  });
});

describe("fuelRequired", () => {
  it("includes reserve", () => {
    const fuel = fuelRequired(240, 120, 10);
    expect(fuel).toBeGreaterThan(20);
  });
});

describe("formatTime", () => {
  it("formats hours", () => {
    expect(formatTime(2.5)).toBe("2:30");
  });
});
