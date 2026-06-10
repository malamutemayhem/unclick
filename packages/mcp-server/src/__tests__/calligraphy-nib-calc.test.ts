import { describe, it, expect } from "vitest";
import {
  lineWidthMm, lineVariation, inkFlowRate,
  pressureSensitivity, beginnerFriendly, bestScript,
  durabilityRating, maintenanceLevel, costEstimate, nibTypes,
} from "../calligraphy-nib-calc.js";

describe("lineWidthMm", () => {
  it("broad has widest line", () => {
    expect(lineWidthMm("broad")).toBeGreaterThan(
      lineWidthMm("pointed")
    );
  });
});

describe("lineVariation", () => {
  it("flex has most variation", () => {
    expect(lineVariation("flex")).toBeGreaterThan(
      lineVariation("broad")
    );
  });
});

describe("inkFlowRate", () => {
  it("broad has fastest ink flow", () => {
    expect(inkFlowRate("broad")).toBeGreaterThan(
      inkFlowRate("pointed")
    );
  });
});

describe("pressureSensitivity", () => {
  it("flex is most pressure sensitive", () => {
    expect(pressureSensitivity("flex")).toBeGreaterThan(
      pressureSensitivity("broad")
    );
  });
});

describe("beginnerFriendly", () => {
  it("broad is beginner friendly", () => {
    expect(beginnerFriendly("broad")).toBe(true);
  });
  it("flex is not", () => {
    expect(beginnerFriendly("flex")).toBe(false);
  });
});

describe("bestScript", () => {
  it("pointed is best for copperplate", () => {
    expect(bestScript("pointed")).toBe("copperplate");
  });
});

describe("durabilityRating", () => {
  it("broad is most durable", () => {
    expect(durabilityRating("broad")).toBeGreaterThan(
      durabilityRating("flex")
    );
  });
});

describe("maintenanceLevel", () => {
  it("flex needs most maintenance", () => {
    expect(maintenanceLevel("flex")).toBeGreaterThan(
      maintenanceLevel("broad")
    );
  });
});

describe("costEstimate", () => {
  it("flex costs most", () => {
    expect(costEstimate("flex")).toBeGreaterThan(
      costEstimate("broad")
    );
  });
});

describe("nibTypes", () => {
  it("returns 5 types", () => {
    expect(nibTypes()).toHaveLength(5);
  });
});
