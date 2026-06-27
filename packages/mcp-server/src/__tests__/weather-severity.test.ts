import { describe, it, expect } from "vitest";
import {
  heatIndex, windChill, dewPoint, beaufortScale, uvSeverity,
  visibilityCategory, thunderstormRisk, floodRisk, airQualityCategory,
  pollenSeverity, frostRisk, saffirSimpson, tornadoEF,
  drivingCondition, compositeScore,
} from "../weather-severity.js";

describe("heatIndex", () => {
  it("increases with humidity", () => {
    expect(heatIndex(35, 80)).toBeGreaterThan(heatIndex(35, 30));
  });
});

describe("windChill", () => {
  it("lower than temp in wind", () => {
    expect(windChill(-10, 30)).toBeLessThan(-10);
  });

  it("returns temp when warm", () => {
    expect(windChill(15, 30)).toBe(15);
  });
});

describe("dewPoint", () => {
  it("lower than air temp", () => {
    expect(dewPoint(25, 50)).toBeLessThan(25);
  });
});

describe("beaufortScale", () => {
  it("calm at 0 kmh", () => {
    expect(beaufortScale(0).description).toBe("Calm");
  });

  it("hurricane at 120+", () => {
    expect(beaufortScale(120).force).toBe(12);
  });
});

describe("uvSeverity", () => {
  it("minimal at low UV", () => {
    expect(uvSeverity(2)).toBe("minimal");
  });

  it("extreme at high UV", () => {
    expect(uvSeverity(11)).toBe("extreme");
  });
});

describe("visibilityCategory", () => {
  it("clear at 10km+", () => {
    expect(visibilityCategory(15)).toBe("clear");
  });

  it("fog under 1km", () => {
    expect(visibilityCategory(0.5)).toBe("fog");
  });
});

describe("thunderstormRisk", () => {
  it("minimal at low CAPE", () => {
    expect(thunderstormRisk(100, 5)).toBe("minimal");
  });

  it("severe at high CAPE + shear", () => {
    expect(thunderstormRisk(2000, 25)).toBe("severe");
  });
});

describe("floodRisk", () => {
  it("higher with saturated soil", () => {
    const dry = floodRisk(30, 2, 20);
    const wet = floodRisk(30, 2, 90);
    const levels: Record<string, number> = { minimal: 0, minor: 1, moderate: 2, severe: 3, extreme: 4 };
    expect(levels[wet]).toBeGreaterThanOrEqual(levels[dry]);
  });
});

describe("airQualityCategory", () => {
  it("good at 50", () => {
    expect(airQualityCategory(50)).toBe("Good");
  });

  it("hazardous at 301", () => {
    expect(airQualityCategory(301)).toBe("Hazardous");
  });
});

describe("pollenSeverity", () => {
  it("minimal at low count", () => {
    expect(pollenSeverity(10)).toBe("minimal");
  });
});

describe("frostRisk", () => {
  it("true when cold", () => {
    expect(frostRisk(-5, -8, 20)).toBe(true);
  });

  it("false when warm", () => {
    expect(frostRisk(20, 15, 10)).toBe(false);
  });
});

describe("saffirSimpson", () => {
  it("cat 0 below 119", () => {
    expect(saffirSimpson(100)).toBe(0);
  });

  it("cat 5 at 252+", () => {
    expect(saffirSimpson(260)).toBe(5);
  });
});

describe("tornadoEF", () => {
  it("EF0 below 138", () => {
    expect(tornadoEF(110)).toBe(1);
  });
});

describe("drivingCondition", () => {
  it("good in clear weather", () => {
    expect(drivingCondition(20, 15, 10, 0)).toBe("good");
  });

  it("dangerous in fog", () => {
    expect(drivingCondition(5, 0.3, 20, 0)).toBe("dangerous");
  });
});

describe("compositeScore", () => {
  it("averages scores", () => {
    const conditions = [
      { type: "wind", severity: "moderate" as const, score: 5, recommendation: "caution" },
      { type: "rain", severity: "minor" as const, score: 3, recommendation: "umbrella" },
    ];
    expect(compositeScore(conditions)).toBe(4);
  });

  it("0 for empty", () => {
    expect(compositeScore([])).toBe(0);
  });
});
