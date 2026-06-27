import { describe, it, expect } from "vitest";
import {
  toneRange, breathControl, beginnerDifficulty, maintenanceLevel,
  partCost, usesReed, buzzRequired, soundProduction,
  bestInstrumentFamily, mouthpieces,
} from "../mouthpiece-calc.js";

describe("toneRange", () => {
  it("flute embouchure widest range", () => {
    expect(toneRange("flute_embouchure")).toBeGreaterThan(toneRange("recorder_fipple"));
  });
});

describe("breathControl", () => {
  it("double reed most breath control", () => {
    expect(breathControl("double_reed")).toBeGreaterThan(breathControl("recorder_fipple"));
  });
});

describe("beginnerDifficulty", () => {
  it("double reed hardest for beginners", () => {
    expect(beginnerDifficulty("double_reed")).toBeGreaterThan(beginnerDifficulty("recorder_fipple"));
  });
});

describe("maintenanceLevel", () => {
  it("double reed highest maintenance", () => {
    expect(maintenanceLevel("double_reed")).toBeGreaterThan(maintenanceLevel("recorder_fipple"));
  });
});

describe("partCost", () => {
  it("double reed most expensive", () => {
    expect(partCost("double_reed")).toBeGreaterThan(partCost("recorder_fipple"));
  });
});

describe("usesReed", () => {
  it("single reed uses reed", () => {
    expect(usesReed("single_reed")).toBe(true);
  });
  it("brass cup does not", () => {
    expect(usesReed("brass_cup")).toBe(false);
  });
});

describe("buzzRequired", () => {
  it("brass cup requires buzz", () => {
    expect(buzzRequired("brass_cup")).toBe(true);
  });
  it("single reed does not", () => {
    expect(buzzRequired("single_reed")).toBe(false);
  });
});

describe("soundProduction", () => {
  it("brass cup uses lip buzz cup resonance", () => {
    expect(soundProduction("brass_cup")).toBe("lip_buzz_cup_resonance");
  });
});

describe("bestInstrumentFamily", () => {
  it("single reed for clarinet saxophone", () => {
    expect(bestInstrumentFamily("single_reed")).toBe("clarinet_saxophone");
  });
});

describe("mouthpieces", () => {
  it("returns 5 types", () => {
    expect(mouthpieces()).toHaveLength(5);
  });
});
