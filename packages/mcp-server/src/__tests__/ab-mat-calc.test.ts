import { describe, it, expect } from "vitest";
import {
  spineSupport, coreActivation, storageSize, versatility,
  matCost, noSlip, inflatable, foamType,
  bestExercise, abMats,
} from "../ab-mat-calc.js";

describe("spineSupport", () => {
  it("contour sit up pad most spine support", () => {
    expect(spineSupport("contour_sit_up_pad")).toBeGreaterThan(spineSupport("roller_wheel_combo"));
  });
});

describe("coreActivation", () => {
  it("roller wheel combo most core activation", () => {
    expect(coreActivation("roller_wheel_combo")).toBeGreaterThan(coreActivation("flat_core_trainer"));
  });
});

describe("storageSize", () => {
  it("roller wheel combo best storage size", () => {
    expect(storageSize("roller_wheel_combo")).toBeGreaterThan(storageSize("swiss_ball_inflatable"));
  });
});

describe("versatility", () => {
  it("swiss ball inflatable most versatile", () => {
    expect(versatility("swiss_ball_inflatable")).toBeGreaterThan(versatility("contour_sit_up_pad"));
  });
});

describe("matCost", () => {
  it("wedge decline angle more expensive than flat core", () => {
    expect(matCost("wedge_decline_angle")).toBeGreaterThan(matCost("flat_core_trainer"));
  });
});

describe("noSlip", () => {
  it("contour sit up pad has no slip", () => {
    expect(noSlip("contour_sit_up_pad")).toBe(true);
  });
  it("swiss ball inflatable has no no slip", () => {
    expect(noSlip("swiss_ball_inflatable")).toBe(false);
  });
});

describe("inflatable", () => {
  it("swiss ball inflatable is inflatable", () => {
    expect(inflatable("swiss_ball_inflatable")).toBe(true);
  });
  it("contour sit up pad is not inflatable", () => {
    expect(inflatable("contour_sit_up_pad")).toBe(false);
  });
});

describe("foamType", () => {
  it("contour sit up pad uses high density contour", () => {
    expect(foamType("contour_sit_up_pad")).toBe("high_density_contour");
  });
});

describe("bestExercise", () => {
  it("roller wheel combo best for ab wheel rollout", () => {
    expect(bestExercise("roller_wheel_combo")).toBe("ab_wheel_rollout");
  });
});

describe("abMats", () => {
  it("returns 5 types", () => {
    expect(abMats()).toHaveLength(5);
  });
});
