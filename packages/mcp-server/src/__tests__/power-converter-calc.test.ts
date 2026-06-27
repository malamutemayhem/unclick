import { describe, it, expect } from "vitest";
import {
  efficiency, powerDensity, regulation, emi,
  convCost, isolated, forRenewable, topology,
  bestUse, powerConverters,
} from "../power-converter-calc.js";

describe("efficiency", () => {
  it("llc resonant highest efficiency", () => {
    expect(efficiency("llc_resonant")).toBeGreaterThan(efficiency("flyback_isolated"));
  });
});

describe("powerDensity", () => {
  it("buck sync highest power density", () => {
    expect(powerDensity("buck_sync")).toBeGreaterThan(powerDensity("boost_pfc"));
  });
});

describe("regulation", () => {
  it("llc resonant best regulation", () => {
    expect(regulation("llc_resonant")).toBeGreaterThan(regulation("flyback_isolated"));
  });
});

describe("emi", () => {
  it("llc resonant best emi performance", () => {
    expect(emi("llc_resonant")).toBeGreaterThan(emi("flyback_isolated"));
  });
});

describe("convCost", () => {
  it("dab bidirectional most expensive", () => {
    expect(convCost("dab_bidirectional")).toBeGreaterThan(convCost("flyback_isolated"));
  });
});

describe("isolated", () => {
  it("llc resonant is isolated", () => {
    expect(isolated("llc_resonant")).toBe(true);
  });
  it("buck sync not isolated", () => {
    expect(isolated("buck_sync")).toBe(false);
  });
});

describe("forRenewable", () => {
  it("dab bidirectional for renewable", () => {
    expect(forRenewable("dab_bidirectional")).toBe(true);
  });
  it("flyback isolated not for renewable", () => {
    expect(forRenewable("flyback_isolated")).toBe(false);
  });
});

describe("topology", () => {
  it("dab bidirectional uses dual active bridge zvs", () => {
    expect(topology("dab_bidirectional")).toBe("dual_active_bridge_zvs");
  });
});

describe("bestUse", () => {
  it("buck sync best for cpu vr point of load", () => {
    expect(bestUse("buck_sync")).toBe("cpu_vr_point_of_load");
  });
});

describe("powerConverters", () => {
  it("returns 5 types", () => {
    expect(powerConverters()).toHaveLength(5);
  });
});
