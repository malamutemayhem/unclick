import { describe, it, expect } from "vitest";
import {
  visualImpact, spatialCoverage, audienceVisibility,
  transitionEase, dancerCount, symmetrical,
  centerFocal, bestGenre, dynamicQuality, stageFormations,
} from "../stage-formation-calc.js";

describe("visualImpact", () => {
  it("v shape most visual impact", () => {
    expect(visualImpact("v_shape")).toBeGreaterThan(
      visualImpact("cluster")
    );
  });
});

describe("spatialCoverage", () => {
  it("diagonal widest coverage", () => {
    expect(spatialCoverage("diagonal")).toBeGreaterThan(
      spatialCoverage("cluster")
    );
  });
});

describe("audienceVisibility", () => {
  it("v shape best visibility", () => {
    expect(audienceVisibility("v_shape")).toBeGreaterThan(
      audienceVisibility("cluster")
    );
  });
});

describe("transitionEase", () => {
  it("cluster easiest transition", () => {
    expect(transitionEase("cluster")).toBeGreaterThan(
      transitionEase("v_shape")
    );
  });
});

describe("dancerCount", () => {
  it("circle accommodates most dancers", () => {
    expect(dancerCount("circle")).toBeGreaterThan(
      dancerCount("cluster")
    );
  });
});

describe("symmetrical", () => {
  it("line is symmetrical", () => {
    expect(symmetrical("line")).toBe(true);
  });
  it("diagonal is not", () => {
    expect(symmetrical("diagonal")).toBe(false);
  });
});

describe("centerFocal", () => {
  it("circle has center focal", () => {
    expect(centerFocal("circle")).toBe(true);
  });
  it("line does not", () => {
    expect(centerFocal("line")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("circle for folk ritual", () => {
    expect(bestGenre("circle")).toBe("folk_ritual");
  });
});

describe("dynamicQuality", () => {
  it("diagonal is tension movement", () => {
    expect(dynamicQuality("diagonal")).toBe("tension_movement");
  });
});

describe("stageFormations", () => {
  it("returns 5 formations", () => {
    expect(stageFormations()).toHaveLength(5);
  });
});
