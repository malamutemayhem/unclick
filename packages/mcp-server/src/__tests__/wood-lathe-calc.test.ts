import { describe, it, expect } from "vitest";
import {
  swingDiameterCm, bedLengthCm, maxRpm,
  motorWatts, weightKg, variableSpeed,
  bestProject, beginnerFriendly, costEstimate, latheTypes,
} from "../wood-lathe-calc.js";

describe("swingDiameterCm", () => {
  it("bowl lathe has largest swing", () => {
    expect(swingDiameterCm("bowl")).toBeGreaterThan(
      swingDiameterCm("mini")
    );
  });
});

describe("bedLengthCm", () => {
  it("full size has longest bed", () => {
    expect(bedLengthCm("full_size")).toBeGreaterThan(
      bedLengthCm("pen")
    );
  });
});

describe("maxRpm", () => {
  it("pen lathe spins fastest", () => {
    expect(maxRpm("pen")).toBeGreaterThan(
      maxRpm("bowl")
    );
  });
});

describe("motorWatts", () => {
  it("bowl lathe has most power", () => {
    expect(motorWatts("bowl")).toBeGreaterThan(
      motorWatts("pen")
    );
  });
});

describe("weightKg", () => {
  it("bowl lathe is heaviest", () => {
    expect(weightKg("bowl")).toBeGreaterThan(
      weightKg("pen")
    );
  });
});

describe("variableSpeed", () => {
  it("midi has variable speed", () => {
    expect(variableSpeed("midi")).toBe(true);
  });
  it("pen does not", () => {
    expect(variableSpeed("pen")).toBe(false);
  });
});

describe("bestProject", () => {
  it("pen lathe is best for pens", () => {
    expect(bestProject("pen")).toBe("pens");
  });
});

describe("beginnerFriendly", () => {
  it("mini is beginner friendly", () => {
    expect(beginnerFriendly("mini")).toBe(true);
  });
  it("bowl is not", () => {
    expect(beginnerFriendly("bowl")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("bowl lathe costs most", () => {
    expect(costEstimate("bowl")).toBeGreaterThan(
      costEstimate("pen")
    );
  });
});

describe("latheTypes", () => {
  it("returns 5 types", () => {
    expect(latheTypes()).toHaveLength(5);
  });
});
