import { describe, it, expect } from "vitest";
import {
  outletCount, monitoring, reliability, manageability,
  pduCost, remote, redundant, formFactor,
  bestUse, pduPowers,
} from "../pdu-power-calc.js";

describe("outletCount", () => {
  it("managed per outlet most outlets", () => {
    expect(outletCount("managed_per_outlet")).toBeGreaterThan(outletCount("auto_transfer_switch"));
  });
});

describe("monitoring", () => {
  it("managed per outlet best monitoring", () => {
    expect(monitoring("managed_per_outlet")).toBeGreaterThan(monitoring("basic_strip_rack"));
  });
});

describe("reliability", () => {
  it("auto transfer switch most reliable", () => {
    expect(reliability("auto_transfer_switch")).toBeGreaterThan(reliability("basic_strip_rack"));
  });
});

describe("manageability", () => {
  it("managed per outlet most manageable", () => {
    expect(manageability("managed_per_outlet")).toBeGreaterThan(manageability("basic_strip_rack"));
  });
});

describe("pduCost", () => {
  it("auto transfer switch most expensive", () => {
    expect(pduCost("auto_transfer_switch")).toBeGreaterThan(pduCost("basic_strip_rack"));
  });
});

describe("remote", () => {
  it("switched remote ctrl is remote", () => {
    expect(remote("switched_remote_ctrl")).toBe(true);
  });
  it("basic strip rack not remote", () => {
    expect(remote("basic_strip_rack")).toBe(false);
  });
});

describe("redundant", () => {
  it("auto transfer switch is redundant", () => {
    expect(redundant("auto_transfer_switch")).toBe(true);
  });
  it("managed per outlet not redundant", () => {
    expect(redundant("managed_per_outlet")).toBe(false);
  });
});

describe("formFactor", () => {
  it("switched remote ctrl uses horizontal 1u switched", () => {
    expect(formFactor("switched_remote_ctrl")).toBe("horizontal_1u_switched");
  });
});

describe("bestUse", () => {
  it("auto transfer switch best for critical load failover", () => {
    expect(bestUse("auto_transfer_switch")).toBe("critical_load_failover");
  });
});

describe("pduPowers", () => {
  it("returns 5 types", () => {
    expect(pduPowers()).toHaveLength(5);
  });
});
