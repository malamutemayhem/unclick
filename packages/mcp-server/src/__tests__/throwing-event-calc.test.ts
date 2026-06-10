import { describe, it, expect } from "vitest";
import {
  implementWeightKg, worldRecordMeters, technicalComplexity,
  strengthRequirement, speedRequirement, rotationalTechnique,
  olympicEvent, releaseAngleDeg, ringDiameterM, throwingEvents,
} from "../throwing-event-calc.js";

describe("implementWeightKg", () => {
  it("weight throw heaviest", () => {
    expect(implementWeightKg("weight_throw")).toBeGreaterThan(
      implementWeightKg("discus")
    );
  });
});

describe("worldRecordMeters", () => {
  it("javelin longest throw", () => {
    expect(worldRecordMeters("javelin")).toBeGreaterThan(
      worldRecordMeters("shot_put")
    );
  });
});

describe("technicalComplexity", () => {
  it("hammer throw most complex", () => {
    expect(technicalComplexity("hammer_throw")).toBeGreaterThan(
      technicalComplexity("shot_put")
    );
  });
});

describe("strengthRequirement", () => {
  it("weight throw needs most strength", () => {
    expect(strengthRequirement("weight_throw")).toBeGreaterThan(
      strengthRequirement("javelin")
    );
  });
});

describe("speedRequirement", () => {
  it("javelin needs most speed", () => {
    expect(speedRequirement("javelin")).toBeGreaterThan(
      speedRequirement("shot_put")
    );
  });
});

describe("rotationalTechnique", () => {
  it("discus is rotational", () => {
    expect(rotationalTechnique("discus")).toBe(true);
  });
  it("javelin is not", () => {
    expect(rotationalTechnique("javelin")).toBe(false);
  });
});

describe("olympicEvent", () => {
  it("javelin is olympic", () => {
    expect(olympicEvent("javelin")).toBe(true);
  });
  it("weight throw is not", () => {
    expect(olympicEvent("weight_throw")).toBe(false);
  });
});

describe("releaseAngleDeg", () => {
  it("shot put angle range", () => {
    expect(releaseAngleDeg("shot_put")).toBe("37_to_42");
  });
});

describe("ringDiameterM", () => {
  it("javelin uses runway", () => {
    expect(ringDiameterM("javelin")).toBe("runway");
  });
});

describe("throwingEvents", () => {
  it("returns 5 events", () => {
    expect(throwingEvents()).toHaveLength(5);
  });
});
