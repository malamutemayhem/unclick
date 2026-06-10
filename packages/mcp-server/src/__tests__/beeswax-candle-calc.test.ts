import { describe, it, expect } from "vitest";
import {
  burnTempCelsius, burnTimeMultiplier, aromaLevel,
  sootLevel, natural, scentThrow,
  colorRetention, bestApplication, costPerKg, candleWaxes,
} from "../beeswax-candle-calc.js";

describe("burnTempCelsius", () => {
  it("beeswax burns hottest", () => {
    expect(burnTempCelsius("beeswax")).toBeGreaterThan(
      burnTempCelsius("soy")
    );
  });
});

describe("burnTimeMultiplier", () => {
  it("beeswax burns longest", () => {
    expect(burnTimeMultiplier("beeswax")).toBeGreaterThan(
      burnTimeMultiplier("paraffin")
    );
  });
});

describe("aromaLevel", () => {
  it("bayberry has best aroma", () => {
    expect(aromaLevel("bayberry")).toBeGreaterThan(
      aromaLevel("paraffin")
    );
  });
});

describe("sootLevel", () => {
  it("paraffin produces most soot", () => {
    expect(sootLevel("paraffin")).toBeGreaterThan(
      sootLevel("beeswax")
    );
  });
});

describe("natural", () => {
  it("beeswax is natural", () => {
    expect(natural("beeswax")).toBe(true);
  });
  it("paraffin is not", () => {
    expect(natural("paraffin")).toBe(false);
  });
});

describe("scentThrow", () => {
  it("paraffin has best scent throw", () => {
    expect(scentThrow("paraffin")).toBeGreaterThan(
      scentThrow("tallow")
    );
  });
});

describe("colorRetention", () => {
  it("paraffin retains color best", () => {
    expect(colorRetention("paraffin")).toBeGreaterThan(
      colorRetention("tallow")
    );
  });
});

describe("bestApplication", () => {
  it("beeswax is best for tapers", () => {
    expect(bestApplication("beeswax")).toBe("tapers");
  });
});

describe("costPerKg", () => {
  it("bayberry costs most", () => {
    expect(costPerKg("bayberry")).toBeGreaterThan(
      costPerKg("paraffin")
    );
  });
});

describe("candleWaxes", () => {
  it("returns 5 waxes", () => {
    expect(candleWaxes()).toHaveLength(5);
  });
});
