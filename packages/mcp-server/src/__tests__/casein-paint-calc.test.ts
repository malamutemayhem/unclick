import { describe, it, expect } from "vitest";
import {
  matteFinish, adhesion, mixEase, durability,
  caseinCost, premixed, forMural, solventBase,
  bestUse, caseinPaints,
} from "../casein-paint-calc.js";

describe("matteFinish", () => {
  it("lime casein fresco most matte finish", () => {
    expect(matteFinish("lime_casein_fresco")).toBeGreaterThan(matteFinish("tube_casein_ready"));
  });
});

describe("adhesion", () => {
  it("lime casein fresco best adhesion", () => {
    expect(adhesion("lime_casein_fresco")).toBeGreaterThan(adhesion("tube_casein_ready"));
  });
});

describe("mixEase", () => {
  it("tube casein ready easiest mix", () => {
    expect(mixEase("tube_casein_ready")).toBeGreaterThan(mixEase("lime_casein_fresco"));
  });
});

describe("durability", () => {
  it("lime casein fresco most durable", () => {
    expect(durability("lime_casein_fresco")).toBeGreaterThan(durability("tube_casein_ready"));
  });
});

describe("caseinCost", () => {
  it("tube casein ready most expensive", () => {
    expect(caseinCost("tube_casein_ready")).toBeGreaterThan(caseinCost("powder_casein_mix"));
  });
});

describe("premixed", () => {
  it("tube casein ready is premixed", () => {
    expect(premixed("tube_casein_ready")).toBe(true);
  });
  it("powder casein mix not premixed", () => {
    expect(premixed("powder_casein_mix")).toBe(false);
  });
});

describe("forMural", () => {
  it("borax casein classic is for mural", () => {
    expect(forMural("borax_casein_classic")).toBe(true);
  });
  it("tube casein ready not for mural", () => {
    expect(forMural("tube_casein_ready")).toBe(false);
  });
});

describe("solventBase", () => {
  it("ammonia casein strong uses ammonia water casein", () => {
    expect(solventBase("ammonia_casein_strong")).toBe("ammonia_water_casein");
  });
});

describe("bestUse", () => {
  it("tube casein ready best for general studio paint", () => {
    expect(bestUse("tube_casein_ready")).toBe("general_studio_paint");
  });
});

describe("caseinPaints", () => {
  it("returns 5 types", () => {
    expect(caseinPaints()).toHaveLength(5);
  });
});
