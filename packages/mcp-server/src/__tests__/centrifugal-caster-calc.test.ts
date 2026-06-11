import { describe, it, expect } from "vitest";
import {
  densityControl, throughput, wallUniformity, surfaceFinish,
  ccCost_, hollow, forPipe, casterConfig,
  bestUse, centrifugalCasterTypes,
} from "../centrifugal-caster-calc.js";

describe("densityControl", () => {
  it("true centrifugal best density control", () => {
    expect(densityControl("true_centrifugal")).toBeGreaterThan(densityControl("spin_cast"));
  });
});

describe("throughput", () => {
  it("spin cast highest throughput", () => {
    expect(throughput("spin_cast")).toBeGreaterThan(throughput("vertical_centrifugal"));
  });
});

describe("wallUniformity", () => {
  it("true centrifugal best wall uniformity", () => {
    expect(wallUniformity("true_centrifugal")).toBeGreaterThan(wallUniformity("spin_cast"));
  });
});

describe("surfaceFinish", () => {
  it("true centrifugal best surface finish", () => {
    expect(surfaceFinish("true_centrifugal")).toBeGreaterThan(surfaceFinish("spin_cast"));
  });
});

describe("ccCost_", () => {
  it("vertical centrifugal most expensive", () => {
    expect(ccCost_("vertical_centrifugal")).toBeGreaterThan(ccCost_("spin_cast"));
  });
});

describe("hollow", () => {
  it("true centrifugal is hollow", () => {
    expect(hollow("true_centrifugal")).toBe(true);
  });
  it("spin cast not hollow", () => {
    expect(hollow("spin_cast")).toBe(false);
  });
});

describe("forPipe", () => {
  it("true centrifugal for pipe", () => {
    expect(forPipe("true_centrifugal")).toBe(true);
  });
  it("centrifuge cast not for pipe", () => {
    expect(forPipe("centrifuge_cast")).toBe(false);
  });
});

describe("casterConfig", () => {
  it("spin cast uses rubber mold rotate zinc pewter low melt alloy", () => {
    expect(casterConfig("spin_cast")).toBe("spin_caster_rubber_mold_rotate_zinc_pewter_low_melt_alloy");
  });
});

describe("bestUse", () => {
  it("true centrifugal for iron pipe horizontal spin hollow tube", () => {
    expect(bestUse("true_centrifugal")).toBe("iron_pipe_true_centrifugal_caster_horizontal_spin_hollow_tube");
  });
});

describe("centrifugalCasterTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugalCasterTypes()).toHaveLength(5);
  });
});
