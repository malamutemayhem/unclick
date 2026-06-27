import { describe, it, expect } from "vitest";
import {
  particleRemoval, throughput, somaticCellReduction, milkQuality,
  mcCost, continuous, forRaw, clarifierConfig,
  bestUse, milkClarifierTypes,
} from "../milk-clarifier-calc.js";

describe("particleRemoval", () => {
  it("hermetic clarifier best particle removal", () => {
    expect(particleRemoval("hermetic_clarifier")).toBeGreaterThan(particleRemoval("inline_filter"));
  });
});

describe("throughput", () => {
  it("self desludging highest throughput", () => {
    expect(throughput("self_desludging")).toBeGreaterThan(throughput("cold_clarifier"));
  });
});

describe("somaticCellReduction", () => {
  it("hermetic clarifier best somatic cell reduction", () => {
    expect(somaticCellReduction("hermetic_clarifier")).toBeGreaterThan(somaticCellReduction("inline_filter"));
  });
});

describe("milkQuality", () => {
  it("hermetic clarifier best milk quality", () => {
    expect(milkQuality("hermetic_clarifier")).toBeGreaterThan(milkQuality("inline_filter"));
  });
});

describe("mcCost", () => {
  it("hermetic clarifier most expensive", () => {
    expect(mcCost("hermetic_clarifier")).toBeGreaterThan(mcCost("inline_filter"));
  });
});

describe("continuous", () => {
  it("all clarifiers are continuous", () => {
    expect(continuous("disc_centrifugal")).toBe(true);
    expect(continuous("inline_filter")).toBe(true);
  });
});

describe("forRaw", () => {
  it("cold clarifier for raw milk", () => {
    expect(forRaw("cold_clarifier")).toBe(true);
  });
  it("inline filter not for raw", () => {
    expect(forRaw("inline_filter")).toBe(false);
  });
});

describe("clarifierConfig", () => {
  it("cold clarifier uses low temp raw milk preserve", () => {
    expect(clarifierConfig("cold_clarifier")).toBe("cold_clarifier_low_temp_raw_milk_preserve_enzyme_flavor_profile");
  });
});

describe("bestUse", () => {
  it("self desludging for large dairy auto eject", () => {
    expect(bestUse("self_desludging")).toBe("large_dairy_self_desludging_clarifier_auto_eject_continuous_run");
  });
});

describe("milkClarifierTypes", () => {
  it("returns 5 types", () => {
    expect(milkClarifierTypes()).toHaveLength(5);
  });
});
