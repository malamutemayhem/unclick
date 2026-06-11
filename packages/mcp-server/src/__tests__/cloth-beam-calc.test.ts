import { describe, it, expect } from "vitest";
import {
  tensionEven, windSmooth, adjustEase, fabricRange,
  beamCost, sectional, ratchet, brakeType,
  bestUse, clothBeams,
} from "../cloth-beam-calc.js";

describe("tensionEven", () => {
  it("sectional beam even most even tension", () => {
    expect(tensionEven("sectional_beam_even")).toBeGreaterThan(tensionEven("sandpaper_wrap_grip"));
  });
});

describe("windSmooth", () => {
  it("sectional beam even smoothest wind", () => {
    expect(windSmooth("sectional_beam_even")).toBeGreaterThan(windSmooth("weighted_cord_tension"));
  });
});

describe("adjustEase", () => {
  it("weighted cord tension easiest adjust", () => {
    expect(adjustEase("weighted_cord_tension")).toBeGreaterThan(adjustEase("sectional_beam_even"));
  });
});

describe("fabricRange", () => {
  it("friction brake standard widest fabric range", () => {
    expect(fabricRange("friction_brake_standard")).toBeGreaterThan(fabricRange("sandpaper_wrap_grip"));
  });
});

describe("beamCost", () => {
  it("sectional beam even most expensive", () => {
    expect(beamCost("sectional_beam_even")).toBeGreaterThan(beamCost("sandpaper_wrap_grip"));
  });
});

describe("sectional", () => {
  it("sectional beam even is sectional", () => {
    expect(sectional("sectional_beam_even")).toBe(true);
  });
  it("friction brake standard not sectional", () => {
    expect(sectional("friction_brake_standard")).toBe(false);
  });
});

describe("ratchet", () => {
  it("ratchet pawl click has ratchet", () => {
    expect(ratchet("ratchet_pawl_click")).toBe(true);
  });
  it("friction brake standard no ratchet", () => {
    expect(ratchet("friction_brake_standard")).toBe(false);
  });
});

describe("brakeType", () => {
  it("weighted cord tension uses hanging weight cord", () => {
    expect(brakeType("weighted_cord_tension")).toBe("hanging_weight_cord");
  });
});

describe("bestUse", () => {
  it("friction brake standard best for general cloth wind", () => {
    expect(bestUse("friction_brake_standard")).toBe("general_cloth_wind");
  });
});

describe("clothBeams", () => {
  it("returns 5 types", () => {
    expect(clothBeams()).toHaveLength(5);
  });
});
