import { describe, it, expect } from "vitest";
import {
  arousalLevel, durationMinutes, socialSignaling,
  cognitiveImpact, evolutionaryPurpose, positiveValence,
  approachMotivation, facialExpression, associatedHormone, emotionTypes,
} from "../emotion-type-calc.js";

describe("arousalLevel", () => {
  it("surprise highest arousal", () => {
    expect(arousalLevel("surprise")).toBeGreaterThan(
      arousalLevel("sadness")
    );
  });
});

describe("durationMinutes", () => {
  it("sadness lasts longest", () => {
    expect(durationMinutes("sadness")).toBeGreaterThan(
      durationMinutes("surprise")
    );
  });
});

describe("socialSignaling", () => {
  it("joy best social signal", () => {
    expect(socialSignaling("joy")).toBeGreaterThan(
      socialSignaling("surprise")
    );
  });
});

describe("cognitiveImpact", () => {
  it("fear has most cognitive impact", () => {
    expect(cognitiveImpact("fear")).toBeGreaterThan(
      cognitiveImpact("joy")
    );
  });
});

describe("evolutionaryPurpose", () => {
  it("fear highest evolutionary value", () => {
    expect(evolutionaryPurpose("fear")).toBeGreaterThan(
      evolutionaryPurpose("sadness")
    );
  });
});

describe("positiveValence", () => {
  it("joy is positive", () => {
    expect(positiveValence("joy")).toBe(true);
  });
  it("anger is not", () => {
    expect(positiveValence("anger")).toBe(false);
  });
});

describe("approachMotivation", () => {
  it("anger is approach", () => {
    expect(approachMotivation("anger")).toBe(true);
  });
  it("fear is not", () => {
    expect(approachMotivation("fear")).toBe(false);
  });
});

describe("facialExpression", () => {
  it("joy is smile", () => {
    expect(facialExpression("joy")).toBe("smile");
  });
});

describe("associatedHormone", () => {
  it("anger linked to adrenaline", () => {
    expect(associatedHormone("anger")).toBe("adrenaline");
  });
});

describe("emotionTypes", () => {
  it("returns 5 types", () => {
    expect(emotionTypes()).toHaveLength(5);
  });
});
