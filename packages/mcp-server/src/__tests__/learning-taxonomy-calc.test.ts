import { describe, it, expect } from "vitest";
import {
  cognitiveComplexity, assessmentDifficulty, transferability,
  timeToMaster, retentionDuration, requiresPriorKnowledge,
  measurableByTest, actionVerb, bloomsPosition, learningTaxonomyLevels,
} from "../learning-taxonomy-calc.js";

describe("cognitiveComplexity", () => {
  it("create most complex", () => {
    expect(cognitiveComplexity("create")).toBeGreaterThan(
      cognitiveComplexity("remember")
    );
  });
});

describe("assessmentDifficulty", () => {
  it("create hardest to assess", () => {
    expect(assessmentDifficulty("create")).toBeGreaterThan(
      assessmentDifficulty("remember")
    );
  });
});

describe("transferability", () => {
  it("create most transferable", () => {
    expect(transferability("create")).toBeGreaterThan(
      transferability("remember")
    );
  });
});

describe("timeToMaster", () => {
  it("create takes longest", () => {
    expect(timeToMaster("create")).toBeGreaterThan(
      timeToMaster("understand")
    );
  });
});

describe("retentionDuration", () => {
  it("create retained longest", () => {
    expect(retentionDuration("create")).toBeGreaterThan(
      retentionDuration("remember")
    );
  });
});

describe("requiresPriorKnowledge", () => {
  it("understand requires prior knowledge", () => {
    expect(requiresPriorKnowledge("understand")).toBe(true);
  });
  it("remember does not", () => {
    expect(requiresPriorKnowledge("remember")).toBe(false);
  });
});

describe("measurableByTest", () => {
  it("apply measurable by test", () => {
    expect(measurableByTest("apply")).toBe(true);
  });
  it("create is not", () => {
    expect(measurableByTest("create")).toBe(false);
  });
});

describe("actionVerb", () => {
  it("analyze uses compare contrast", () => {
    expect(actionVerb("analyze")).toBe("compare_contrast");
  });
});

describe("bloomsPosition", () => {
  it("create is at top", () => {
    expect(bloomsPosition("create")).toBe("top");
  });
});

describe("learningTaxonomyLevels", () => {
  it("returns 5 levels", () => {
    expect(learningTaxonomyLevels()).toHaveLength(5);
  });
});
