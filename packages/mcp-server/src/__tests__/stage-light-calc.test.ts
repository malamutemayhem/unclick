import { describe, it, expect } from "vitest";
import {
  beamControl, lightOutput, colorMixing, versatility,
  fixtureCost, requiresGelFrame, dmxControlled, opticType,
  bestUse, stageLights,
} from "../stage-light-calc.js";

describe("beamControl", () => {
  it("ellipsoidal best beam control", () => {
    expect(beamControl("ellipsoidal")).toBeGreaterThan(beamControl("par_can"));
  });
});

describe("lightOutput", () => {
  it("moving head highest output", () => {
    expect(lightOutput("moving_head")).toBeGreaterThan(lightOutput("par_can"));
  });
});

describe("colorMixing", () => {
  it("led wash best color mixing", () => {
    expect(colorMixing("led_wash")).toBeGreaterThan(colorMixing("fresnel"));
  });
});

describe("versatility", () => {
  it("moving head most versatile", () => {
    expect(versatility("moving_head")).toBeGreaterThan(versatility("par_can"));
  });
});

describe("fixtureCost", () => {
  it("moving head most expensive", () => {
    expect(fixtureCost("moving_head")).toBeGreaterThan(fixtureCost("par_can"));
  });
});

describe("requiresGelFrame", () => {
  it("fresnel requires gel frame", () => {
    expect(requiresGelFrame("fresnel")).toBe(true);
  });
  it("led wash does not", () => {
    expect(requiresGelFrame("led_wash")).toBe(false);
  });
});

describe("dmxControlled", () => {
  it("moving head is dmx controlled", () => {
    expect(dmxControlled("moving_head")).toBe(true);
  });
  it("fresnel is not", () => {
    expect(dmxControlled("fresnel")).toBe(false);
  });
});

describe("opticType", () => {
  it("moving head uses motorized optic pan tilt", () => {
    expect(opticType("moving_head")).toBe("motorized_optic_pan_tilt");
  });
});

describe("bestUse", () => {
  it("ellipsoidal for spotlight pattern gobo", () => {
    expect(bestUse("ellipsoidal")).toBe("spotlight_pattern_gobo");
  });
});

describe("stageLights", () => {
  it("returns 5 light types", () => {
    expect(stageLights()).toHaveLength(5);
  });
});
