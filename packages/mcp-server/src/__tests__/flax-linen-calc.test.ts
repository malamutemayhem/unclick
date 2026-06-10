import { describe, it, expect } from "vitest";
import {
  durationDays, fiberLossPercent, waterRequired,
  toolsNeeded, laborIntensity, outputQuality,
  orderInProcess, byproductUseful, costPerKgProcessed, flaxStages,
} from "../flax-linen-calc.js";

describe("durationDays", () => {
  it("retting takes longest", () => {
    expect(durationDays("retting")).toBeGreaterThan(
      durationDays("pulling")
    );
  });
});

describe("fiberLossPercent", () => {
  it("hackling loses most fiber", () => {
    expect(fiberLossPercent("hackling")).toBeGreaterThan(
      fiberLossPercent("retting")
    );
  });
});

describe("waterRequired", () => {
  it("retting requires water", () => {
    expect(waterRequired("retting")).toBe(true);
  });
  it("breaking does not", () => {
    expect(waterRequired("breaking")).toBe(false);
  });
});

describe("toolsNeeded", () => {
  it("hackling needs most tools", () => {
    expect(toolsNeeded("hackling")).toBeGreaterThan(
      toolsNeeded("pulling")
    );
  });
});

describe("laborIntensity", () => {
  it("scutching is most labor intensive", () => {
    expect(laborIntensity("scutching")).toBeGreaterThan(
      laborIntensity("retting")
    );
  });
});

describe("outputQuality", () => {
  it("hackling produces best quality", () => {
    expect(outputQuality("hackling")).toBeGreaterThan(
      outputQuality("pulling")
    );
  });
});

describe("orderInProcess", () => {
  it("pulling is first", () => {
    expect(orderInProcess("pulling")).toBe(1);
  });
  it("hackling is last", () => {
    expect(orderInProcess("hackling")).toBe(5);
  });
});

describe("byproductUseful", () => {
  it("scutching has useful byproduct", () => {
    expect(byproductUseful("scutching")).toBe(true);
  });
  it("pulling does not", () => {
    expect(byproductUseful("pulling")).toBe(false);
  });
});

describe("costPerKgProcessed", () => {
  it("hackling costs most", () => {
    expect(costPerKgProcessed("hackling")).toBeGreaterThan(
      costPerKgProcessed("retting")
    );
  });
});

describe("flaxStages", () => {
  it("returns 5 stages", () => {
    expect(flaxStages()).toHaveLength(5);
  });
});
