import { describe, it, expect } from "vitest";
import {
  tipWidthMm, hammerWeightOz, strokesPerMinute, pitchRequired,
  detailLevel, surfaceFinish, metalThicknessMaxMm, annealingRequired,
  costPerTool, chasingTools,
} from "../chasing-calc.js";

describe("tipWidthMm", () => {
  it("planisher has widest tip", () => {
    expect(tipWidthMm("planisher")).toBeGreaterThan(tipWidthMm("tracer"));
  });
});

describe("hammerWeightOz", () => {
  it("doming uses heaviest hammer", () => {
    expect(hammerWeightOz("doming")).toBeGreaterThan(
      hammerWeightOz("tracer")
    );
  });
});

describe("strokesPerMinute", () => {
  it("tracer is fastest", () => {
    expect(strokesPerMinute("tracer")).toBeGreaterThan(
      strokesPerMinute("doming")
    );
  });
});

describe("pitchRequired", () => {
  it("liner needs pitch", () => {
    expect(pitchRequired("liner")).toBe(true);
  });
  it("planisher does not need pitch", () => {
    expect(pitchRequired("planisher")).toBe(false);
  });
});

describe("detailLevel", () => {
  it("tracer gives most detail", () => {
    expect(detailLevel("tracer")).toBeGreaterThan(
      detailLevel("planisher")
    );
  });
});

describe("surfaceFinish", () => {
  it("planisher gives smooth finish", () => {
    expect(surfaceFinish("planisher")).toBe("smooth");
  });
});

describe("metalThicknessMaxMm", () => {
  it("doming handles thickest metal", () => {
    expect(metalThicknessMaxMm("doming")).toBeGreaterThan(
      metalThicknessMaxMm("tracer")
    );
  });
});

describe("annealingRequired", () => {
  it("3 passes needs annealing", () => {
    expect(annealingRequired(3)).toBe(true);
  });
  it("2 passes does not", () => {
    expect(annealingRequired(2)).toBe(false);
  });
});

describe("costPerTool", () => {
  it("tracer is most expensive", () => {
    expect(costPerTool("tracer")).toBeGreaterThan(
      costPerTool("matting")
    );
  });
});

describe("chasingTools", () => {
  it("returns 5 tools", () => {
    expect(chasingTools()).toHaveLength(5);
  });
});
