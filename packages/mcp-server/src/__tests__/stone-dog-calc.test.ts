import { describe, it, expect } from "vitest";
import {
  holdForce, stoneGrip, setupSpeed, spanRange,
  dogCost, adjustable, forStep, dogShape,
  bestUse, stoneDogs,
} from "../stone-dog-calc.js";

describe("holdForce", () => {
  it("wedge clamp tight most hold force", () => {
    expect(holdForce("wedge_clamp_tight")).toBeGreaterThan(holdForce("adjustable_span_slide"));
  });
});

describe("stoneGrip", () => {
  it("offset hook step best stone grip", () => {
    expect(stoneGrip("offset_hook_step")).toBeGreaterThan(stoneGrip("adjustable_span_slide"));
  });
});

describe("setupSpeed", () => {
  it("adjustable span slide fastest setup", () => {
    expect(setupSpeed("adjustable_span_slide")).toBeGreaterThan(setupSpeed("ring_bolt_anchor"));
  });
});

describe("spanRange", () => {
  it("adjustable span slide best span range", () => {
    expect(spanRange("adjustable_span_slide")).toBeGreaterThan(spanRange("ring_bolt_anchor"));
  });
});

describe("dogCost", () => {
  it("adjustable span slide most expensive", () => {
    expect(dogCost("adjustable_span_slide")).toBeGreaterThan(dogCost("straight_bar_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable span slide is adjustable", () => {
    expect(adjustable("adjustable_span_slide")).toBe(true);
  });
  it("straight bar standard not adjustable", () => {
    expect(adjustable("straight_bar_standard")).toBe(false);
  });
});

describe("forStep", () => {
  it("offset hook step is for step", () => {
    expect(forStep("offset_hook_step")).toBe(true);
  });
  it("straight bar standard not for step", () => {
    expect(forStep("straight_bar_standard")).toBe(false);
  });
});

describe("dogShape", () => {
  it("wedge clamp tight uses wedge taper clamp", () => {
    expect(dogShape("wedge_clamp_tight")).toBe("wedge_taper_clamp");
  });
});

describe("bestUse", () => {
  it("adjustable span slide best for variable width hold", () => {
    expect(bestUse("adjustable_span_slide")).toBe("variable_width_hold");
  });
});

describe("stoneDogs", () => {
  it("returns 5 types", () => {
    expect(stoneDogs()).toHaveLength(5);
  });
});
