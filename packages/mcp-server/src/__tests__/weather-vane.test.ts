import { describe, it, expect } from "vitest";
import {
  compassBearing, cardinalDirection, vaneLength, balancePoint,
  pointerWeight, mountingHeight, responseTime, minWindSpeed,
  bearingType, lightningRodRequired, patinaDays, installationCost,
  vaneStyles,
} from "../weather-vane.js";

describe("compassBearing", () => {
  it("0 = N", () => {
    expect(compassBearing(0)).toBe("N");
  });
  it("90 = E", () => {
    expect(compassBearing(90)).toBe("E");
  });
  it("180 = S", () => {
    expect(compassBearing(180)).toBe("S");
  });
  it("270 = W", () => {
    expect(compassBearing(270)).toBe("W");
  });
});

describe("cardinalDirection", () => {
  it("350 = N", () => {
    expect(cardinalDirection(350)).toBe("N");
  });
  it("100 = E", () => {
    expect(cardinalDirection(100)).toBe("E");
  });
});

describe("vaneLength", () => {
  it("60% of mount height", () => {
    expect(vaneLength(10)).toBe(6);
  });
});

describe("balancePoint", () => {
  it("40% from tip", () => {
    expect(balancePoint(50)).toBe(20);
  });
});

describe("pointerWeight", () => {
  it("copper heavier than aluminum", () => {
    expect(pointerWeight(60, "copper")).toBeGreaterThan(pointerWeight(60, "aluminum"));
  });
});

describe("mountingHeight", () => {
  it("1.5m above building", () => {
    expect(mountingHeight(10)).toBe(11.5);
  });
});

describe("responseTime", () => {
  it("faster in stronger wind", () => {
    expect(responseTime(1, 30)).toBeLessThan(responseTime(1, 10));
  });
  it("no wind = infinite", () => {
    expect(responseTime(1, 0)).toBe(Infinity);
  });
});

describe("minWindSpeed", () => {
  it("heavier vane needs more wind", () => {
    expect(minWindSpeed(2)).toBeGreaterThan(minWindSpeed(0.5));
  });
});

describe("bearingType", () => {
  it("outdoor = sealed", () => {
    expect(bearingType(true)).toContain("sealed");
  });
});

describe("lightningRodRequired", () => {
  it("roof ridge needs rod", () => {
    expect(lightningRodRequired("roof_ridge")).toBe(true);
  });
  it("post does not", () => {
    expect(lightningRodRequired("post")).toBe(false);
  });
});

describe("patinaDays", () => {
  it("copper takes 365 days", () => {
    expect(patinaDays("copper")).toBe(365);
  });
  it("aluminum = 0 days", () => {
    expect(patinaDays("aluminum")).toBe(0);
  });
});

describe("installationCost", () => {
  it("cupola most expensive", () => {
    expect(installationCost("cupola")).toBeGreaterThan(installationCost("post"));
  });
});

describe("vaneStyles", () => {
  it("returns 6 styles", () => {
    expect(vaneStyles()).toHaveLength(6);
  });
});
