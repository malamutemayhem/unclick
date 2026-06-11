import { describe, it, expect } from "vitest";
import {
  capability, security, scalability, automation,
  bmcCost, openStandard, forCloud, protocol,
  bestUse, bmcIpmis,
} from "../bmc-ipmi-calc.js";

describe("capability", () => {
  it("openbmc linux most capable", () => {
    expect(capability("openbmc_linux")).toBeGreaterThan(capability("ipmi_2_0_legacy"));
  });
});

describe("security", () => {
  it("spdm secure best security", () => {
    expect(security("spdm_secure")).toBeGreaterThan(security("ipmi_2_0_legacy"));
  });
});

describe("scalability", () => {
  it("redfish rest most scalable", () => {
    expect(scalability("redfish_rest")).toBeGreaterThan(scalability("ipmi_2_0_legacy"));
  });
});

describe("automation", () => {
  it("redfish rest best automation", () => {
    expect(automation("redfish_rest")).toBeGreaterThan(automation("ipmi_2_0_legacy"));
  });
});

describe("bmcCost", () => {
  it("spdm secure most expensive", () => {
    expect(bmcCost("spdm_secure")).toBeGreaterThan(bmcCost("ipmi_2_0_legacy"));
  });
});

describe("openStandard", () => {
  it("redfish rest is open standard", () => {
    expect(openStandard("redfish_rest")).toBe(true);
  });
});

describe("forCloud", () => {
  it("openbmc linux is for cloud", () => {
    expect(forCloud("openbmc_linux")).toBe(true);
  });
  it("ipmi 2 0 legacy not for cloud", () => {
    expect(forCloud("ipmi_2_0_legacy")).toBe(false);
  });
});

describe("protocol", () => {
  it("spdm secure uses authenticated measurement", () => {
    expect(protocol("spdm_secure")).toBe("authenticated_measurement");
  });
});

describe("bestUse", () => {
  it("openbmc linux best for hyperscale custom fw", () => {
    expect(bestUse("openbmc_linux")).toBe("hyperscale_custom_fw");
  });
});

describe("bmcIpmis", () => {
  it("returns 5 types", () => {
    expect(bmcIpmis()).toHaveLength(5);
  });
});
