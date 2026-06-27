import { describe, it, expect } from "vitest";
import {
  depthMm, widthMm, blockWeightKg, profilesPerBlock, matchingTopToolRequired,
  heatingRequired, formingBlows, surfaceFinishQuality, costEstimate, swageProfiles,
} from "../swage-block-calc.js";

describe("depthMm", () => {
  it("bowl is deepest", () => {
    expect(depthMm("bowl")).toBeGreaterThan(depthMm("square"));
  });
});

describe("widthMm", () => {
  it("bowl is widest", () => {
    expect(widthMm("bowl")).toBeGreaterThan(widthMm("v_groove"));
  });
});

describe("blockWeightKg", () => {
  it("larger block is heavier", () => {
    expect(blockWeightKg(15)).toBeGreaterThan(blockWeightKg(10));
  });
});

describe("profilesPerBlock", () => {
  it("returns 20", () => {
    expect(profilesPerBlock()).toBe(20);
  });
});

describe("matchingTopToolRequired", () => {
  it("half round needs matching tool", () => {
    expect(matchingTopToolRequired("half_round")).toBe(true);
  });
  it("bowl does not need matching tool", () => {
    expect(matchingTopToolRequired("bowl")).toBe(false);
  });
});

describe("heatingRequired", () => {
  it("thick stock needs heating", () => {
    expect(heatingRequired(10)).toBe(true);
  });
  it("thin stock does not", () => {
    expect(heatingRequired(4)).toBe(false);
  });
});

describe("formingBlows", () => {
  it("bowl needs most blows", () => {
    expect(formingBlows("bowl")).toBeGreaterThan(formingBlows("square"));
  });
});

describe("surfaceFinishQuality", () => {
  it("bowl has best finish", () => {
    expect(surfaceFinishQuality("bowl")).toBeGreaterThan(
      surfaceFinishQuality("v_groove")
    );
  });
});

describe("costEstimate", () => {
  it("larger block costs more", () => {
    expect(costEstimate(15)).toBeGreaterThan(costEstimate(10));
  });
});

describe("swageProfiles", () => {
  it("returns 5 profiles", () => {
    expect(swageProfiles()).toHaveLength(5);
  });
});
