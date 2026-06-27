import { describe, it, expect } from "vitest";
import {
  retentionRate, engagementLevel, scalability,
  resourceCost, selfPaceAbility, requiresEquipment,
  groupActivity, bestMedium, brainArea, learningStyles,
} from "../learning-style-calc.js";

describe("retentionRate", () => {
  it("kinesthetic best retention", () => {
    expect(retentionRate("kinesthetic")).toBeGreaterThan(
      retentionRate("auditory")
    );
  });
});

describe("engagementLevel", () => {
  it("kinesthetic most engaging", () => {
    expect(engagementLevel("kinesthetic")).toBeGreaterThan(
      engagementLevel("reading_writing")
    );
  });
});

describe("scalability", () => {
  it("reading writing most scalable", () => {
    expect(scalability("reading_writing")).toBeGreaterThan(
      scalability("kinesthetic")
    );
  });
});

describe("resourceCost", () => {
  it("kinesthetic most costly", () => {
    expect(resourceCost("kinesthetic")).toBeGreaterThan(
      resourceCost("reading_writing")
    );
  });
});

describe("selfPaceAbility", () => {
  it("reading writing best self paced", () => {
    expect(selfPaceAbility("reading_writing")).toBeGreaterThan(
      selfPaceAbility("social")
    );
  });
});

describe("requiresEquipment", () => {
  it("kinesthetic requires equipment", () => {
    expect(requiresEquipment("kinesthetic")).toBe(true);
  });
  it("auditory does not", () => {
    expect(requiresEquipment("auditory")).toBe(false);
  });
});

describe("groupActivity", () => {
  it("social is group activity", () => {
    expect(groupActivity("social")).toBe(true);
  });
  it("visual is not", () => {
    expect(groupActivity("visual")).toBe(false);
  });
});

describe("bestMedium", () => {
  it("visual uses diagrams", () => {
    expect(bestMedium("visual")).toBe("diagrams");
  });
});

describe("brainArea", () => {
  it("auditory in temporal lobe", () => {
    expect(brainArea("auditory")).toBe("temporal_lobe");
  });
});

describe("learningStyles", () => {
  it("returns 5 styles", () => {
    expect(learningStyles()).toHaveLength(5);
  });
});
