import { describe, it, expect } from "vitest";
import {
  shutoffAccuracy, reliability, setupEase, tempRange,
  sitterCost, digital, hasTimer, triggerMethod,
  bestUse, kilnSitters,
} from "../kiln-sitter-calc.js";

describe("shutoffAccuracy", () => {
  it("digital sitter auto most accurate shutoff", () => {
    expect(shutoffAccuracy("digital_sitter_auto")).toBeGreaterThan(shutoffAccuracy("limit_timer_safety"));
  });
});

describe("reliability", () => {
  it("timer backup dual most reliable", () => {
    expect(reliability("timer_backup_dual")).toBeGreaterThan(reliability("bar_sitter_flat"));
  });
});

describe("setupEase", () => {
  it("limit timer safety easiest setup", () => {
    expect(setupEase("limit_timer_safety")).toBeGreaterThan(setupEase("digital_sitter_auto"));
  });
});

describe("tempRange", () => {
  it("digital sitter auto widest temp range", () => {
    expect(tempRange("digital_sitter_auto")).toBeGreaterThan(tempRange("limit_timer_safety"));
  });
});

describe("sitterCost", () => {
  it("digital sitter auto most expensive", () => {
    expect(sitterCost("digital_sitter_auto")).toBeGreaterThan(sitterCost("limit_timer_safety"));
  });
});

describe("digital", () => {
  it("digital sitter auto is digital", () => {
    expect(digital("digital_sitter_auto")).toBe(true);
  });
  it("cone sitter standard not digital", () => {
    expect(digital("cone_sitter_standard")).toBe(false);
  });
});

describe("hasTimer", () => {
  it("timer backup dual has timer", () => {
    expect(hasTimer("timer_backup_dual")).toBe(true);
  });
  it("cone sitter standard no timer", () => {
    expect(hasTimer("cone_sitter_standard")).toBe(false);
  });
});

describe("triggerMethod", () => {
  it("digital sitter auto uses thermocouple auto", () => {
    expect(triggerMethod("digital_sitter_auto")).toBe("thermocouple_auto");
  });
});

describe("bestUse", () => {
  it("cone sitter standard best for general shutoff cone", () => {
    expect(bestUse("cone_sitter_standard")).toBe("general_shutoff_cone");
  });
});

describe("kilnSitters", () => {
  it("returns 5 types", () => {
    expect(kilnSitters()).toHaveLength(5);
  });
});
