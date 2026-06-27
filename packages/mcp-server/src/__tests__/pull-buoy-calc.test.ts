import { describe, it, expect } from "vitest";
import {
  legIsolation, buoyancy, gripStay, comfort,
  buoyCost, hasStrap, kidsSize, foamType,
  bestDrill, pullBuoys,
} from "../pull-buoy-calc.js";

describe("legIsolation", () => {
  it("ankle strap lock best leg isolation", () => {
    expect(legIsolation("ankle_strap_lock")).toBeGreaterThan(legIsolation("junior_small_size"));
  });
});

describe("buoyancy", () => {
  it("figure eight classic most buoyancy", () => {
    expect(buoyancy("figure_eight_classic")).toBeGreaterThan(buoyancy("junior_small_size"));
  });
});

describe("gripStay", () => {
  it("ankle strap lock best grip stay", () => {
    expect(gripStay("ankle_strap_lock")).toBeGreaterThan(gripStay("soft_foam_comfort"));
  });
});

describe("comfort", () => {
  it("soft foam comfort most comfortable", () => {
    expect(comfort("soft_foam_comfort")).toBeGreaterThan(comfort("figure_eight_classic"));
  });
});

describe("buoyCost", () => {
  it("ergonomic contour fit most expensive", () => {
    expect(buoyCost("ergonomic_contour_fit")).toBeGreaterThan(buoyCost("figure_eight_classic"));
  });
});

describe("hasStrap", () => {
  it("ankle strap lock has strap", () => {
    expect(hasStrap("ankle_strap_lock")).toBe(true);
  });
  it("figure eight classic has no strap", () => {
    expect(hasStrap("figure_eight_classic")).toBe(false);
  });
});

describe("kidsSize", () => {
  it("junior small size is kids size", () => {
    expect(kidsSize("junior_small_size")).toBe(true);
  });
  it("figure eight classic is not kids size", () => {
    expect(kidsSize("figure_eight_classic")).toBe(false);
  });
});

describe("foamType", () => {
  it("soft foam comfort uses plush nbr foam", () => {
    expect(foamType("soft_foam_comfort")).toBe("plush_nbr_foam");
  });
});

describe("bestDrill", () => {
  it("ankle strap lock best for sprint no slip drill", () => {
    expect(bestDrill("ankle_strap_lock")).toBe("sprint_no_slip_drill");
  });
});

describe("pullBuoys", () => {
  it("returns 5 types", () => {
    expect(pullBuoys()).toHaveLength(5);
  });
});
