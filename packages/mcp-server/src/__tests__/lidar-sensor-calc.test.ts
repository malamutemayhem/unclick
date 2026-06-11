import { describe, it, expect } from "vitest";
import {
  range, resolution, framerate, fov,
  ldCost, noMovingParts, forAutomotive, scanning,
  bestUse, lidarSensorTypes,
} from "../lidar-sensor-calc.js";

describe("range", () => {
  it("opal fmcw longest range", () => {
    expect(range("opal_frequency_modulated")).toBeGreaterThan(range("solid_state_flash"));
  });
});

describe("resolution", () => {
  it("opal fmcw highest resolution", () => {
    expect(resolution("opal_frequency_modulated")).toBeGreaterThan(resolution("single_photon_spad"));
  });
});

describe("framerate", () => {
  it("solid state flash fastest framerate", () => {
    expect(framerate("solid_state_flash")).toBeGreaterThan(framerate("single_photon_spad"));
  });
});

describe("fov", () => {
  it("mechanical spinning widest fov", () => {
    expect(fov("mechanical_spinning_360")).toBeGreaterThan(fov("single_photon_spad"));
  });
});

describe("ldCost", () => {
  it("mechanical spinning most expensive", () => {
    expect(ldCost("mechanical_spinning_360")).toBeGreaterThan(ldCost("solid_state_flash"));
  });
});

describe("noMovingParts", () => {
  it("solid state has no moving parts", () => {
    expect(noMovingParts("solid_state_flash")).toBe(true);
  });
  it("mechanical has moving parts", () => {
    expect(noMovingParts("mechanical_spinning_360")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("mems mirror for automotive", () => {
    expect(forAutomotive("mems_mirror_scanning")).toBe(true);
  });
  it("opal fmcw not for automotive", () => {
    expect(forAutomotive("opal_frequency_modulated")).toBe(false);
  });
});

describe("scanning", () => {
  it("opal uses fmcw coherent detection", () => {
    expect(scanning("opal_frequency_modulated")).toBe("fmcw_coherent_detection");
  });
});

describe("bestUse", () => {
  it("single photon best for aerial survey", () => {
    expect(bestUse("single_photon_spad")).toBe("topographic_aerial_survey_canopy");
  });
});

describe("lidarSensorTypes", () => {
  it("returns 5 types", () => {
    expect(lidarSensorTypes()).toHaveLength(5);
  });
});
