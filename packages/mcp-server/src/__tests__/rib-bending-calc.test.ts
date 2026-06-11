import { describe, it, expect } from "vitest";
import {
  bendControl, heatEven, speedBend, sizeRange,
  bendCost, electric, useMold, heatMethod,
  bestUse, ribBendings,
} from "../rib-bending-calc.js";

describe("bendControl", () => {
  it("bending iron standard best bend control", () => {
    expect(bendControl("bending_iron_standard")).toBeGreaterThan(bendControl("steam_box_large"));
  });
});

describe("heatEven", () => {
  it("electric blanket even most even heat", () => {
    expect(heatEven("electric_blanket_even")).toBeGreaterThan(heatEven("hot_pipe_traditional"));
  });
});

describe("speedBend", () => {
  it("fox bender mold fastest bend", () => {
    expect(speedBend("fox_bender_mold")).toBeGreaterThan(speedBend("steam_box_large"));
  });
});

describe("sizeRange", () => {
  it("steam box large widest size range", () => {
    expect(sizeRange("steam_box_large")).toBeGreaterThan(sizeRange("fox_bender_mold"));
  });
});

describe("bendCost", () => {
  it("fox bender mold most expensive", () => {
    expect(bendCost("fox_bender_mold")).toBeGreaterThan(bendCost("hot_pipe_traditional"));
  });
});

describe("electric", () => {
  it("fox bender mold is electric", () => {
    expect(electric("fox_bender_mold")).toBe(true);
  });
  it("bending iron standard not electric", () => {
    expect(electric("bending_iron_standard")).toBe(false);
  });
});

describe("useMold", () => {
  it("fox bender mold uses mold", () => {
    expect(useMold("fox_bender_mold")).toBe(true);
  });
  it("bending iron standard no mold", () => {
    expect(useMold("bending_iron_standard")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("electric blanket even uses silicone heat pad", () => {
    expect(heatMethod("electric_blanket_even")).toBe("silicone_heat_pad");
  });
});

describe("bestUse", () => {
  it("bending iron standard best for general rib bend", () => {
    expect(bestUse("bending_iron_standard")).toBe("general_rib_bend");
  });
});

describe("ribBendings", () => {
  it("returns 5 types", () => {
    expect(ribBendings()).toHaveLength(5);
  });
});
