import { describe, it, expect } from "vitest";
import {
  impressClean, depthControl, speedWork, handleSafe,
  fullerCost, handled, veeEdge, radiusSize,
  bestUse, topFullers,
} from "../top-fuller-calc.js";

describe("impressClean", () => {
  it("narrow round detail cleanest impress", () => {
    expect(impressClean("narrow_round_detail")).toBeGreaterThan(impressClean("wide_flat_spread"));
  });
});

describe("depthControl", () => {
  it("vee edge crease best depth control", () => {
    expect(depthControl("vee_edge_crease")).toBeGreaterThan(depthControl("wide_flat_spread"));
  });
});

describe("speedWork", () => {
  it("wide flat spread fastest work", () => {
    expect(speedWork("wide_flat_spread")).toBeGreaterThan(speedWork("narrow_round_detail"));
  });
});

describe("handleSafe", () => {
  it("handled top safe safest handle", () => {
    expect(handleSafe("handled_top_safe")).toBeGreaterThan(handleSafe("wide_flat_spread"));
  });
});

describe("fullerCost", () => {
  it("handled top safe most expensive", () => {
    expect(fullerCost("handled_top_safe")).toBeGreaterThan(fullerCost("half_round_standard"));
  });
});

describe("handled", () => {
  it("handled top safe is handled", () => {
    expect(handled("handled_top_safe")).toBe(true);
  });
  it("half round standard not handled", () => {
    expect(handled("half_round_standard")).toBe(false);
  });
});

describe("veeEdge", () => {
  it("vee edge crease has vee edge", () => {
    expect(veeEdge("vee_edge_crease")).toBe(true);
  });
  it("half round standard no vee edge", () => {
    expect(veeEdge("half_round_standard")).toBe(false);
  });
});

describe("radiusSize", () => {
  it("narrow round detail uses quarter inch radius", () => {
    expect(radiusSize("narrow_round_detail")).toBe("quarter_inch_radius");
  });
});

describe("bestUse", () => {
  it("half round standard best for general top fuller", () => {
    expect(bestUse("half_round_standard")).toBe("general_top_fuller");
  });
});

describe("topFullers", () => {
  it("returns 5 types", () => {
    expect(topFullers()).toHaveLength(5);
  });
});
