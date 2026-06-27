import { describe, it, expect } from "vitest";
import {
  printResolution, printSpeed, colorGamut, inkEfficiency,
  dipCost, singlePass, forSample, headConfig,
  bestUse, digitalInkjetPrintTypes,
} from "../digital-inkjet-print-calc.js";

describe("printResolution", () => {
  it("sublimation transfer best print resolution", () => {
    expect(printResolution("sublimation_transfer")).toBeGreaterThan(printResolution("hybrid_screen_digital"));
  });
});

describe("printSpeed", () => {
  it("single pass inline fastest print speed", () => {
    expect(printSpeed("single_pass_inline")).toBeGreaterThan(printSpeed("scanning_carriage"));
  });
});

describe("colorGamut", () => {
  it("sublimation transfer widest color gamut", () => {
    expect(colorGamut("sublimation_transfer")).toBeGreaterThan(colorGamut("hybrid_screen_digital"));
  });
});

describe("inkEfficiency", () => {
  it("direct to fabric best ink efficiency", () => {
    expect(inkEfficiency("direct_to_fabric")).toBeGreaterThan(inkEfficiency("hybrid_screen_digital"));
  });
});

describe("dipCost", () => {
  it("single pass inline most expensive", () => {
    expect(dipCost("single_pass_inline")).toBeGreaterThan(dipCost("direct_to_fabric"));
  });
});

describe("singlePass", () => {
  it("single pass inline is single pass", () => {
    expect(singlePass("single_pass_inline")).toBe(true);
  });
  it("scanning carriage not single pass", () => {
    expect(singlePass("scanning_carriage")).toBe(false);
  });
});

describe("forSample", () => {
  it("scanning carriage for sample", () => {
    expect(forSample("scanning_carriage")).toBe(true);
  });
  it("single pass inline not for sample", () => {
    expect(forSample("single_pass_inline")).toBe(false);
  });
});

describe("headConfig", () => {
  it("hybrid screen digital uses combo screen and digital", () => {
    expect(headConfig("hybrid_screen_digital")).toBe("rotary_screen_ground_color_plus_digital_detail_overlay_combo");
  });
});

describe("bestUse", () => {
  it("direct to fabric for cotton reactive ink", () => {
    expect(bestUse("direct_to_fabric")).toBe("cotton_direct_print_reactive_ink_no_transfer_paper_eco_print");
  });
});

describe("digitalInkjetPrintTypes", () => {
  it("returns 5 types", () => {
    expect(digitalInkjetPrintTypes()).toHaveLength(5);
  });
});
