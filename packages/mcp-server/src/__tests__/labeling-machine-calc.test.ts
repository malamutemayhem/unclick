import { describe, it, expect } from "vitest";
import {
  speed, accuracy, labelRange, changeover,
  lmCost, fullWrap, forRoundBottle, application,
  bestUse, labelingMachineTypes,
} from "../labeling-machine-calc.js";

describe("speed", () => {
  it("wet glue fastest", () => {
    expect(speed("wet_glue")).toBeGreaterThan(speed("print_apply"));
  });
});

describe("accuracy", () => {
  it("pressure sensitive best accuracy", () => {
    expect(accuracy("pressure_sensitive")).toBeGreaterThan(accuracy("shrink_sleeve"));
  });
});

describe("labelRange", () => {
  it("pressure sensitive widest label range", () => {
    expect(labelRange("pressure_sensitive")).toBeGreaterThan(labelRange("print_apply"));
  });
});

describe("changeover", () => {
  it("pressure sensitive fastest changeover", () => {
    expect(changeover("pressure_sensitive")).toBeGreaterThan(changeover("wet_glue"));
  });
});

describe("lmCost", () => {
  it("print apply most expensive", () => {
    expect(lmCost("print_apply")).toBeGreaterThan(lmCost("pressure_sensitive"));
  });
});

describe("fullWrap", () => {
  it("shrink sleeve is full wrap", () => {
    expect(fullWrap("shrink_sleeve")).toBe(true);
  });
  it("pressure sensitive not full wrap", () => {
    expect(fullWrap("pressure_sensitive")).toBe(false);
  });
});

describe("forRoundBottle", () => {
  it("pressure sensitive for round bottle", () => {
    expect(forRoundBottle("pressure_sensitive")).toBe(true);
  });
  it("print apply not for round bottle", () => {
    expect(forRoundBottle("print_apply")).toBe(false);
  });
});

describe("application", () => {
  it("print apply uses thermal transfer print", () => {
    expect(application("print_apply")).toBe("thermal_transfer_print_then_apply_variable_data");
  });
});

describe("bestUse", () => {
  it("wet glue for beer bottle wine label", () => {
    expect(bestUse("wet_glue")).toBe("beer_bottle_wine_label_high_speed_rotary_line");
  });
});

describe("labelingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(labelingMachineTypes()).toHaveLength(5);
  });
});
