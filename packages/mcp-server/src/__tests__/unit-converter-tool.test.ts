import { describe, expect, it } from "vitest";

import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertVolume,
  convertSpeed,
  convertArea,
  convertDataStorage,
} from "../unit-converter-tool.js";

describe("convertLength", () => {
  it("converts meters to kilometers", () => {
    const r = convertLength({ value: 1500, from: "m", to: "km" }) as any;
    expect(r.result).toBeCloseTo(1.5, 5);
    expect(r.from_unit).toBe("m");
    expect(r.to_unit).toBe("km");
  });

  it("converts miles to kilometers", () => {
    const r = convertLength({ value: 1, from: "mi", to: "km" }) as any;
    expect(r.result).toBeCloseTo(1.609344, 3);
  });

  it("converts inches to centimeters", () => {
    const r = convertLength({ value: 1, from: "in", to: "cm" }) as any;
    expect(r.result).toBeCloseTo(2.54, 3);
  });

  it("is case-insensitive for units", () => {
    const r = convertLength({ value: 1, from: "KM", to: "M" }) as any;
    expect(r.result).toBeCloseTo(1000, 0);
  });

  it("accepts from_unit / to_unit aliases", () => {
    const r = convertLength({ value: 100, from_unit: "cm", to_unit: "m" }) as any;
    expect(r.result).toBeCloseTo(1, 5);
  });

  it("returns error for NaN value", () => {
    const r = convertLength({ value: "abc", from: "m", to: "km" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for unsupported from_unit", () => {
    const r = convertLength({ value: 1, from: "parsec", to: "m" }) as any;
    expect(r.error).toContain("parsec");
  });

  it("returns error for unsupported to_unit", () => {
    const r = convertLength({ value: 1, from: "m", to: "league" }) as any;
    expect(r.error).toContain("league");
  });

  it("identity conversion returns same value", () => {
    const r = convertLength({ value: 42, from: "m", to: "m" }) as any;
    expect(r.result).toBeCloseTo(42, 5);
  });
});

describe("convertWeight", () => {
  it("converts kilograms to pounds", () => {
    const r = convertWeight({ value: 1, from: "kg", to: "lb" }) as any;
    expect(r.result).toBeCloseTo(2.20462, 3);
  });

  it("converts ounces to grams", () => {
    const r = convertWeight({ value: 1, from: "oz", to: "g" }) as any;
    expect(r.result).toBeCloseTo(28.3495, 2);
  });

  it("converts stone to kg", () => {
    const r = convertWeight({ value: 1, from: "stone", to: "kg" }) as any;
    expect(r.result).toBeCloseTo(6.35029, 3);
  });

  it("converts tonne to kg", () => {
    const r = convertWeight({ value: 1, from: "tonne", to: "kg" }) as any;
    expect(r.result).toBeCloseTo(1000, 0);
  });

  it("returns error for unsupported unit", () => {
    const r = convertWeight({ value: 1, from: "slug", to: "kg" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertTemperature", () => {
  it("converts Celsius to Fahrenheit", () => {
    const r = convertTemperature({ value: 100, from: "C", to: "F" }) as any;
    expect(r.result).toBeCloseTo(212, 1);
  });

  it("converts Fahrenheit to Celsius", () => {
    const r = convertTemperature({ value: 32, from: "F", to: "C" }) as any;
    expect(r.result).toBeCloseTo(0, 1);
  });

  it("converts Celsius to Kelvin", () => {
    const r = convertTemperature({ value: 0, from: "C", to: "K" }) as any;
    expect(r.result).toBeCloseTo(273.15, 2);
  });

  it("converts Kelvin to Rankine", () => {
    const r = convertTemperature({ value: 273.15, from: "K", to: "R" }) as any;
    expect(r.result).toBeCloseTo(491.67, 1);
  });

  it("includes all_units in the result", () => {
    const r = convertTemperature({ value: 0, from: "C", to: "F" }) as any;
    expect(r.all_units).toBeDefined();
    expect(r.all_units.C).toBeCloseTo(0, 1);
    expect(r.all_units.K).toBeCloseTo(273.15, 1);
  });

  it("is case-insensitive", () => {
    const r = convertTemperature({ value: 100, from: "c", to: "f" }) as any;
    expect(r.result).toBeCloseTo(212, 1);
  });

  it("returns error for NaN value", () => {
    const r = convertTemperature({ value: "hot", from: "C", to: "F" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for unsupported from_unit", () => {
    const r = convertTemperature({ value: 0, from: "X", to: "C" }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for unsupported to_unit", () => {
    const r = convertTemperature({ value: 0, from: "C", to: "X" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertVolume", () => {
  it("converts liters to milliliters", () => {
    const r = convertVolume({ value: 1, from: "L", to: "mL" }) as any;
    expect(r.result).toBeCloseTo(1000, 0);
  });

  it("converts US gallons to liters", () => {
    const r = convertVolume({ value: 1, from: "gallon_us", to: "L" }) as any;
    expect(r.result).toBeCloseTo(3.78541, 3);
  });

  it("converts cups to fluid ounces", () => {
    const r = convertVolume({ value: 1, from: "cup", to: "fl_oz" }) as any;
    expect(r.result).toBeCloseTo(8, 0);
  });

  it("returns error for unsupported unit", () => {
    const r = convertVolume({ value: 1, from: "barrel", to: "L" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertSpeed", () => {
  it("converts km/h to m/s", () => {
    const r = convertSpeed({ value: 3.6, from: "km/h", to: "m/s" }) as any;
    expect(r.result).toBeCloseTo(1, 3);
  });

  it("converts mph to km/h", () => {
    const r = convertSpeed({ value: 60, from: "mph", to: "km/h" }) as any;
    expect(r.result).toBeCloseTo(96.5606, 1);
  });

  it("converts knots to mph", () => {
    const r = convertSpeed({ value: 1, from: "knots", to: "mph" }) as any;
    expect(r.result).toBeCloseTo(1.15078, 3);
  });

  it("returns error for unsupported unit", () => {
    const r = convertSpeed({ value: 1, from: "warp", to: "m/s" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertArea", () => {
  it("converts km2 to m2", () => {
    const r = convertArea({ value: 1, from: "km2", to: "m2" }) as any;
    expect(r.result).toBeCloseTo(1e6, 0);
  });

  it("converts acres to hectares", () => {
    const r = convertArea({ value: 1, from: "acre", to: "ha" }) as any;
    expect(r.result).toBeCloseTo(0.404686, 3);
  });

  it("converts ft2 to m2", () => {
    const r = convertArea({ value: 1, from: "ft2", to: "m2" }) as any;
    expect(r.result).toBeCloseTo(0.0929, 3);
  });

  it("returns error for unsupported unit", () => {
    const r = convertArea({ value: 1, from: "barn", to: "m2" }) as any;
    expect(r.error).toBeTruthy();
  });
});

describe("convertDataStorage", () => {
  it("converts GB to MB", () => {
    const r = convertDataStorage({ value: 1, from: "GB", to: "MB" }) as any;
    expect(r.result).toBeCloseTo(1024, 0);
  });

  it("converts TB to GB", () => {
    const r = convertDataStorage({ value: 1, from: "TB", to: "GB" }) as any;
    expect(r.result).toBeCloseTo(1024, 0);
  });

  it("converts KB to B", () => {
    const r = convertDataStorage({ value: 1, from: "KB", to: "B" }) as any;
    expect(r.result).toBeCloseTo(1024, 0);
  });

  it("converts PB to TB", () => {
    const r = convertDataStorage({ value: 1, from: "PB", to: "TB" }) as any;
    expect(r.result).toBeCloseTo(1024, 0);
  });

  it("returns error for unsupported unit", () => {
    const r = convertDataStorage({ value: 1, from: "EB", to: "GB" }) as any;
    expect(r.error).toBeTruthy();
  });
});
