import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, managementComplexity, deploymentCost,
  scalability, trafficEngineering, legacyTechnology, transportLayer,
  typicalDeployment, telecomProtocols,
} from "../telecom-protocol-calc.js";

describe("bandwidth", () => {
  it("dwdm highest bandwidth", () => {
    expect(bandwidth("dwdm")).toBeGreaterThan(bandwidth("sonet"));
  });
});

describe("latency", () => {
  it("mpls highest latency", () => {
    expect(latency("mpls")).toBeGreaterThan(latency("dwdm"));
  });
});

describe("managementComplexity", () => {
  it("dwdm most complex", () => {
    expect(managementComplexity("dwdm")).toBeGreaterThan(managementComplexity("ethernet_carrier"));
  });
});

describe("deploymentCost", () => {
  it("dwdm most expensive", () => {
    expect(deploymentCost("dwdm")).toBeGreaterThan(deploymentCost("ethernet_carrier"));
  });
});

describe("scalability", () => {
  it("dwdm most scalable", () => {
    expect(scalability("dwdm")).toBeGreaterThan(scalability("sonet"));
  });
});

describe("trafficEngineering", () => {
  it("mpls has traffic engineering", () => {
    expect(trafficEngineering("mpls")).toBe(true);
  });
  it("sonet does not", () => {
    expect(trafficEngineering("sonet")).toBe(false);
  });
});

describe("legacyTechnology", () => {
  it("sonet is legacy", () => {
    expect(legacyTechnology("sonet")).toBe(true);
  });
  it("dwdm is not", () => {
    expect(legacyTechnology("dwdm")).toBe(false);
  });
});

describe("transportLayer", () => {
  it("dwdm is wavelength division optical", () => {
    expect(transportLayer("dwdm")).toBe("wavelength_division_optical");
  });
});

describe("typicalDeployment", () => {
  it("mpls for service provider vpn", () => {
    expect(typicalDeployment("mpls")).toBe("service_provider_vpn");
  });
});

describe("telecomProtocols", () => {
  it("returns 5 protocols", () => {
    expect(telecomProtocols()).toHaveLength(5);
  });
});
