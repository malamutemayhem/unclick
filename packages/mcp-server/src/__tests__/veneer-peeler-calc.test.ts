import { describe, it, expect } from "vitest";
import {
  veneerQuality, throughput, yieldRate, thicknessRange,
  vpCost, decorative, forPlywood, peelerConfig,
  bestUse, veneerPeelerTypes,
} from "../veneer-peeler-calc.js";

describe("veneerQuality", () => {
  it("slicing knife best veneer quality", () => {
    expect(veneerQuality("slicing_knife")).toBeGreaterThan(veneerQuality("rotary_lathe"));
  });
});

describe("throughput", () => {
  it("rotary lathe highest throughput", () => {
    expect(throughput("rotary_lathe")).toBeGreaterThan(throughput("stay_log"));
  });
});

describe("yieldRate", () => {
  it("spindleless best yield rate", () => {
    expect(yieldRate("spindleless")).toBeGreaterThan(yieldRate("slicing_knife"));
  });
});

describe("thicknessRange", () => {
  it("slicing knife widest thickness range", () => {
    expect(thicknessRange("slicing_knife")).toBeGreaterThan(thicknessRange("spindleless"));
  });
});

describe("vpCost", () => {
  it("slicing knife most expensive", () => {
    expect(vpCost("slicing_knife")).toBeGreaterThan(vpCost("spindleless"));
  });
});

describe("decorative", () => {
  it("slicing knife is decorative", () => {
    expect(decorative("slicing_knife")).toBe(true);
  });
  it("rotary lathe not decorative", () => {
    expect(decorative("rotary_lathe")).toBe(false);
  });
});

describe("forPlywood", () => {
  it("rotary lathe for plywood", () => {
    expect(forPlywood("rotary_lathe")).toBe(true);
  });
  it("slicing knife not for plywood", () => {
    expect(forPlywood("slicing_knife")).toBe(false);
  });
});

describe("peelerConfig", () => {
  it("half round uses offset center rotate cathedral grain", () => {
    expect(peelerConfig("half_round")).toBe("half_round_veneer_peeler_offset_center_rotate_cathedral_grain");
  });
});

describe("bestUse", () => {
  it("spindleless for plywood small diameter log max yield", () => {
    expect(bestUse("spindleless")).toBe("plywood_spindleless_veneer_peeler_small_diameter_log_max_yield");
  });
});

describe("veneerPeelerTypes", () => {
  it("returns 5 types", () => {
    expect(veneerPeelerTypes()).toHaveLength(5);
  });
});
