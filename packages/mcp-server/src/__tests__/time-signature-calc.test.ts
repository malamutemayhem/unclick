import { describe, it, expect } from "vitest";
import {
  beatsPerMeasure, beatUnit, danceability,
  complexity, popularityInPop, compound,
  irregular, commonDance, famousExample, timeSignatures,
} from "../time-signature-calc.js";

describe("beatsPerMeasure", () => {
  it("seven eight has most beats", () => {
    expect(beatsPerMeasure("seven_eight")).toBeGreaterThan(
      beatsPerMeasure("three_four")
    );
  });
});

describe("beatUnit", () => {
  it("six eight has eighth note unit", () => {
    expect(beatUnit("six_eight")).toBe(8);
  });
});

describe("danceability", () => {
  it("four four is most danceable", () => {
    expect(danceability("four_four")).toBeGreaterThan(
      danceability("seven_eight")
    );
  });
});

describe("complexity", () => {
  it("seven eight is most complex", () => {
    expect(complexity("seven_eight")).toBeGreaterThan(
      complexity("four_four")
    );
  });
});

describe("popularityInPop", () => {
  it("four four is most popular in pop", () => {
    expect(popularityInPop("four_four")).toBeGreaterThan(
      popularityInPop("seven_eight")
    );
  });
});

describe("compound", () => {
  it("six eight is compound", () => {
    expect(compound("six_eight")).toBe(true);
  });
  it("four four is not compound", () => {
    expect(compound("four_four")).toBe(false);
  });
});

describe("irregular", () => {
  it("five four is irregular", () => {
    expect(irregular("five_four")).toBe(true);
  });
  it("four four is not irregular", () => {
    expect(irregular("four_four")).toBe(false);
  });
});

describe("commonDance", () => {
  it("three four for waltz", () => {
    expect(commonDance("three_four")).toBe("waltz");
  });
});

describe("famousExample", () => {
  it("five four is take five", () => {
    expect(famousExample("five_four")).toBe("take_five");
  });
});

describe("timeSignatures", () => {
  it("returns 5 types", () => {
    expect(timeSignatures()).toHaveLength(5);
  });
});
