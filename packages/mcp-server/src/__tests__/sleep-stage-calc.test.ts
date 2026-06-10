import { describe, it, expect } from "vitest";
import {
  durationPercent, restorativeValue, memoryConsolidation, arousalThreshold,
  muscleRelaxation, dreamingOccurs, growthHormoneRelease, brainWavePattern,
  cyclePosition, sleepStages,
} from "../sleep-stage-calc.js";

describe("durationPercent", () => {
  it("n2 longest duration", () => {
    expect(durationPercent("n2_intermediate")).toBeGreaterThan(durationPercent("n1_light"));
  });
});

describe("restorativeValue", () => {
  it("n3 deep most restorative", () => {
    expect(restorativeValue("n3_deep")).toBeGreaterThan(restorativeValue("n1_light"));
  });
});

describe("memoryConsolidation", () => {
  it("rem best for memory", () => {
    expect(memoryConsolidation("rem")).toBeGreaterThan(memoryConsolidation("n3_deep"));
  });
});

describe("arousalThreshold", () => {
  it("n3 deep hardest to wake from", () => {
    expect(arousalThreshold("n3_deep")).toBeGreaterThan(arousalThreshold("n1_light"));
  });
});

describe("muscleRelaxation", () => {
  it("rem has most muscle relaxation", () => {
    expect(muscleRelaxation("rem")).toBeGreaterThan(muscleRelaxation("n3_deep"));
  });
});

describe("dreamingOccurs", () => {
  it("dreaming occurs in rem", () => {
    expect(dreamingOccurs("rem")).toBe(true);
  });
  it("no dreaming in n3", () => {
    expect(dreamingOccurs("n3_deep")).toBe(false);
  });
});

describe("growthHormoneRelease", () => {
  it("growth hormone in n3 deep", () => {
    expect(growthHormoneRelease("n3_deep")).toBe(true);
  });
  it("not in rem", () => {
    expect(growthHormoneRelease("rem")).toBe(false);
  });
});

describe("brainWavePattern", () => {
  it("n3 deep has delta waves", () => {
    expect(brainWavePattern("n3_deep")).toBe("delta_waves");
  });
});

describe("cyclePosition", () => {
  it("rem in second half of night", () => {
    expect(cyclePosition("rem")).toBe("second_half_night");
  });
});

describe("sleepStages", () => {
  it("returns 5 stages", () => {
    expect(sleepStages()).toHaveLength(5);
  });
});
