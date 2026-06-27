import { describe, it, expect } from "vitest";
import {
  bpmMin, bpmMax, energyLevel,
  technicalDifficulty, emotionalWeight, danceableForHumans,
  suitableForMarch, italianMeaning, commonUsage, tempoMarkings,
} from "../tempo-marking-calc.js";

describe("bpmMin", () => {
  it("presto has highest minimum bpm", () => {
    expect(bpmMin("presto")).toBeGreaterThan(bpmMin("largo"));
  });
});

describe("bpmMax", () => {
  it("presto has highest maximum bpm", () => {
    expect(bpmMax("presto")).toBeGreaterThan(bpmMax("largo"));
  });
});

describe("energyLevel", () => {
  it("presto has highest energy", () => {
    expect(energyLevel("presto")).toBeGreaterThan(
      energyLevel("largo")
    );
  });
});

describe("technicalDifficulty", () => {
  it("presto is most technically difficult", () => {
    expect(technicalDifficulty("presto")).toBeGreaterThan(
      technicalDifficulty("andante")
    );
  });
});

describe("emotionalWeight", () => {
  it("largo has most emotional weight", () => {
    expect(emotionalWeight("largo")).toBeGreaterThan(
      emotionalWeight("presto")
    );
  });
});

describe("danceableForHumans", () => {
  it("andante is danceable", () => {
    expect(danceableForHumans("andante")).toBe(true);
  });
  it("largo is not danceable", () => {
    expect(danceableForHumans("largo")).toBe(false);
  });
});

describe("suitableForMarch", () => {
  it("allegro is suitable for march", () => {
    expect(suitableForMarch("allegro")).toBe(true);
  });
  it("largo is not", () => {
    expect(suitableForMarch("largo")).toBe(false);
  });
});

describe("italianMeaning", () => {
  it("andante means walking pace", () => {
    expect(italianMeaning("andante")).toBe("walking_pace");
  });
});

describe("commonUsage", () => {
  it("presto used for finale", () => {
    expect(commonUsage("presto")).toBe("finale");
  });
});

describe("tempoMarkings", () => {
  it("returns 5 types", () => {
    expect(tempoMarkings()).toHaveLength(5);
  });
});
