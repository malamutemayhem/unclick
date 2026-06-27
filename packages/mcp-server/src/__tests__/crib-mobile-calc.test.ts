import { describe, it, expect } from "vitest";
import {
  visualStimulation, soothingSound, craftQuality, installEase,
  mobileCost, needsBatteries, machineWash, hangStyle,
  bestStage, cribMobiles,
} from "../crib-mobile-calc.js";

describe("visualStimulation", () => {
  it("projection light show most visual stimulation", () => {
    expect(visualStimulation("projection_light_show")).toBeGreaterThan(visualStimulation("musical_wind_up"));
  });
});

describe("soothingSound", () => {
  it("smart app control best soothing sound", () => {
    expect(soothingSound("smart_app_control")).toBeGreaterThan(soothingSound("wooden_montessori"));
  });
});

describe("craftQuality", () => {
  it("wooden montessori highest craft quality", () => {
    expect(craftQuality("wooden_montessori")).toBeGreaterThan(craftQuality("projection_light_show"));
  });
});

describe("installEase", () => {
  it("wooden montessori easiest install", () => {
    expect(installEase("wooden_montessori")).toBeGreaterThan(installEase("smart_app_control"));
  });
});

describe("mobileCost", () => {
  it("smart app control most expensive", () => {
    expect(mobileCost("smart_app_control")).toBeGreaterThan(mobileCost("musical_wind_up"));
  });
});

describe("needsBatteries", () => {
  it("projection light show needs batteries", () => {
    expect(needsBatteries("projection_light_show")).toBe(true);
  });
  it("musical wind up does not", () => {
    expect(needsBatteries("musical_wind_up")).toBe(false);
  });
});

describe("machineWash", () => {
  it("plush animal spin is machine washable", () => {
    expect(machineWash("plush_animal_spin")).toBe(true);
  });
  it("wooden montessori is not", () => {
    expect(machineWash("wooden_montessori")).toBe(false);
  });
});

describe("hangStyle", () => {
  it("wooden montessori uses dowel rod balance hang", () => {
    expect(hangStyle("wooden_montessori")).toBe("dowel_rod_balance_hang");
  });
});

describe("bestStage", () => {
  it("smart app control best for parent remote nursery", () => {
    expect(bestStage("smart_app_control")).toBe("parent_remote_nursery");
  });
});

describe("cribMobiles", () => {
  it("returns 5 types", () => {
    expect(cribMobiles()).toHaveLength(5);
  });
});
