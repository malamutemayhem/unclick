import { describe, it, expect } from "vitest";
import {
  density, aspect, resistance, reliability,
  tvCost, cmpRequired, for3d, fill,
  bestUse, tsvTypes,
} from "../tsv-type-calc.js";

describe("density", () => {
  it("via first highest density", () => {
    expect(density("via_first_before_feol")).toBeGreaterThan(density("via_last_after_bond"));
  });
});

describe("aspect", () => {
  it("via middle best aspect ratio", () => {
    expect(aspect("via_middle_after_feol")).toBeGreaterThan(aspect("glass_interposer_tgv"));
  });
});

describe("resistance", () => {
  it("via first lowest resistance", () => {
    expect(resistance("via_first_before_feol")).toBeGreaterThan(resistance("glass_interposer_tgv"));
  });
});

describe("reliability", () => {
  it("glass interposer most reliable", () => {
    expect(reliability("glass_interposer_tgv")).toBeGreaterThan(reliability("backside_reveal_bsv"));
  });
});

describe("tvCost", () => {
  it("via first most expensive", () => {
    expect(tvCost("via_first_before_feol")).toBeGreaterThan(tvCost("via_last_after_bond"));
  });
});

describe("cmpRequired", () => {
  it("via middle requires cmp", () => {
    expect(cmpRequired("via_middle_after_feol")).toBe(true);
  });
  it("via last no cmp required", () => {
    expect(cmpRequired("via_last_after_bond")).toBe(false);
  });
});

describe("for3d", () => {
  it("via middle for 3d", () => {
    expect(for3d("via_middle_after_feol")).toBe(true);
  });
  it("glass interposer not for 3d", () => {
    expect(for3d("glass_interposer_tgv")).toBe(false);
  });
});

describe("fill", () => {
  it("via middle uses copper electroplated fill", () => {
    expect(fill("via_middle_after_feol")).toBe("copper_electroplated_fill");
  });
});

describe("bestUse", () => {
  it("via first best for image sensor bsi", () => {
    expect(bestUse("via_first_before_feol")).toBe("image_sensor_bsi_stack");
  });
});

describe("tsvTypes", () => {
  it("returns 5 types", () => {
    expect(tsvTypes()).toHaveLength(5);
  });
});
