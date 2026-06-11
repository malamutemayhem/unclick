import { describe, it, expect } from "vitest";
import {
  outlets, monitoring, reliability, management,
  pdCost, switchable, forDataCenter, input,
  bestUse, pduTypes,
} from "../pdu-type-calc.js";

describe("outlets", () => {
  it("switched most outlets", () => {
    expect(outlets("switched_outlet_remote")).toBeGreaterThan(outlets("inline_metered_tap_box"));
  });
});

describe("monitoring", () => {
  it("per outlet best monitoring", () => {
    expect(monitoring("monitored_per_outlet")).toBeGreaterThan(monitoring("basic_metered_rack"));
  });
});

describe("reliability", () => {
  it("ats most reliable", () => {
    expect(reliability("auto_transfer_switch")).toBeGreaterThan(reliability("basic_metered_rack"));
  });
});

describe("management", () => {
  it("switched best management", () => {
    expect(management("switched_outlet_remote")).toBeGreaterThan(management("basic_metered_rack"));
  });
});

describe("pdCost", () => {
  it("ats most expensive", () => {
    expect(pdCost("auto_transfer_switch")).toBeGreaterThan(pdCost("basic_metered_rack"));
  });
});

describe("switchable", () => {
  it("switched is switchable", () => {
    expect(switchable("switched_outlet_remote")).toBe(true);
  });
  it("basic not switchable", () => {
    expect(switchable("basic_metered_rack")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("monitored for data center", () => {
    expect(forDataCenter("monitored_per_outlet")).toBe(true);
  });
  it("basic not data center", () => {
    expect(forDataCenter("basic_metered_rack")).toBe(false);
  });
});

describe("input", () => {
  it("ats uses dual feed", () => {
    expect(input("auto_transfer_switch")).toBe("dual_feed_ats_redundant_power");
  });
});

describe("bestUse", () => {
  it("switched for remote reboot", () => {
    expect(bestUse("switched_outlet_remote")).toBe("remote_reboot_outlet_control");
  });
});

describe("pduTypes", () => {
  it("returns 5 types", () => {
    expect(pduTypes()).toHaveLength(5);
  });
});
