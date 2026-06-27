import { describe, it, expect } from "vitest";
import {
  speed, accuracy, componentRange, feederCapacity,
  spCost, visionAligned, forFinePitch, head,
  bestUse, smtPickPlaceTypes,
} from "../smt-pick-place-calc.js";

describe("speed", () => {
  it("chip shooter fastest", () => {
    expect(speed("chip_shooter")).toBeGreaterThan(speed("odd_form"));
  });
});

describe("accuracy", () => {
  it("gantry multi head most accurate", () => {
    expect(accuracy("gantry_multi_head")).toBeGreaterThan(accuracy("chip_shooter"));
  });
});

describe("componentRange", () => {
  it("modular flex widest component range", () => {
    expect(componentRange("modular_flex")).toBeGreaterThan(componentRange("chip_shooter"));
  });
});

describe("feederCapacity", () => {
  it("modular flex highest feeder capacity", () => {
    expect(feederCapacity("modular_flex")).toBeGreaterThan(feederCapacity("odd_form"));
  });
});

describe("spCost", () => {
  it("modular flex most expensive", () => {
    expect(spCost("modular_flex")).toBeGreaterThan(spCost("odd_form"));
  });
});

describe("visionAligned", () => {
  it("all types are vision aligned", () => {
    expect(visionAligned("chip_shooter")).toBe(true);
    expect(visionAligned("gantry_multi_head")).toBe(true);
  });
});

describe("forFinePitch", () => {
  it("gantry multi head for fine pitch", () => {
    expect(forFinePitch("gantry_multi_head")).toBe(true);
  });
  it("chip shooter not for fine pitch", () => {
    expect(forFinePitch("chip_shooter")).toBe(false);
  });
});

describe("head", () => {
  it("odd form uses special gripper", () => {
    expect(head("odd_form")).toBe("special_gripper_dip_flux_through_hole_connector_odd_shape");
  });
});

describe("bestUse", () => {
  it("modular flex for high mix low volume", () => {
    expect(bestUse("modular_flex")).toBe("high_mix_low_volume_prototype_quick_changeover_versatile");
  });
});

describe("smtPickPlaceTypes", () => {
  it("returns 5 types", () => {
    expect(smtPickPlaceTypes()).toHaveLength(5);
  });
});
