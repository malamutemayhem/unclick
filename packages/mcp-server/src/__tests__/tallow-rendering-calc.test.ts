import { describe, it, expect } from "vitest";
import {
  renderYieldPercent, meltingPointCelsius, renderTempCelsius,
  renderTimeHoursPerKg, filteringPasses, shelfLifeMonths, scentStrength,
  candleQuality, costPerKg, fatSources,
} from "../tallow-rendering-calc.js";

describe("renderYieldPercent", () => {
  it("pork lard yields most", () => {
    expect(renderYieldPercent("pork_lard")).toBeGreaterThan(
      renderYieldPercent("lamb_fat")
    );
  });
});

describe("meltingPointCelsius", () => {
  it("beef suet has highest melting point", () => {
    expect(meltingPointCelsius("beef_suet")).toBeGreaterThan(
      meltingPointCelsius("bear_fat")
    );
  });
});

describe("renderTempCelsius", () => {
  it("beef suet renders hottest", () => {
    expect(renderTempCelsius("beef_suet")).toBeGreaterThan(
      renderTempCelsius("bear_fat")
    );
  });
});

describe("renderTimeHoursPerKg", () => {
  it("beef suet takes longest", () => {
    expect(renderTimeHoursPerKg("beef_suet")).toBeGreaterThan(
      renderTimeHoursPerKg("duck_fat")
    );
  });
});

describe("filteringPasses", () => {
  it("returns 2", () => {
    expect(filteringPasses()).toBe(2);
  });
});

describe("shelfLifeMonths", () => {
  it("beef suet lasts longest", () => {
    expect(shelfLifeMonths("beef_suet")).toBeGreaterThan(
      shelfLifeMonths("pork_lard")
    );
  });
});

describe("scentStrength", () => {
  it("lamb fat is most pungent", () => {
    expect(scentStrength("lamb_fat")).toBeGreaterThan(
      scentStrength("pork_lard")
    );
  });
});

describe("candleQuality", () => {
  it("beef suet makes best candles", () => {
    expect(candleQuality("beef_suet")).toBeGreaterThan(
      candleQuality("duck_fat")
    );
  });
});

describe("costPerKg", () => {
  it("bear fat is most expensive", () => {
    expect(costPerKg("bear_fat")).toBeGreaterThan(costPerKg("pork_lard"));
  });
});

describe("fatSources", () => {
  it("returns 5 sources", () => {
    expect(fatSources()).toHaveLength(5);
  });
});
