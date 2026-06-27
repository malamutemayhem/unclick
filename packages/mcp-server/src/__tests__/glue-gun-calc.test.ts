import { describe, it, expect } from "vitest";
import {
  bondStrength, heatUpSpeed, precision, portability,
  gunCost, cordless, kidSafe, stickSize,
  bestProject, glueGuns,
} from "../glue-gun-calc.js";

describe("bondStrength", () => {
  it("industrial high output strongest bond", () => {
    expect(bondStrength("industrial_high_output")).toBeGreaterThan(bondStrength("mini_low_temp"));
  });
});

describe("heatUpSpeed", () => {
  it("pen style precision fastest heat up", () => {
    expect(heatUpSpeed("pen_style_precision")).toBeGreaterThan(heatUpSpeed("industrial_high_output"));
  });
});

describe("precision", () => {
  it("pen style precision most precise", () => {
    expect(precision("pen_style_precision")).toBeGreaterThan(precision("industrial_high_output"));
  });
});

describe("portability", () => {
  it("cordless rechargeable most portable", () => {
    expect(portability("cordless_rechargeable")).toBeGreaterThan(portability("industrial_high_output"));
  });
});

describe("gunCost", () => {
  it("industrial high output most expensive", () => {
    expect(gunCost("industrial_high_output")).toBeGreaterThan(gunCost("mini_low_temp"));
  });
});

describe("cordless", () => {
  it("cordless rechargeable is cordless", () => {
    expect(cordless("cordless_rechargeable")).toBe(true);
  });
  it("full size dual temp is not", () => {
    expect(cordless("full_size_dual_temp")).toBe(false);
  });
});

describe("kidSafe", () => {
  it("mini low temp is kid safe", () => {
    expect(kidSafe("mini_low_temp")).toBe(true);
  });
  it("industrial high output is not", () => {
    expect(kidSafe("industrial_high_output")).toBe(false);
  });
});

describe("stickSize", () => {
  it("full size dual temp uses 11mm standard dual", () => {
    expect(stickSize("full_size_dual_temp")).toBe("11mm_standard_dual");
  });
});

describe("bestProject", () => {
  it("pen style precision best for jewelry model detail work", () => {
    expect(bestProject("pen_style_precision")).toBe("jewelry_model_detail_work");
  });
});

describe("glueGuns", () => {
  it("returns 5 types", () => {
    expect(glueGuns()).toHaveLength(5);
  });
});
