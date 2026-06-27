import { describe, it, expect } from "vitest";
import {
  creativeControl, shootingSpeed, consistencyScore,
  learningCurve, exposureLatitude, controlsAperture,
  controlsShutter, bestScenario, meterDependence, exposureModes,
} from "../exposure-mode-calc.js";

describe("creativeControl", () => {
  it("manual has most control", () => {
    expect(creativeControl("manual")).toBeGreaterThan(
      creativeControl("program")
    );
  });
});

describe("shootingSpeed", () => {
  it("program is fastest to shoot", () => {
    expect(shootingSpeed("program")).toBeGreaterThan(
      shootingSpeed("manual")
    );
  });
});

describe("consistencyScore", () => {
  it("manual is most consistent", () => {
    expect(consistencyScore("manual")).toBeGreaterThan(
      consistencyScore("program")
    );
  });
});

describe("learningCurve", () => {
  it("manual has steepest learning curve", () => {
    expect(learningCurve("manual")).toBeGreaterThan(
      learningCurve("program")
    );
  });
});

describe("exposureLatitude", () => {
  it("manual has most latitude", () => {
    expect(exposureLatitude("manual")).toBeGreaterThan(
      exposureLatitude("program")
    );
  });
});

describe("controlsAperture", () => {
  it("aperture priority controls aperture", () => {
    expect(controlsAperture("aperture_priority")).toBe(true);
  });
  it("shutter priority does not", () => {
    expect(controlsAperture("shutter_priority")).toBe(false);
  });
});

describe("controlsShutter", () => {
  it("shutter priority controls shutter", () => {
    expect(controlsShutter("shutter_priority")).toBe(true);
  });
  it("aperture priority does not", () => {
    expect(controlsShutter("aperture_priority")).toBe(false);
  });
});

describe("bestScenario", () => {
  it("bulb for astrophotography", () => {
    expect(bestScenario("bulb")).toBe("astrophotography");
  });
});

describe("meterDependence", () => {
  it("program depends most on meter", () => {
    expect(meterDependence("program")).toBeGreaterThan(
      meterDependence("manual")
    );
  });
});

describe("exposureModes", () => {
  it("returns 5 types", () => {
    expect(exposureModes()).toHaveLength(5);
  });
});
