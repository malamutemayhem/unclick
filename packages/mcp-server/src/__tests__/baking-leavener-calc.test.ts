import { describe, it, expect } from "vitest";
import {
  riseTime, flavorComplexity, textureOpenness,
  shelfStability, skillRequired, biological,
  requiresAcid, bestProduct, gasProduced, leavenerTypes,
} from "../baking-leavener-calc.js";

describe("riseTime", () => {
  it("sourdough takes longest", () => {
    expect(riseTime("sourdough")).toBeGreaterThan(
      riseTime("baking_soda")
    );
  });
});

describe("flavorComplexity", () => {
  it("sourdough most complex", () => {
    expect(flavorComplexity("sourdough")).toBeGreaterThan(
      flavorComplexity("baking_powder")
    );
  });
});

describe("textureOpenness", () => {
  it("sourdough most open", () => {
    expect(textureOpenness("sourdough")).toBeGreaterThan(
      textureOpenness("baking_soda")
    );
  });
});

describe("shelfStability", () => {
  it("baking soda most stable", () => {
    expect(shelfStability("baking_soda")).toBeGreaterThan(
      shelfStability("sourdough")
    );
  });
});

describe("skillRequired", () => {
  it("sourdough needs most skill", () => {
    expect(skillRequired("sourdough")).toBeGreaterThan(
      skillRequired("baking_powder")
    );
  });
});

describe("biological", () => {
  it("yeast is biological", () => {
    expect(biological("yeast")).toBe(true);
  });
  it("baking soda is not", () => {
    expect(biological("baking_soda")).toBe(false);
  });
});

describe("requiresAcid", () => {
  it("baking soda requires acid", () => {
    expect(requiresAcid("baking_soda")).toBe(true);
  });
  it("yeast does not", () => {
    expect(requiresAcid("yeast")).toBe(false);
  });
});

describe("bestProduct", () => {
  it("steam for puff pastry", () => {
    expect(bestProduct("steam")).toBe("puff_pastry");
  });
});

describe("gasProduced", () => {
  it("steam produces water vapor", () => {
    expect(gasProduced("steam")).toBe("water_vapor");
  });
});

describe("leavenerTypes", () => {
  it("returns 5 types", () => {
    expect(leavenerTypes()).toHaveLength(5);
  });
});
