import { describe, it, expect } from "vitest";
import {
  holeClean, punchLife, alignEase, sizeRange,
  pritchelCost, carbide, forHotWork, tipShape,
  bestUse, pritchels,
} from "../pritchel-calc.js";

describe("holeClean", () => {
  it("carbide tip hard cleanest hole", () => {
    expect(holeClean("carbide_tip_hard")).toBeGreaterThan(holeClean("round_punch_standard"));
  });
});

describe("punchLife", () => {
  it("carbide tip hard longest punch life", () => {
    expect(punchLife("carbide_tip_hard")).toBeGreaterThan(punchLife("round_punch_standard"));
  });
});

describe("alignEase", () => {
  it("tapered drift open easiest align", () => {
    expect(alignEase("tapered_drift_open")).toBeGreaterThan(alignEase("square_punch_nail"));
  });
});

describe("sizeRange", () => {
  it("multi size set widest size range", () => {
    expect(sizeRange("multi_size_set")).toBeGreaterThan(sizeRange("round_punch_standard"));
  });
});

describe("pritchelCost", () => {
  it("carbide tip hard most expensive", () => {
    expect(pritchelCost("carbide_tip_hard")).toBeGreaterThan(pritchelCost("round_punch_standard"));
  });
});

describe("carbide", () => {
  it("carbide tip hard has carbide", () => {
    expect(carbide("carbide_tip_hard")).toBe(true);
  });
  it("round punch standard no carbide", () => {
    expect(carbide("round_punch_standard")).toBe(false);
  });
});

describe("forHotWork", () => {
  it("round punch standard is for hot work", () => {
    expect(forHotWork("round_punch_standard")).toBe(true);
  });
  it("carbide tip hard not for hot work", () => {
    expect(forHotWork("carbide_tip_hard")).toBe(false);
  });
});

describe("tipShape", () => {
  it("tapered drift open uses long taper drift", () => {
    expect(tipShape("tapered_drift_open")).toBe("long_taper_drift");
  });
});

describe("bestUse", () => {
  it("multi size set best for all nail size punch", () => {
    expect(bestUse("multi_size_set")).toBe("all_nail_size_punch");
  });
});

describe("pritchels", () => {
  it("returns 5 types", () => {
    expect(pritchels()).toHaveLength(5);
  });
});
