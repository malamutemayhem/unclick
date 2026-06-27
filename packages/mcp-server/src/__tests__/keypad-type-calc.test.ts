import { describe, it, expect } from "vitest";
import {
  security, convenience, durability, aesthetic,
  kpCost, powered, forOutdoor, entry,
  bestUse, keypadTypes,
} from "../keypad-type-calc.js";

describe("security", () => {
  it("touchscreen most secure", () => {
    expect(security("touchscreen_graphic_lcd")).toBeGreaterThan(security("standalone_mechanical_combo"));
  });
});

describe("convenience", () => {
  it("touchscreen most convenient", () => {
    expect(convenience("touchscreen_graphic_lcd")).toBeGreaterThan(convenience("standalone_mechanical_combo"));
  });
});

describe("durability", () => {
  it("weatherproof most durable", () => {
    expect(durability("weatherproof_outdoor_metal")).toBeGreaterThan(durability("touchscreen_graphic_lcd"));
  });
});

describe("aesthetic", () => {
  it("touchscreen best aesthetic", () => {
    expect(aesthetic("touchscreen_graphic_lcd")).toBeGreaterThan(aesthetic("standalone_mechanical_combo"));
  });
});

describe("kpCost", () => {
  it("touchscreen most expensive", () => {
    expect(kpCost("touchscreen_graphic_lcd")).toBeGreaterThan(kpCost("standalone_mechanical_combo"));
  });
});

describe("powered", () => {
  it("wired is powered", () => {
    expect(powered("wired_digital_backlit")).toBe(true);
  });
  it("mechanical not powered", () => {
    expect(powered("standalone_mechanical_combo")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("weatherproof for outdoor", () => {
    expect(forOutdoor("weatherproof_outdoor_metal")).toBe(true);
  });
  it("wired not outdoor", () => {
    expect(forOutdoor("wired_digital_backlit")).toBe(false);
  });
});

describe("entry", () => {
  it("touchscreen uses lcd scramble", () => {
    expect(entry("touchscreen_graphic_lcd")).toBe("lcd_touch_scramble_pin_gui");
  });
});

describe("bestUse", () => {
  it("mechanical for gate storage", () => {
    expect(bestUse("standalone_mechanical_combo")).toBe("gate_storage_unit_basic");
  });
});

describe("keypadTypes", () => {
  it("returns 5 types", () => {
    expect(keypadTypes()).toHaveLength(5);
  });
});
