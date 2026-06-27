import { describe, it, expect } from "vitest";
import {
  tensionControl, twistConsist, speedLay, ropeRange,
  jackCost, powered, portable, frameType,
  bestUse, ropeJacks,
} from "../rope-jack-calc.js";

describe("tensionControl", () => {
  it("iron frame heavy best tension control", () => {
    expect(tensionControl("iron_frame_heavy")).toBeGreaterThan(tensionControl("portable_field_light"));
  });
});

describe("twistConsist", () => {
  it("electric drive power most consistent twist", () => {
    expect(twistConsist("electric_drive_power")).toBeGreaterThan(twistConsist("portable_field_light"));
  });
});

describe("speedLay", () => {
  it("electric drive power fastest lay", () => {
    expect(speedLay("electric_drive_power")).toBeGreaterThan(speedLay("wooden_frame_standard"));
  });
});

describe("ropeRange", () => {
  it("iron frame heavy best rope range", () => {
    expect(ropeRange("iron_frame_heavy")).toBeGreaterThan(ropeRange("portable_field_light"));
  });
});

describe("jackCost", () => {
  it("electric drive power most expensive", () => {
    expect(jackCost("electric_drive_power")).toBeGreaterThan(jackCost("portable_field_light"));
  });
});

describe("powered", () => {
  it("electric drive power is powered", () => {
    expect(powered("electric_drive_power")).toBe(true);
  });
  it("wooden frame standard not powered", () => {
    expect(powered("wooden_frame_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("portable field light is portable", () => {
    expect(portable("portable_field_light")).toBe(true);
  });
  it("iron frame heavy not portable", () => {
    expect(portable("iron_frame_heavy")).toBe(false);
  });
});

describe("frameType", () => {
  it("geared crank speed uses geared crank frame", () => {
    expect(frameType("geared_crank_speed")).toBe("geared_crank_frame");
  });
});

describe("bestUse", () => {
  it("wooden frame standard best for general rope lay", () => {
    expect(bestUse("wooden_frame_standard")).toBe("general_rope_lay");
  });
});

describe("ropeJacks", () => {
  it("returns 5 types", () => {
    expect(ropeJacks()).toHaveLength(5);
  });
});
