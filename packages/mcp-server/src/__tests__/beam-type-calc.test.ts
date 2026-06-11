import { describe, it, expect } from "vitest";
import {
  span, moment, weight, fireRating,
  btCost, composite, forLongSpan, section,
  bestUse, beamTypeTypes,
} from "../beam-type-calc.js";

describe("span", () => {
  it("castellated longest span", () => {
    expect(span("castellated_hex_opening")).toBeGreaterThan(span("lvl_laminated_veneer"));
  });
});

describe("moment", () => {
  it("wide flange highest moment", () => {
    expect(moment("wide_flange_w_shape")).toBeGreaterThan(moment("lvl_laminated_veneer"));
  });
});

describe("weight", () => {
  it("castellated lightest (highest score)", () => {
    expect(weight("castellated_hex_opening")).toBeGreaterThan(weight("precast_concrete_rect"));
  });
});

describe("fireRating", () => {
  it("precast concrete best fire rating", () => {
    expect(fireRating("precast_concrete_rect")).toBeGreaterThan(fireRating("lvl_laminated_veneer"));
  });
});

describe("btCost", () => {
  it("glulam more than lvl", () => {
    expect(btCost("glulam_engineered_wood")).toBeGreaterThan(btCost("lvl_laminated_veneer"));
  });
});

describe("composite", () => {
  it("wide flange is composite", () => {
    expect(composite("wide_flange_w_shape")).toBe(true);
  });
  it("glulam not composite", () => {
    expect(composite("glulam_engineered_wood")).toBe(false);
  });
});

describe("forLongSpan", () => {
  it("castellated for long span", () => {
    expect(forLongSpan("castellated_hex_opening")).toBe(true);
  });
  it("lvl not for long span", () => {
    expect(forLongSpan("lvl_laminated_veneer")).toBe(false);
  });
});

describe("section", () => {
  it("castellated has hex opening", () => {
    expect(section("castellated_hex_opening")).toBe("hex_opening_expanded_depth");
  });
});

describe("bestUse", () => {
  it("glulam for exposed timber", () => {
    expect(bestUse("glulam_engineered_wood")).toBe("exposed_timber_cathedral_arch");
  });
});

describe("beamTypeTypes", () => {
  it("returns 5 types", () => {
    expect(beamTypeTypes()).toHaveLength(5);
  });
});
