import { describe, it, expect } from "vitest";
import {
  tempoBeatsPerMin, flexibilityRequired, strengthRequired,
  learningYears, caloriesPerHour, partnered,
  competitive, originCountry, popularityScore, danceStyles,
} from "../dance-style-calc.js";

describe("tempoBeatsPerMin", () => {
  it("salsa has fastest tempo", () => {
    expect(tempoBeatsPerMin("salsa")).toBeGreaterThan(
      tempoBeatsPerMin("ballet")
    );
  });
});

describe("flexibilityRequired", () => {
  it("ballet needs most flexibility", () => {
    expect(flexibilityRequired("ballet")).toBeGreaterThan(
      flexibilityRequired("waltz")
    );
  });
});

describe("strengthRequired", () => {
  it("breakdance needs most strength", () => {
    expect(strengthRequired("breakdance")).toBeGreaterThan(
      strengthRequired("waltz")
    );
  });
});

describe("learningYears", () => {
  it("ballet takes longest to learn", () => {
    expect(learningYears("ballet")).toBeGreaterThan(
      learningYears("waltz")
    );
  });
});

describe("caloriesPerHour", () => {
  it("breakdance burns most calories", () => {
    expect(caloriesPerHour("breakdance")).toBeGreaterThan(
      caloriesPerHour("waltz")
    );
  });
});

describe("partnered", () => {
  it("salsa is partnered", () => {
    expect(partnered("salsa")).toBe(true);
  });
  it("ballet is not", () => {
    expect(partnered("ballet")).toBe(false);
  });
});

describe("competitive", () => {
  it("hip hop is competitive", () => {
    expect(competitive("hip_hop")).toBe(true);
  });
  it("ballet is not", () => {
    expect(competitive("ballet")).toBe(false);
  });
});

describe("originCountry", () => {
  it("salsa from cuba", () => {
    expect(originCountry("salsa")).toBe("cuba");
  });
});

describe("popularityScore", () => {
  it("hip hop is most popular", () => {
    expect(popularityScore("hip_hop")).toBeGreaterThan(
      popularityScore("waltz")
    );
  });
});

describe("danceStyles", () => {
  it("returns 5 types", () => {
    expect(danceStyles()).toHaveLength(5);
  });
});
