import { describe, it, expect } from "vitest";
import {
  imageQuality, surfaceFlatness, installConvenience, hideAway,
  screenCost, tensionSystem, needsElectric, gainType,
  bestRoom, projectorScreens,
} from "../projector-screen-calc.js";

describe("imageQuality", () => {
  it("fixed frame wall best image quality", () => {
    expect(imageQuality("fixed_frame_wall")).toBeGreaterThan(imageQuality("portable_tripod"));
  });
});

describe("surfaceFlatness", () => {
  it("fixed frame wall flattest surface", () => {
    expect(surfaceFlatness("fixed_frame_wall")).toBeGreaterThan(surfaceFlatness("pull_down_manual"));
  });
});

describe("installConvenience", () => {
  it("portable tripod most convenient install", () => {
    expect(installConvenience("portable_tripod")).toBeGreaterThan(installConvenience("fixed_frame_wall"));
  });
});

describe("hideAway", () => {
  it("motorized ceiling best hide away", () => {
    expect(hideAway("motorized_ceiling")).toBeGreaterThan(hideAway("fixed_frame_wall"));
  });
});

describe("screenCost", () => {
  it("ambient light reject most expensive", () => {
    expect(screenCost("ambient_light_reject")).toBeGreaterThan(screenCost("portable_tripod"));
  });
});

describe("tensionSystem", () => {
  it("fixed frame wall has tension system", () => {
    expect(tensionSystem("fixed_frame_wall")).toBe(true);
  });
  it("pull down manual does not", () => {
    expect(tensionSystem("pull_down_manual")).toBe(false);
  });
});

describe("needsElectric", () => {
  it("motorized ceiling needs electric", () => {
    expect(needsElectric("motorized_ceiling")).toBe(true);
  });
  it("fixed frame wall does not", () => {
    expect(needsElectric("fixed_frame_wall")).toBe(false);
  });
});

describe("gainType", () => {
  it("ambient light reject uses angular reflective 0 6 gain", () => {
    expect(gainType("ambient_light_reject")).toBe("angular_reflective_0_6_gain");
  });
});

describe("bestRoom", () => {
  it("portable tripod for outdoor movie night", () => {
    expect(bestRoom("portable_tripod")).toBe("outdoor_movie_night");
  });
});

describe("projectorScreens", () => {
  it("returns 5 types", () => {
    expect(projectorScreens()).toHaveLength(5);
  });
});
