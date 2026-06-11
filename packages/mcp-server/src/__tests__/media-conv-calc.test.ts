import { describe, it, expect } from "vitest";
import {
  throughput, portCount, reliability, manageability,
  convCost, managed, forIndustrial, conversionType,
  bestUse, mediaConverters,
} from "../media-conv-calc.js";

describe("throughput", () => {
  it("managed snmp highest throughput", () => {
    expect(throughput("managed_snmp_conv")).toBeGreaterThan(throughput("fiber_to_copper_1g"));
  });
});

describe("portCount", () => {
  it("managed snmp most ports", () => {
    expect(portCount("managed_snmp_conv")).toBeGreaterThan(portCount("fiber_to_fiber_mode"));
  });
});

describe("reliability", () => {
  it("industrial din most reliable", () => {
    expect(reliability("industrial_din_conv")).toBeGreaterThan(reliability("fiber_to_copper_1g"));
  });
});

describe("manageability", () => {
  it("managed snmp most manageable", () => {
    expect(manageability("managed_snmp_conv")).toBeGreaterThan(manageability("fiber_to_copper_1g"));
  });
});

describe("convCost", () => {
  it("industrial din most expensive", () => {
    expect(convCost("industrial_din_conv")).toBeGreaterThan(convCost("fiber_to_copper_1g"));
  });
});

describe("managed", () => {
  it("managed snmp is managed", () => {
    expect(managed("managed_snmp_conv")).toBe(true);
  });
  it("fiber to copper not managed", () => {
    expect(managed("fiber_to_copper_1g")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("industrial din is for industrial", () => {
    expect(forIndustrial("industrial_din_conv")).toBe(true);
  });
  it("fiber to copper not for industrial", () => {
    expect(forIndustrial("fiber_to_copper_1g")).toBe(false);
  });
});

describe("conversionType", () => {
  it("fiber to fiber mode uses sm mm wavelength", () => {
    expect(conversionType("fiber_to_fiber_mode")).toBe("sm_mm_wavelength");
  });
});

describe("bestUse", () => {
  it("poe media converter best for remote camera", () => {
    expect(bestUse("poe_media_converter")).toBe("remote_camera_poe_feed");
  });
});

describe("mediaConverters", () => {
  it("returns 5 types", () => {
    expect(mediaConverters()).toHaveLength(5);
  });
});
