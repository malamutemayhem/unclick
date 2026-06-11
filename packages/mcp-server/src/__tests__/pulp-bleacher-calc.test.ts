import { describe, it, expect } from "vitest";
import {
  brightnessGain, strengthRetention, chemicalCost, environmentalScore,
  pbCost, chlorineFree, forPrinting, bleacherConfig,
  bestUse, pulpBleacherTypes,
} from "../pulp-bleacher-calc.js";

describe("brightnessGain", () => {
  it("chlorine dioxide best brightness gain", () => {
    expect(brightnessGain("chlorine_dioxide")).toBeGreaterThan(brightnessGain("oxygen_delignification"));
  });
});

describe("strengthRetention", () => {
  it("chlorine dioxide best strength retention", () => {
    expect(strengthRetention("chlorine_dioxide")).toBeGreaterThan(strengthRetention("ozone_bleach"));
  });
});

describe("chemicalCost", () => {
  it("oxygen delignification best chemical cost", () => {
    expect(chemicalCost("oxygen_delignification")).toBeGreaterThan(chemicalCost("ozone_bleach"));
  });
});

describe("environmentalScore", () => {
  it("totally chlorine free best environmental score", () => {
    expect(environmentalScore("totally_chlorine_free")).toBeGreaterThan(environmentalScore("chlorine_dioxide"));
  });
});

describe("pbCost", () => {
  it("totally chlorine free most expensive", () => {
    expect(pbCost("totally_chlorine_free")).toBeGreaterThan(pbCost("hydrogen_peroxide"));
  });
});

describe("chlorineFree", () => {
  it("hydrogen peroxide is chlorine free", () => {
    expect(chlorineFree("hydrogen_peroxide")).toBe(true);
  });
  it("chlorine dioxide not chlorine free", () => {
    expect(chlorineFree("chlorine_dioxide")).toBe(false);
  });
});

describe("forPrinting", () => {
  it("chlorine dioxide for printing", () => {
    expect(forPrinting("chlorine_dioxide")).toBe(true);
  });
  it("oxygen delignification not for printing", () => {
    expect(forPrinting("oxygen_delignification")).toBe(false);
  });
});

describe("bleacherConfig", () => {
  it("ozone bleach uses generator mix reactor rapid", () => {
    expect(bleacherConfig("ozone_bleach")).toBe("ozone_bleach_pulp_generator_mix_reactor_rapid_delignify");
  });
});

describe("bestUse", () => {
  it("hydrogen peroxide for mechanical pulp newsprint", () => {
    expect(bestUse("hydrogen_peroxide")).toBe("mechanical_pulp_peroxide_bleach_brighten_retain_yield_newsprint");
  });
});

describe("pulpBleacherTypes", () => {
  it("returns 5 types", () => {
    expect(pulpBleacherTypes()).toHaveLength(5);
  });
});
