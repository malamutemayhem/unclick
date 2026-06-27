import { describe, it, expect } from "vitest";
import {
  tanningDaysPerMm, bathConcentrationPercent, colorResult, firmness,
  shrinkageTempCelsius, phRange, waterUseLitersPerKg, toolingQuality,
  costPerKg, tanninSources,
} from "../veg-tan-calc.js";

describe("tanningDaysPerMm", () => {
  it("oak bark takes longest", () => {
    expect(tanningDaysPerMm("oak_bark")).toBeGreaterThan(
      tanningDaysPerMm("quebracho")
    );
  });
});

describe("bathConcentrationPercent", () => {
  it("quebracho is most concentrated", () => {
    expect(bathConcentrationPercent("quebracho")).toBeGreaterThan(
      bathConcentrationPercent("oak_bark")
    );
  });
});

describe("colorResult", () => {
  it("quebracho produces deep red", () => {
    expect(colorResult("quebracho")).toBe("deep_red");
  });
  it("oak bark produces golden brown", () => {
    expect(colorResult("oak_bark")).toBe("golden_brown");
  });
});

describe("firmness", () => {
  it("quebracho produces firmest leather", () => {
    expect(firmness("quebracho")).toBeGreaterThan(firmness("mimosa"));
  });
});

describe("shrinkageTempCelsius", () => {
  it("quebracho has highest shrinkage temp", () => {
    expect(shrinkageTempCelsius("quebracho")).toBeGreaterThan(
      shrinkageTempCelsius("mimosa")
    );
  });
});

describe("phRange", () => {
  it("all tannins are acidic", () => {
    expect(phRange("oak_bark")).toBeLessThan(7);
  });
});

describe("waterUseLitersPerKg", () => {
  it("oak bark uses most water", () => {
    expect(waterUseLitersPerKg("oak_bark")).toBeGreaterThan(
      waterUseLitersPerKg("quebracho")
    );
  });
});

describe("toolingQuality", () => {
  it("oak bark has best tooling quality", () => {
    expect(toolingQuality("oak_bark")).toBeGreaterThan(
      toolingQuality("mimosa")
    );
  });
});

describe("costPerKg", () => {
  it("sumac is most expensive", () => {
    expect(costPerKg("sumac")).toBeGreaterThan(costPerKg("mimosa"));
  });
});

describe("tanninSources", () => {
  it("returns 5 sources", () => {
    expect(tanninSources()).toHaveLength(5);
  });
});
