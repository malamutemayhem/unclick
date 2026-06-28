import { describe, expect, it } from "vitest";
import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertVolume,
  convertSpeed,
  convertArea,
  convertDataStorage,
} from "./unit-converter-tool.js";

describe("unit-converter-tool", () => {
  describe("convertLength", () => {
    it("converts miles to metres", () => {
      const r = convertLength({ value: 1, from_unit: "mi", to_unit: "m" }) as Record<string, unknown>;
      expect(r.result).toBe(1609.344);
      expect(r.base_unit).toBe("m");
    });

    it("is case-insensitive on unit names", () => {
      const r = convertLength({ value: 100, from_unit: "CM", to_unit: "M" }) as Record<string, number>;
      expect(r.result).toBe(1);
    });

    it("rejects an unknown unit", () => {
      const r = convertLength({ value: 1, from_unit: "m", to_unit: "parsec" }) as Record<string, string>;
      expect(r.error).toMatch(/not a supported to_unit/);
    });

    it("rejects a non-numeric value", () => {
      expect(convertLength({ value: "abc", from_unit: "m", to_unit: "km" })).toEqual({
        error: "value must be a number.",
      });
    });
  });

  describe("convertWeight", () => {
    it("converts kilograms to pounds", () => {
      const r = convertWeight({ value: 1, from_unit: "kg", to_unit: "lb" }) as Record<string, number>;
      expect(r.result).toBeCloseTo(2.204623, 4);
    });
  });

  describe("convertTemperature", () => {
    it("converts the freezing point of water C to F", () => {
      const r = convertTemperature({ value: 0, from_unit: "C", to_unit: "F" }) as Record<string, unknown>;
      expect(r.result).toBe(32);
    });

    it("converts the boiling point of water C to K", () => {
      const r = convertTemperature({ value: 100, from_unit: "C", to_unit: "K" }) as Record<string, number>;
      expect(r.result).toBe(373.15);
    });

    it("exposes all four scales for a single value", () => {
      const r = convertTemperature({ value: 25, from_unit: "C", to_unit: "F" }) as {
        all_units: Record<string, number>;
      };
      expect(r.all_units.C).toBe(25);
      expect(r.all_units.F).toBe(77);
      expect(r.all_units.K).toBe(298.15);
    });

    it("rejects an unsupported scale", () => {
      const r = convertTemperature({ value: 1, from_unit: "C", to_unit: "Z" }) as Record<string, string>;
      expect(r.error).toMatch(/not a supported to_unit/);
    });
  });

  describe("convertVolume / convertSpeed / convertArea", () => {
    it("converts US gallons to litres", () => {
      const r = convertVolume({ value: 1, from_unit: "gallon_us", to_unit: "L" }) as Record<string, number>;
      expect(r.result).toBeCloseTo(3.785412, 4);
    });

    it("converts km/h to m/s", () => {
      const r = convertSpeed({ value: 36, from_unit: "km/h", to_unit: "m/s" }) as Record<string, number>;
      expect(r.result).toBe(10);
    });

    it("converts hectares to square metres", () => {
      const r = convertArea({ value: 1, from_unit: "ha", to_unit: "m2" }) as Record<string, number>;
      expect(r.result).toBe(10000);
    });
  });

  describe("convertDataStorage", () => {
    it("uses binary (1024) multiples", () => {
      const r = convertDataStorage({ value: 1, from_unit: "GB", to_unit: "MB" }) as Record<string, number>;
      expect(r.result).toBe(1024);
    });
  });
});
