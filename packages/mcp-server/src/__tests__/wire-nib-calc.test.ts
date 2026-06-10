import { describe, it, expect } from "vitest";
import {
  burnPrecision, heatResponse, coverage, durability,
  nibCost, replaceable, handBent, wireGauge,
  bestUse, wireNibs,
} from "../wire-nib-calc.js";

describe("burnPrecision", () => {
  it("tight loop fine most precise burn", () => {
    expect(burnPrecision("tight_loop_fine")).toBeGreaterThan(burnPrecision("flat_blade_shader"));
  });
});

describe("heatResponse", () => {
  it("tight loop fine fastest heat response", () => {
    expect(heatResponse("tight_loop_fine")).toBeGreaterThan(heatResponse("flat_blade_shader"));
  });
});

describe("coverage", () => {
  it("flat blade shader most coverage", () => {
    expect(coverage("flat_blade_shader")).toBeGreaterThan(coverage("tight_loop_fine"));
  });
});

describe("durability", () => {
  it("ball end texture most durable", () => {
    expect(durability("ball_end_texture")).toBeGreaterThan(durability("tight_loop_fine"));
  });
});

describe("nibCost", () => {
  it("custom bent special most expensive", () => {
    expect(nibCost("custom_bent_special")).toBeGreaterThan(nibCost("tight_loop_fine"));
  });
});

describe("replaceable", () => {
  it("tight loop fine is replaceable", () => {
    expect(replaceable("tight_loop_fine")).toBe(true);
  });
});

describe("handBent", () => {
  it("custom bent special is hand bent", () => {
    expect(handBent("custom_bent_special")).toBe(true);
  });
  it("tight loop fine not hand bent", () => {
    expect(handBent("tight_loop_fine")).toBe(false);
  });
});

describe("wireGauge", () => {
  it("tight loop fine uses nichrome 20 gauge", () => {
    expect(wireGauge("tight_loop_fine")).toBe("nichrome_20_gauge");
  });
});

describe("bestUse", () => {
  it("flat blade shader best for broad shade fill", () => {
    expect(bestUse("flat_blade_shader")).toBe("broad_shade_fill");
  });
});

describe("wireNibs", () => {
  it("returns 5 types", () => {
    expect(wireNibs()).toHaveLength(5);
  });
});
