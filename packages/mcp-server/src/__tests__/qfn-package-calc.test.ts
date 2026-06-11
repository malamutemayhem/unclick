import { describe, it, expect } from "vitest";
import {
  thermal, density, inspectability, leadCount,
  qfCost, wettable, forPower, dieAttach,
  bestUse, qfnPackages,
} from "../qfn-package-calc.js";

describe("thermal", () => {
  it("power qfn best thermal", () => {
    expect(thermal("power_qfn_clip_bond")).toBeGreaterThan(thermal("dfn_dual_flat"));
  });
});

describe("density", () => {
  it("routable qfn highest density", () => {
    expect(density("routable_qfn_multi_row")).toBeGreaterThan(density("qfn_standard_exposed"));
  });
});

describe("inspectability", () => {
  it("wettable flank best inspectability", () => {
    expect(inspectability("wettable_flank_qfn")).toBeGreaterThan(inspectability("qfn_standard_exposed"));
  });
});

describe("leadCount", () => {
  it("routable qfn most leads", () => {
    expect(leadCount("routable_qfn_multi_row")).toBeGreaterThan(leadCount("dfn_dual_flat"));
  });
});

describe("qfCost", () => {
  it("routable qfn most expensive", () => {
    expect(qfCost("routable_qfn_multi_row")).toBeGreaterThan(qfCost("dfn_dual_flat"));
  });
});

describe("wettable", () => {
  it("wettable flank is wettable", () => {
    expect(wettable("wettable_flank_qfn")).toBe(true);
  });
  it("qfn standard not wettable", () => {
    expect(wettable("qfn_standard_exposed")).toBe(false);
  });
});

describe("forPower", () => {
  it("power qfn for power", () => {
    expect(forPower("power_qfn_clip_bond")).toBe(true);
  });
  it("dfn dual flat not for power", () => {
    expect(forPower("dfn_dual_flat")).toBe(false);
  });
});

describe("dieAttach", () => {
  it("power qfn uses copper clip solder top", () => {
    expect(dieAttach("power_qfn_clip_bond")).toBe("copper_clip_solder_top");
  });
});

describe("bestUse", () => {
  it("wettable flank best for automotive inspect", () => {
    expect(bestUse("wettable_flank_qfn")).toBe("automotive_aoi_solder_inspect");
  });
});

describe("qfnPackages", () => {
  it("returns 5 types", () => {
    expect(qfnPackages()).toHaveLength(5);
  });
});
