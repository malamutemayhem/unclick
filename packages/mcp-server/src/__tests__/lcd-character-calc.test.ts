import { describe, it, expect } from "vitest";
import {
  charCapacity, viewAngle, powerDraw, readability,
  lcdCost, backlit, i2cInterface, controllerType,
  bestUse, lcdCharacters,
} from "../lcd-character-calc.js";

describe("charCapacity", () => {
  it("lcd 40x4 wide highest char capacity", () => {
    expect(charCapacity("lcd_40x4_wide")).toBeGreaterThan(charCapacity("lcd_8x2_compact"));
  });
});

describe("viewAngle", () => {
  it("lcd 20x4 large widest view angle", () => {
    expect(viewAngle("lcd_20x4_large")).toBeGreaterThan(viewAngle("lcd_8x2_compact"));
  });
});

describe("powerDraw", () => {
  it("lcd 8x2 compact lowest power draw", () => {
    expect(powerDraw("lcd_8x2_compact")).toBeGreaterThan(powerDraw("lcd_20x4_large"));
  });
});

describe("readability", () => {
  it("lcd 20x4 large best readability", () => {
    expect(readability("lcd_20x4_large")).toBeGreaterThan(readability("lcd_8x2_compact"));
  });
});

describe("lcdCost", () => {
  it("lcd 40x4 wide most expensive", () => {
    expect(lcdCost("lcd_40x4_wide")).toBeGreaterThan(lcdCost("lcd_16x2_standard"));
  });
});

describe("backlit", () => {
  it("lcd 16x2 standard is backlit", () => {
    expect(backlit("lcd_16x2_standard")).toBe(true);
  });
  it("lcd 8x2 compact not backlit", () => {
    expect(backlit("lcd_8x2_compact")).toBe(false);
  });
});

describe("i2cInterface", () => {
  it("lcd 16x2 i2c backpack has i2c interface", () => {
    expect(i2cInterface("lcd_16x2_i2c_backpack")).toBe(true);
  });
  it("lcd 16x2 standard no i2c interface", () => {
    expect(i2cInterface("lcd_16x2_standard")).toBe(false);
  });
});

describe("controllerType", () => {
  it("lcd 16x2 i2c backpack uses pcf8574 i2c hd44780", () => {
    expect(controllerType("lcd_16x2_i2c_backpack")).toBe("pcf8574_i2c_hd44780");
  });
});

describe("bestUse", () => {
  it("lcd 40x4 wide best for wide format text", () => {
    expect(bestUse("lcd_40x4_wide")).toBe("wide_format_text");
  });
});

describe("lcdCharacters", () => {
  it("returns 5 types", () => {
    expect(lcdCharacters()).toHaveLength(5);
  });
});
