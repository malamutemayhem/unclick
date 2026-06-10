import { describe, it, expect } from "vitest";
import {
  printQuality, portability, labelDurability, fontOptions,
  makerCost, needsPower, waterproof, tapeType,
  bestUse, labelMakers,
} from "../label-maker-calc.js";

describe("printQuality", () => {
  it("desktop pc connected best print quality", () => {
    expect(printQuality("desktop_pc_connected")).toBeGreaterThan(printQuality("handheld_tape_emboss"));
  });
});

describe("portability", () => {
  it("handheld tape emboss most portable", () => {
    expect(portability("handheld_tape_emboss")).toBeGreaterThan(portability("desktop_pc_connected"));
  });
});

describe("labelDurability", () => {
  it("industrial wire wrap most durable labels", () => {
    expect(labelDurability("industrial_wire_wrap")).toBeGreaterThan(labelDurability("thermal_print_battery"));
  });
});

describe("fontOptions", () => {
  it("bluetooth phone app most font options", () => {
    expect(fontOptions("bluetooth_phone_app")).toBeGreaterThan(fontOptions("handheld_tape_emboss"));
  });
});

describe("makerCost", () => {
  it("industrial wire wrap most expensive", () => {
    expect(makerCost("industrial_wire_wrap")).toBeGreaterThan(makerCost("handheld_tape_emboss"));
  });
});

describe("needsPower", () => {
  it("thermal print battery needs power", () => {
    expect(needsPower("thermal_print_battery")).toBe(true);
  });
  it("handheld tape emboss does not", () => {
    expect(needsPower("handheld_tape_emboss")).toBe(false);
  });
});

describe("waterproof", () => {
  it("industrial wire wrap is waterproof", () => {
    expect(waterproof("industrial_wire_wrap")).toBe(true);
  });
  it("thermal print battery is not", () => {
    expect(waterproof("thermal_print_battery")).toBe(false);
  });
});

describe("tapeType", () => {
  it("industrial wire wrap uses self laminating vinyl flag", () => {
    expect(tapeType("industrial_wire_wrap")).toBe("self_laminating_vinyl_flag");
  });
});

describe("bestUse", () => {
  it("bluetooth phone app best for pantry kitchen crafts", () => {
    expect(bestUse("bluetooth_phone_app")).toBe("pantry_kitchen_crafts");
  });
});

describe("labelMakers", () => {
  it("returns 5 types", () => {
    expect(labelMakers()).toHaveLength(5);
  });
});
