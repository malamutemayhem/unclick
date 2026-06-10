import { describe, it, expect } from "vitest";
import {
  sheetCapacity, easeOfUse, jamResistance, portability,
  staplerCost, needsStaples, flatClinch, driveType,
  bestUse, staplers,
} from "../stapler-calc.js";

describe("sheetCapacity", () => {
  it("heavy duty 100 highest capacity", () => {
    expect(sheetCapacity("heavy_duty_100")).toBeGreaterThan(sheetCapacity("mini_portable"));
  });
});

describe("easeOfUse", () => {
  it("electric automatic easiest to use", () => {
    expect(easeOfUse("electric_automatic")).toBeGreaterThan(easeOfUse("heavy_duty_100"));
  });
});

describe("jamResistance", () => {
  it("staple free crimp never jams", () => {
    expect(jamResistance("staple_free_crimp")).toBeGreaterThan(jamResistance("mini_portable"));
  });
});

describe("portability", () => {
  it("mini portable most portable", () => {
    expect(portability("mini_portable")).toBeGreaterThan(portability("heavy_duty_100"));
  });
});

describe("staplerCost", () => {
  it("electric automatic most expensive", () => {
    expect(staplerCost("electric_automatic")).toBeGreaterThan(staplerCost("mini_portable"));
  });
});

describe("needsStaples", () => {
  it("desktop full strip needs staples", () => {
    expect(needsStaples("desktop_full_strip")).toBe(true);
  });
  it("staple free crimp does not", () => {
    expect(needsStaples("staple_free_crimp")).toBe(false);
  });
});

describe("flatClinch", () => {
  it("desktop full strip has flat clinch", () => {
    expect(flatClinch("desktop_full_strip")).toBe(true);
  });
  it("mini portable does not", () => {
    expect(flatClinch("mini_portable")).toBe(false);
  });
});

describe("driveType", () => {
  it("electric automatic uses motor sensor auto", () => {
    expect(driveType("electric_automatic")).toBe("motor_sensor_auto");
  });
});

describe("bestUse", () => {
  it("staple free crimp best for eco friendly school", () => {
    expect(bestUse("staple_free_crimp")).toBe("eco_friendly_school");
  });
});

describe("staplers", () => {
  it("returns 5 types", () => {
    expect(staplers()).toHaveLength(5);
  });
});
