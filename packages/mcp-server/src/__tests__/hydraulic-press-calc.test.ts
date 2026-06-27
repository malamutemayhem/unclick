import { describe, it, expect } from "vitest";
import {
  tonnage, speed, precision, versatility,
  hpCost, cnc, forProduction, cylinder,
  bestUse, hydraulicPressTypes,
} from "../hydraulic-press-calc.js";

describe("tonnage", () => {
  it("forging highest tonnage", () => {
    expect(tonnage("forging_closed_die")).toBeGreaterThan(tonnage("c_frame_gap_bench"));
  });
});

describe("speed", () => {
  it("forging fastest", () => {
    expect(speed("forging_closed_die")).toBeGreaterThan(speed("straightening_arbor"));
  });
});

describe("precision", () => {
  it("straightening most precise", () => {
    expect(precision("straightening_arbor")).toBeGreaterThan(precision("c_frame_gap_bench"));
  });
});

describe("versatility", () => {
  it("h frame most versatile", () => {
    expect(versatility("h_frame_four_column")).toBeGreaterThan(versatility("forging_closed_die"));
  });
});

describe("hpCost", () => {
  it("forging most expensive", () => {
    expect(hpCost("forging_closed_die")).toBeGreaterThan(hpCost("c_frame_gap_bench"));
  });
});

describe("cnc", () => {
  it("h frame has cnc", () => {
    expect(cnc("h_frame_four_column")).toBe(true);
  });
  it("c frame no cnc", () => {
    expect(cnc("c_frame_gap_bench")).toBe(false);
  });
});

describe("forProduction", () => {
  it("deep draw for production", () => {
    expect(forProduction("deep_draw_double_action")).toBe(true);
  });
  it("c frame not production", () => {
    expect(forProduction("c_frame_gap_bench")).toBe(false);
  });
});

describe("cylinder", () => {
  it("deep draw uses double ram", () => {
    expect(cylinder("deep_draw_double_action")).toBe("inner_outer_ram_blank_hold");
  });
});

describe("bestUse", () => {
  it("forging for aerospace", () => {
    expect(bestUse("forging_closed_die")).toBe("aerospace_turbine_disc_forging");
  });
});

describe("hydraulicPressTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicPressTypes()).toHaveLength(5);
  });
});
