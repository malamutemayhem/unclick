import { describe, it, expect } from "vitest";
import {
  maxResistance, exerciseVariety, portability, durabilityScore,
  bandCost, hasHandles, anchorRequired, material,
  bestExercise, resistanceBands,
} from "../resistance-band-calc.js";

describe("maxResistance", () => {
  it("pull up assist strongest", () => {
    expect(maxResistance("pull_up_assist")).toBeGreaterThan(maxResistance("therapy_latex"));
  });
});

describe("exerciseVariety", () => {
  it("loop flat most variety", () => {
    expect(exerciseVariety("loop_flat")).toBeGreaterThan(exerciseVariety("mini_hip"));
  });
});

describe("portability", () => {
  it("mini hip most portable", () => {
    expect(portability("mini_hip")).toBeGreaterThan(portability("pull_up_assist"));
  });
});

describe("durabilityScore", () => {
  it("pull up assist most durable", () => {
    expect(durabilityScore("pull_up_assist")).toBeGreaterThan(durabilityScore("therapy_latex"));
  });
});

describe("bandCost", () => {
  it("pull up assist most expensive", () => {
    expect(bandCost("pull_up_assist")).toBeGreaterThan(bandCost("therapy_latex"));
  });
});

describe("hasHandles", () => {
  it("tube handle has handles", () => {
    expect(hasHandles("tube_handle")).toBe(true);
  });
  it("loop flat does not", () => {
    expect(hasHandles("loop_flat")).toBe(false);
  });
});

describe("anchorRequired", () => {
  it("pull up assist needs anchor", () => {
    expect(anchorRequired("pull_up_assist")).toBe(true);
  });
  it("mini hip does not", () => {
    expect(anchorRequired("mini_hip")).toBe(false);
  });
});

describe("material", () => {
  it("mini hip uses fabric elastic non slip", () => {
    expect(material("mini_hip")).toBe("fabric_elastic_non_slip");
  });
});

describe("bestExercise", () => {
  it("pull up assist for pull up bar progression", () => {
    expect(bestExercise("pull_up_assist")).toBe("pull_up_bar_progression");
  });
});

describe("resistanceBands", () => {
  it("returns 5 types", () => {
    expect(resistanceBands()).toHaveLength(5);
  });
});
