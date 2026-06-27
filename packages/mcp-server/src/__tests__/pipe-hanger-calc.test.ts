import { describe, it, expect } from "vitest";
import {
  loadCapacity, thermalMove, adjustability, installEase,
  phCost, springLoaded, forHotPipe, support,
  bestUse, pipeHangerTypes,
} from "../pipe-hanger-calc.js";

describe("loadCapacity", () => {
  it("rigid strut highest load", () => {
    expect(loadCapacity("rigid_strut_anchor")).toBeGreaterThan(loadCapacity("clevis_hanger_std"));
  });
});

describe("thermalMove", () => {
  it("constant support best thermal movement", () => {
    expect(thermalMove("constant_support_spring")).toBeGreaterThan(thermalMove("clevis_hanger_std"));
  });
});

describe("adjustability", () => {
  it("spring hanger most adjustable", () => {
    expect(adjustability("spring_hanger_variable")).toBeGreaterThan(adjustability("rigid_strut_anchor"));
  });
});

describe("installEase", () => {
  it("clevis hanger easiest install", () => {
    expect(installEase("clevis_hanger_std")).toBeGreaterThan(installEase("constant_support_spring"));
  });
});

describe("phCost", () => {
  it("constant support most expensive", () => {
    expect(phCost("constant_support_spring")).toBeGreaterThan(phCost("clevis_hanger_std"));
  });
});

describe("springLoaded", () => {
  it("spring hanger is spring loaded", () => {
    expect(springLoaded("spring_hanger_variable")).toBe(true);
  });
  it("clevis hanger not spring loaded", () => {
    expect(springLoaded("clevis_hanger_std")).toBe(false);
  });
});

describe("forHotPipe", () => {
  it("constant support for hot pipe", () => {
    expect(forHotPipe("constant_support_spring")).toBe(true);
  });
  it("clevis hanger not for hot pipe", () => {
    expect(forHotPipe("clevis_hanger_std")).toBe(false);
  });
});

describe("support", () => {
  it("roller support uses slide plate", () => {
    expect(support("roller_support_slide")).toBe("roller_or_slide_plate_horizontal_movement");
  });
});

describe("bestUse", () => {
  it("constant support for critical high temp", () => {
    expect(bestUse("constant_support_spring")).toBe("critical_high_temp_piping_large_thermal_move");
  });
});

describe("pipeHangerTypes", () => {
  it("returns 5 types", () => {
    expect(pipeHangerTypes()).toHaveLength(5);
  });
});
