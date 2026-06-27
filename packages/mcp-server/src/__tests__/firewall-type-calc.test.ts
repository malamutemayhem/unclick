import { describe, it, expect } from "vitest";
import {
  throughputGbps, inspectionDepth, latencyMs,
  configComplexity, costScore, applicationAware,
  requiresHardware, bestProtection, deploymentModel, firewallTypes,
} from "../firewall-type-calc.js";

describe("throughputGbps", () => {
  it("packet filter highest throughput", () => {
    expect(throughputGbps("packet_filter")).toBeGreaterThan(
      throughputGbps("waf")
    );
  });
});

describe("inspectionDepth", () => {
  it("ngfw deepest inspection", () => {
    expect(inspectionDepth("ngfw")).toBeGreaterThan(
      inspectionDepth("packet_filter")
    );
  });
});

describe("latencyMs", () => {
  it("packet filter lowest latency", () => {
    expect(latencyMs("waf")).toBeGreaterThan(
      latencyMs("packet_filter")
    );
  });
});

describe("configComplexity", () => {
  it("ngfw most complex config", () => {
    expect(configComplexity("ngfw")).toBeGreaterThan(
      configComplexity("packet_filter")
    );
  });
});

describe("costScore", () => {
  it("ngfw most expensive", () => {
    expect(costScore("ngfw")).toBeGreaterThan(
      costScore("packet_filter")
    );
  });
});

describe("applicationAware", () => {
  it("waf is application aware", () => {
    expect(applicationAware("waf")).toBe(true);
  });
  it("packet filter is not", () => {
    expect(applicationAware("packet_filter")).toBe(false);
  });
});

describe("requiresHardware", () => {
  it("stateful requires hardware", () => {
    expect(requiresHardware("stateful")).toBe(true);
  });
  it("cloud native does not", () => {
    expect(requiresHardware("cloud_native")).toBe(false);
  });
});

describe("bestProtection", () => {
  it("waf protects web applications", () => {
    expect(bestProtection("waf")).toBe("web_application");
  });
});

describe("deploymentModel", () => {
  it("cloud native is saas", () => {
    expect(deploymentModel("cloud_native")).toBe("saas");
  });
});

describe("firewallTypes", () => {
  it("returns 5 types", () => {
    expect(firewallTypes()).toHaveLength(5);
  });
});
