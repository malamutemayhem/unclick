import { describe, it, expect } from "vitest";
import {
  pinsPerRevolution, cylinderDiameter, cylinderLength, playTime,
  combTeeth, frequency, toothLength, springTension,
  windingTurns, tuningError, costEstimate, automatonTypes,
} from "../automaton-music.js";

describe("pinsPerRevolution", () => {
  it("notes x bars", () => {
    expect(pinsPerRevolution(8, 4)).toBe(32);
  });
});

describe("cylinderDiameter", () => {
  it("positive mm", () => {
    expect(cylinderDiameter(32, 2)).toBeGreaterThan(0);
  });
});

describe("cylinderLength", () => {
  it("positive mm", () => {
    expect(cylinderLength(18, 3)).toBe(54);
  });
});

describe("playTime", () => {
  it("positive seconds", () => {
    expect(playTime(32, 2)).toBeGreaterThan(0);
  });
  it("zero rpm = 0", () => {
    expect(playTime(32, 0)).toBe(0);
  });
});

describe("combTeeth", () => {
  it("player_piano = 88", () => {
    expect(combTeeth("player_piano")).toBe(88);
  });
});

describe("frequency", () => {
  it("A4 = 440 Hz (note 49)", () => {
    expect(frequency(49)).toBeCloseTo(440, 0);
  });
});

describe("toothLength", () => {
  it("positive mm", () => {
    expect(toothLength(440)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(toothLength(0)).toBe(0);
  });
});

describe("springTension", () => {
  it("30% of weight", () => {
    expect(springTension(100)).toBe(30);
  });
});

describe("windingTurns", () => {
  it("5 per minute", () => {
    expect(windingTurns(3)).toBe(15);
  });
});

describe("tuningError", () => {
  it("zero when matched", () => {
    expect(tuningError(440, 440)).toBe(0);
  });
  it("positive when sharp", () => {
    expect(tuningError(440, 445)).toBeGreaterThan(0);
  });
});

describe("costEstimate", () => {
  it("music_box cheapest", () => {
    expect(costEstimate("music_box")).toBeLessThan(costEstimate("orchestrion"));
  });
});

describe("automatonTypes", () => {
  it("returns 5 types", () => {
    expect(automatonTypes()).toHaveLength(5);
  });
});
