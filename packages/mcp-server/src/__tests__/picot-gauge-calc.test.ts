import { describe, it, expect } from "vitest";
import {
  sizeAccuracy, easeOfUse, sizeRange, portability,
  gaugeCost, adjustable, multiSize, gaugeMaterial,
  bestUse, picotGauges,
} from "../picot-gauge-calc.js";

describe("sizeAccuracy", () => {
  it("slide adjustable set most accurate", () => {
    expect(sizeAccuracy("slide_adjustable_set")).toBeGreaterThan(sizeAccuracy("wire_loop_tiny"));
  });
});

describe("easeOfUse", () => {
  it("ruler marked clear easiest to use", () => {
    expect(easeOfUse("ruler_marked_clear")).toBeGreaterThan(easeOfUse("wire_loop_tiny"));
  });
});

describe("sizeRange", () => {
  it("slide adjustable set widest range", () => {
    expect(sizeRange("slide_adjustable_set")).toBeGreaterThan(sizeRange("wire_loop_tiny"));
  });
});

describe("portability", () => {
  it("wire loop tiny most portable", () => {
    expect(portability("wire_loop_tiny")).toBeGreaterThan(portability("slide_adjustable_set"));
  });
});

describe("gaugeCost", () => {
  it("slide adjustable set most expensive", () => {
    expect(gaugeCost("slide_adjustable_set")).toBeGreaterThan(gaugeCost("rod_metal_single"));
  });
});

describe("adjustable", () => {
  it("slide adjustable set is adjustable", () => {
    expect(adjustable("slide_adjustable_set")).toBe(true);
  });
  it("flat card multi not adjustable", () => {
    expect(adjustable("flat_card_multi")).toBe(false);
  });
});

describe("multiSize", () => {
  it("flat card multi supports multi size", () => {
    expect(multiSize("flat_card_multi")).toBe(true);
  });
  it("rod metal single not multi size", () => {
    expect(multiSize("rod_metal_single")).toBe(false);
  });
});

describe("gaugeMaterial", () => {
  it("rod metal single uses steel rod smooth", () => {
    expect(gaugeMaterial("rod_metal_single")).toBe("steel_rod_smooth");
  });
});

describe("bestUse", () => {
  it("slide adjustable set best for precision custom size", () => {
    expect(bestUse("slide_adjustable_set")).toBe("precision_custom_size");
  });
});

describe("picotGauges", () => {
  it("returns 5 types", () => {
    expect(picotGauges()).toHaveLength(5);
  });
});
