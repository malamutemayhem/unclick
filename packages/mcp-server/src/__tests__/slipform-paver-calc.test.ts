import { describe, it, expect } from "vitest";
import {
  pavingSpeed, slabWidth, surfaceSmoothness, gradeControl,
  sfCost, stringline, forHighway, paverConfig,
  bestUse, slipformPaverTypes,
} from "../slipform-paver-calc.js";

describe("pavingSpeed", () => {
  it("four track fastest paving speed", () => {
    expect(pavingSpeed("four_track")).toBeGreaterThan(pavingSpeed("canal_lining"));
  });
});

describe("slabWidth", () => {
  it("four track widest slab width", () => {
    expect(slabWidth("four_track")).toBeGreaterThan(slabWidth("curb_gutter"));
  });
});

describe("surfaceSmoothness", () => {
  it("four track best surface smoothness", () => {
    expect(surfaceSmoothness("four_track")).toBeGreaterThan(surfaceSmoothness("canal_lining"));
  });
});

describe("gradeControl", () => {
  it("four track best grade control", () => {
    expect(gradeControl("four_track")).toBeGreaterThan(gradeControl("curb_gutter"));
  });
});

describe("sfCost", () => {
  it("four track most expensive", () => {
    expect(sfCost("four_track")).toBeGreaterThan(sfCost("curb_gutter"));
  });
});

describe("stringline", () => {
  it("all slipform pavers use stringline", () => {
    expect(stringline("two_track")).toBe(true);
    expect(stringline("curb_gutter")).toBe(true);
  });
});

describe("forHighway", () => {
  it("four track for highway", () => {
    expect(forHighway("four_track")).toBe(true);
  });
  it("canal lining not for highway", () => {
    expect(forHighway("canal_lining")).toBe(false);
  });
});

describe("paverConfig", () => {
  it("curb gutter uses extruder continuous profile", () => {
    expect(paverConfig("curb_gutter")).toBe("curb_gutter_slipform_extruder_continuous_profile_street_edge");
  });
});

describe("bestUse", () => {
  it("canal lining for irrigation drainage", () => {
    expect(bestUse("canal_lining")).toBe("irrigation_canal_drainage_channel_slipform_lining_v_u_shape");
  });
});

describe("slipformPaverTypes", () => {
  it("returns 5 types", () => {
    expect(slipformPaverTypes()).toHaveLength(5);
  });
});
