import { describe, it, expect } from "vitest";
import {
  offAxisRejection, pickupAngleDeg, proximityEffect,
  ambientPickup, feedbackResistance, pressureGradient,
  rearPickup, bestApplication, nullPointDeg, microphonePatterns,
} from "../microphone-pattern-calc.js";

describe("offAxisRejection", () => {
  it("shotgun best rejection", () => {
    expect(offAxisRejection("shotgun")).toBeGreaterThan(
      offAxisRejection("cardioid")
    );
  });
});

describe("pickupAngleDeg", () => {
  it("omnidirectional widest pickup", () => {
    expect(pickupAngleDeg("omnidirectional")).toBeGreaterThan(
      pickupAngleDeg("shotgun")
    );
  });
});

describe("proximityEffect", () => {
  it("figure_eight strongest proximity effect", () => {
    expect(proximityEffect("figure_eight")).toBeGreaterThan(
      proximityEffect("shotgun")
    );
  });
});

describe("ambientPickup", () => {
  it("omnidirectional picks up most ambient", () => {
    expect(ambientPickup("omnidirectional")).toBeGreaterThan(
      ambientPickup("shotgun")
    );
  });
});

describe("feedbackResistance", () => {
  it("shotgun best feedback resistance", () => {
    expect(feedbackResistance("shotgun")).toBeGreaterThan(
      feedbackResistance("omnidirectional")
    );
  });
});

describe("pressureGradient", () => {
  it("cardioid is pressure gradient", () => {
    expect(pressureGradient("cardioid")).toBe(true);
  });
  it("omnidirectional is not", () => {
    expect(pressureGradient("omnidirectional")).toBe(false);
  });
});

describe("rearPickup", () => {
  it("figure_eight has rear pickup", () => {
    expect(rearPickup("figure_eight")).toBe(true);
  });
  it("cardioid does not", () => {
    expect(rearPickup("cardioid")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("shotgun for film dialogue", () => {
    expect(bestApplication("shotgun")).toBe("film_dialogue");
  });
});

describe("nullPointDeg", () => {
  it("omnidirectional has no null point", () => {
    expect(nullPointDeg("omnidirectional")).toBe("none");
  });
});

describe("microphonePatterns", () => {
  it("returns 5 patterns", () => {
    expect(microphonePatterns()).toHaveLength(5);
  });
});
