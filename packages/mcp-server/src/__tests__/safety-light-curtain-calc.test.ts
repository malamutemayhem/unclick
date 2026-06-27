import { describe, it, expect } from "vitest";
import {
  resolution, range, responseTime, silLevel,
  slCost, type4, forPressSafety, optics,
  bestUse, safetyLightCurtainTypes,
} from "../safety-light-curtain-calc.js";

describe("resolution", () => {
  it("type 2 finger highest resolution", () => {
    expect(resolution("type_2_finger")).toBeGreaterThan(resolution("type_4_body"));
  });
});

describe("range", () => {
  it("type 4 body longest range", () => {
    expect(range("type_4_body")).toBeGreaterThan(range("type_2_finger"));
  });
});

describe("responseTime", () => {
  it("type 4 finger fastest response", () => {
    expect(responseTime("type_4_finger")).toBeGreaterThan(responseTime("type_4_body"));
  });
});

describe("silLevel", () => {
  it("type 4 finger highest sil level", () => {
    expect(silLevel("type_4_finger")).toBeGreaterThan(silLevel("type_2_finger"));
  });
});

describe("slCost", () => {
  it("muting blanking most expensive", () => {
    expect(slCost("muting_blanking")).toBeGreaterThan(slCost("type_2_finger"));
  });
});

describe("type4", () => {
  it("type 4 hand is type 4", () => {
    expect(type4("type_4_hand")).toBe(true);
  });
  it("type 2 finger not type 4", () => {
    expect(type4("type_2_finger")).toBe(false);
  });
});

describe("forPressSafety", () => {
  it("type 4 finger for press safety", () => {
    expect(forPressSafety("type_4_finger")).toBe(true);
  });
  it("type 4 body not for press safety", () => {
    expect(forPressSafety("type_4_body")).toBe(false);
  });
});

describe("optics", () => {
  it("type 4 body uses 90mm beam spacing", () => {
    expect(optics("type_4_body")).toBe("90mm_beam_spacing_body_detection_long_range_area");
  });
});

describe("bestUse", () => {
  it("muting blanking for conveyor entry exit", () => {
    expect(bestUse("muting_blanking")).toBe("conveyor_entry_exit_pallet_pass_through_automated");
  });
});

describe("safetyLightCurtainTypes", () => {
  it("returns 5 types", () => {
    expect(safetyLightCurtainTypes()).toHaveLength(5);
  });
});
