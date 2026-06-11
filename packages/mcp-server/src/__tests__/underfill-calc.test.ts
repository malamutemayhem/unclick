import { describe, it, expect } from "vitest";
import {
  flowability, reliability, cureSpeed, reworkability,
  fillCost, reworkable, preApplied, cureMethod,
  bestUse, underfills,
} from "../underfill-calc.js";

describe("flowability", () => {
  it("capillary flow epoxy best flowability", () => {
    expect(flowability("capillary_flow_epoxy")).toBeGreaterThan(flowability("corner_bond_dot"));
  });
});

describe("reliability", () => {
  it("molded underfill muf most reliable", () => {
    expect(reliability("molded_underfill_muf")).toBeGreaterThan(reliability("corner_bond_dot"));
  });
});

describe("cureSpeed", () => {
  it("corner bond dot fastest cure", () => {
    expect(cureSpeed("corner_bond_dot")).toBeGreaterThan(cureSpeed("reworkable_thermo"));
  });
});

describe("reworkability", () => {
  it("reworkable thermo most reworkable", () => {
    expect(reworkability("reworkable_thermo")).toBeGreaterThan(reworkability("molded_underfill_muf"));
  });
});

describe("fillCost", () => {
  it("molded underfill muf most expensive", () => {
    expect(fillCost("molded_underfill_muf")).toBeGreaterThan(fillCost("corner_bond_dot"));
  });
});

describe("reworkable", () => {
  it("reworkable thermo is reworkable", () => {
    expect(reworkable("reworkable_thermo")).toBe(true);
  });
  it("capillary flow epoxy not reworkable", () => {
    expect(reworkable("capillary_flow_epoxy")).toBe(false);
  });
});

describe("preApplied", () => {
  it("no flow pre apply is pre applied", () => {
    expect(preApplied("no_flow_pre_apply")).toBe(true);
  });
  it("capillary flow epoxy not pre applied", () => {
    expect(preApplied("capillary_flow_epoxy")).toBe(false);
  });
});

describe("cureMethod", () => {
  it("corner bond dot uses uv snap cure", () => {
    expect(cureMethod("corner_bond_dot")).toBe("uv_snap_cure");
  });
});

describe("bestUse", () => {
  it("molded underfill muf best for wafer level package fill", () => {
    expect(bestUse("molded_underfill_muf")).toBe("wafer_level_package_fill");
  });
});

describe("underfills", () => {
  it("returns 5 types", () => {
    expect(underfills()).toHaveLength(5);
  });
});
