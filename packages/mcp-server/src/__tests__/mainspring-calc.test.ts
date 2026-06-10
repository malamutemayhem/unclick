import { describe, it, expect } from "vitest";
import {
  springLengthMm, thicknessMm, widthMm, powerReserveHours, torqueNmm,
  fatigueLifeCycles, corrosionResistance, windingClickCount,
  costEstimate, springSteels,
} from "../mainspring-calc.js";

describe("springLengthMm", () => {
  it("more turns = longer spring", () => {
    expect(springLengthMm(20, 10)).toBeGreaterThan(springLengthMm(20, 5));
  });
});

describe("thicknessMm", () => {
  it("larger barrel = thicker spring", () => {
    expect(thicknessMm(30)).toBeGreaterThan(thicknessMm(15));
  });
});

describe("widthMm", () => {
  it("75% of barrel height", () => {
    expect(widthMm(10)).toBe(7.5);
  });
});

describe("powerReserveHours", () => {
  it("more turns = longer reserve", () => {
    expect(powerReserveHours(10, 3600)).toBeGreaterThan(powerReserveHours(5, 3600));
  });
  it("zero bph returns 0", () => {
    expect(powerReserveHours(10, 0)).toBe(0);
  });
});

describe("torqueNmm", () => {
  it("nivaflex has highest torque factor", () => {
    expect(torqueNmm("nivaflex", 0.5, 4)).toBeGreaterThan(
      torqueNmm("carbon", 0.5, 4)
    );
  });
});

describe("fatigueLifeCycles", () => {
  it("nivaflex lasts longest", () => {
    expect(fatigueLifeCycles("nivaflex")).toBeGreaterThan(fatigueLifeCycles("carbon"));
  });
});

describe("corrosionResistance", () => {
  it("nivaflex and elgiloy best resistance", () => {
    expect(corrosionResistance("nivaflex")).toBeGreaterThan(
      corrosionResistance("carbon")
    );
  });
});

describe("windingClickCount", () => {
  it("2x turns", () => {
    expect(windingClickCount(8)).toBe(16);
  });
});

describe("costEstimate", () => {
  it("nivaflex is most expensive", () => {
    expect(costEstimate("nivaflex")).toBeGreaterThan(costEstimate("carbon"));
  });
});

describe("springSteels", () => {
  it("returns 5 steels", () => {
    expect(springSteels()).toHaveLength(5);
  });
});
