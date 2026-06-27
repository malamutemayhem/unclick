import { describe, it, expect } from "vitest";
import {
  holesPerSignature, threadLengthMultiplier, spineFlexibility,
  layFlatRating, decorativeSpine, maxSignatures,
  strengthRating, difficultyRating, timePerSignatureMinutes, bindingStitches,
} from "../bookbinding-stitch-calc.js";

describe("holesPerSignature", () => {
  it("long stitch has most holes", () => {
    expect(holesPerSignature("long_stitch")).toBeGreaterThan(
      holesPerSignature("pamphlet")
    );
  });
});

describe("threadLengthMultiplier", () => {
  it("coptic uses most thread", () => {
    expect(threadLengthMultiplier("coptic")).toBeGreaterThan(
      threadLengthMultiplier("pamphlet")
    );
  });
});

describe("spineFlexibility", () => {
  it("coptic is most flexible", () => {
    expect(spineFlexibility("coptic")).toBeGreaterThan(
      spineFlexibility("kettle_stitch")
    );
  });
});

describe("layFlatRating", () => {
  it("coptic lays flattest", () => {
    expect(layFlatRating("coptic")).toBeGreaterThan(
      layFlatRating("kettle_stitch")
    );
  });
});

describe("decorativeSpine", () => {
  it("coptic has decorative spine", () => {
    expect(decorativeSpine("coptic")).toBe(true);
  });
  it("kettle stitch does not", () => {
    expect(decorativeSpine("kettle_stitch")).toBe(false);
  });
});

describe("maxSignatures", () => {
  it("kettle stitch handles most signatures", () => {
    expect(maxSignatures("kettle_stitch")).toBeGreaterThan(
      maxSignatures("pamphlet")
    );
  });
});

describe("strengthRating", () => {
  it("french link is strongest", () => {
    expect(strengthRating("french_link")).toBeGreaterThanOrEqual(
      strengthRating("coptic")
    );
  });
});

describe("difficultyRating", () => {
  it("french link is hardest", () => {
    expect(difficultyRating("french_link")).toBeGreaterThan(
      difficultyRating("pamphlet")
    );
  });
});

describe("timePerSignatureMinutes", () => {
  it("pamphlet takes longest per signature", () => {
    expect(timePerSignatureMinutes("pamphlet")).toBeGreaterThan(
      timePerSignatureMinutes("kettle_stitch")
    );
  });
});

describe("bindingStitches", () => {
  it("returns 5 stitches", () => {
    expect(bindingStitches()).toHaveLength(5);
  });
});
