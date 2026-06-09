import { describe, it, expect } from "vitest";
import {
  lineStrength, lineDiameter, leaderLength, hookSize,
  rodLength, rodPower, castDistance, sinkRate, dragSetting,
  flyWeight, tidalWindow, baitAmount, keeperSize, bagLimit,
  fishingTypes,
} from "../fishing-calc.js";

describe("lineStrength", () => {
  it("above fish weight", () => {
    expect(lineStrength(10)).toBeGreaterThan(10);
  });
});

describe("lineDiameter", () => {
  it("braided thinnest", () => {
    expect(lineDiameter(20, "braided")).toBeLessThan(lineDiameter(20, "monofilament"));
  });
});

describe("leaderLength", () => {
  it("longer in clear water", () => {
    expect(leaderLength("bass", "clear")).toBeGreaterThan(leaderLength("bass", "murky"));
  });
});

describe("hookSize", () => {
  it("smaller number for bigger fish", () => {
    expect(hookSize(20)).toBeLessThan(hookSize(2));
  });
});

describe("rodLength", () => {
  it("surf longest", () => {
    expect(rodLength("surf")).toBeGreaterThan(rodLength("spinning"));
  });

  it("ice shortest", () => {
    expect(rodLength("ice")).toBeLessThan(rodLength("fly"));
  });
});

describe("rodPower", () => {
  it("ultralight for small fish", () => {
    expect(rodPower(1)).toBe("ultralight");
  });

  it("heavy for big fish", () => {
    expect(rodPower(30)).toBe("heavy");
  });
});

describe("castDistance", () => {
  it("positive feet", () => {
    expect(castDistance(7, 0.5)).toBeGreaterThan(0);
  });
});

describe("sinkRate", () => {
  it("positive for heavy lure", () => {
    expect(sinkRate(1, 5)).toBeGreaterThan(0);
  });
});

describe("dragSetting", () => {
  it("about 1/3 of line test", () => {
    expect(dragSetting(30)).toBeCloseTo(10, 0);
  });
});

describe("flyWeight", () => {
  it("larger hook = heavier fly", () => {
    expect(flyWeight(1)).toBeGreaterThan(flyWeight(12));
  });
});

describe("tidalWindow", () => {
  it("4 hour window", () => {
    const window = tidalWindow(14);
    expect(window.start).toBe(12);
    expect(window.end).toBe(16);
  });
});

describe("baitAmount", () => {
  it("positive count", () => {
    expect(baitAmount(4, 2)).toBeGreaterThan(0);
  });
});

describe("keeperSize", () => {
  it("true if above min", () => {
    expect(keeperSize(14, 16)).toBe(true);
  });

  it("false if below min", () => {
    expect(keeperSize(14, 12)).toBe(false);
  });
});

describe("bagLimit", () => {
  it("remaining count", () => {
    expect(bagLimit(5, 3)).toBe(2);
  });

  it("0 when at limit", () => {
    expect(bagLimit(5, 5)).toBe(0);
  });
});

describe("fishingTypes", () => {
  it("returns 6 types", () => {
    expect(fishingTypes()).toHaveLength(6);
  });
});
