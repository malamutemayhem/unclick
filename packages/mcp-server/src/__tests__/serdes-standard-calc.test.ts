import { describe, it, expect } from "vitest";
import {
  lineRate, laneCount, reachDistance, powerPerLane,
  serdesCost, pam4, forCompute, encoding,
  bestUse, serdesStandards,
} from "../serdes-standard-calc.js";

describe("lineRate", () => {
  it("ethernet 112g pam4 highest line rate", () => {
    expect(lineRate("ethernet_112g_pam4")).toBeGreaterThan(lineRate("usb4_40g"));
  });
});

describe("laneCount", () => {
  it("ethernet 112g pam4 most lanes", () => {
    expect(laneCount("ethernet_112g_pam4")).toBeGreaterThan(laneCount("usb4_40g"));
  });
});

describe("reachDistance", () => {
  it("ethernet 112g pam4 longest reach", () => {
    expect(reachDistance("ethernet_112g_pam4")).toBeGreaterThan(reachDistance("usb4_40g"));
  });
});

describe("powerPerLane", () => {
  it("ethernet 112g pam4 highest power per lane", () => {
    expect(powerPerLane("ethernet_112g_pam4")).toBeGreaterThan(powerPerLane("usb4_40g"));
  });
});

describe("serdesCost", () => {
  it("ethernet 112g pam4 most expensive", () => {
    expect(serdesCost("ethernet_112g_pam4")).toBeGreaterThan(serdesCost("usb4_40g"));
  });
});

describe("pam4", () => {
  it("ethernet 112g pam4 uses pam4", () => {
    expect(pam4("ethernet_112g_pam4")).toBe(true);
  });
  it("pcie gen5 32g not pam4", () => {
    expect(pam4("pcie_gen5_32g")).toBe(false);
  });
});

describe("forCompute", () => {
  it("pcie gen5 32g is for compute", () => {
    expect(forCompute("pcie_gen5_32g")).toBe(true);
  });
  it("ethernet 112g pam4 not for compute", () => {
    expect(forCompute("ethernet_112g_pam4")).toBe(false);
  });
});

describe("encoding", () => {
  it("ethernet 112g pam4 uses rs fec 544 514", () => {
    expect(encoding("ethernet_112g_pam4")).toBe("rs_fec_544_514");
  });
});

describe("bestUse", () => {
  it("ethernet 112g pam4 best for 800g switch asic", () => {
    expect(bestUse("ethernet_112g_pam4")).toBe("800g_switch_asic");
  });
});

describe("serdesStandards", () => {
  it("returns 5 types", () => {
    expect(serdesStandards()).toHaveLength(5);
  });
});
