import { describe, it, expect } from "vitest";
import {
  cargoVolume, maxPayload, weatherProtection, loadingFlexibility,
  dailyRate, temperatureControlled, stackable, constructionType,
  bestCargo, shippingContainers,
} from "../shipping-container-calc.js";

describe("cargoVolume", () => {
  it("high cube most cargo volume", () => {
    expect(cargoVolume("high_cube")).toBeGreaterThan(cargoVolume("flat_rack"));
  });
});

describe("maxPayload", () => {
  it("flat rack highest payload", () => {
    expect(maxPayload("flat_rack")).toBeGreaterThan(maxPayload("refrigerated"));
  });
});

describe("weatherProtection", () => {
  it("refrigerated best weather protection", () => {
    expect(weatherProtection("refrigerated")).toBeGreaterThan(weatherProtection("flat_rack"));
  });
});

describe("loadingFlexibility", () => {
  it("flat rack most flexible loading", () => {
    expect(loadingFlexibility("flat_rack")).toBeGreaterThan(loadingFlexibility("dry_standard"));
  });
});

describe("dailyRate", () => {
  it("refrigerated highest daily rate", () => {
    expect(dailyRate("refrigerated")).toBeGreaterThan(dailyRate("dry_standard"));
  });
});

describe("temperatureControlled", () => {
  it("refrigerated is temperature controlled", () => {
    expect(temperatureControlled("refrigerated")).toBe(true);
  });
  it("dry standard is not", () => {
    expect(temperatureControlled("dry_standard")).toBe(false);
  });
});

describe("stackable", () => {
  it("dry standard is stackable", () => {
    expect(stackable("dry_standard")).toBe(true);
  });
  it("flat rack is not", () => {
    expect(stackable("flat_rack")).toBe(false);
  });
});

describe("constructionType", () => {
  it("refrigerated uses insulated refrigeration unit", () => {
    expect(constructionType("refrigerated")).toBe("insulated_refrigeration_unit");
  });
});

describe("bestCargo", () => {
  it("flat rack for oversized heavy equipment", () => {
    expect(bestCargo("flat_rack")).toBe("oversized_heavy_equipment");
  });
});

describe("shippingContainers", () => {
  it("returns 5 container types", () => {
    expect(shippingContainers()).toHaveLength(5);
  });
});
