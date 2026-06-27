import { describe, it, expect } from "vitest";
import {
  pressureRating, strength, alignment, installEase,
  pfCost, fullPenetration, forHighPress, face,
  bestUse, pipeFlangeTypes,
} from "../pipe-flange-calc.js";

describe("pressureRating", () => {
  it("weld neck highest pressure", () => {
    expect(pressureRating("weld_neck_high_press")).toBeGreaterThan(pressureRating("slip_on_general"));
  });
});

describe("strength", () => {
  it("weld neck strongest", () => {
    expect(strength("weld_neck_high_press")).toBeGreaterThan(strength("lap_joint_rotatable"));
  });
});

describe("alignment", () => {
  it("lap joint best alignment", () => {
    expect(alignment("lap_joint_rotatable")).toBeGreaterThanOrEqual(alignment("blind_flange_closure"));
  });
});

describe("installEase", () => {
  it("blind flange easiest install", () => {
    expect(installEase("blind_flange_closure")).toBeGreaterThan(installEase("weld_neck_high_press"));
  });
});

describe("pfCost", () => {
  it("weld neck most expensive", () => {
    expect(pfCost("weld_neck_high_press")).toBeGreaterThan(pfCost("slip_on_general"));
  });
});

describe("fullPenetration", () => {
  it("weld neck has full penetration", () => {
    expect(fullPenetration("weld_neck_high_press")).toBe(true);
  });
  it("slip on does not have full penetration", () => {
    expect(fullPenetration("slip_on_general")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("weld neck for high pressure", () => {
    expect(forHighPress("weld_neck_high_press")).toBe(true);
  });
  it("slip on not for high pressure", () => {
    expect(forHighPress("slip_on_general")).toBe(false);
  });
});

describe("face", () => {
  it("lap joint uses flat face stub end", () => {
    expect(face("lap_joint_rotatable")).toBe("flat_face_stub_end_rotatable_ring_bolt_align");
  });
});

describe("bestUse", () => {
  it("socket weld for small bore", () => {
    expect(bestUse("socket_weld_small")).toBe("small_bore_high_pressure_instrument_piping");
  });
});

describe("pipeFlangeTypes", () => {
  it("returns 5 types", () => {
    expect(pipeFlangeTypes()).toHaveLength(5);
  });
});
