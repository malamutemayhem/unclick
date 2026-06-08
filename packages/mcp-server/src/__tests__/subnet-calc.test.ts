import { describe, it, expect } from "vitest";
import { SubnetCalc } from "../subnet-calc.js";

describe("SubnetCalc", () => {
  it("converts IP to long", () => {
    expect(SubnetCalc.ipToLong("192.168.1.1")).toBe(3232235777);
    expect(SubnetCalc.ipToLong("0.0.0.0")).toBe(0);
  });

  it("converts long to IP", () => {
    expect(SubnetCalc.longToIp(3232235777)).toBe("192.168.1.1");
  });

  it("converts CIDR to mask", () => {
    expect(SubnetCalc.cidrToMask(24)).toBe("255.255.255.0");
    expect(SubnetCalc.cidrToMask(16)).toBe("255.255.0.0");
  });

  it("converts mask to prefix", () => {
    expect(SubnetCalc.maskToPrefix("255.255.255.0")).toBe(24);
    expect(SubnetCalc.maskToPrefix("255.255.0.0")).toBe(16);
  });

  it("calculates network address", () => {
    expect(SubnetCalc.networkAddress("192.168.1.100", 24)).toBe("192.168.1.0");
  });

  it("calculates broadcast address", () => {
    expect(SubnetCalc.broadcastAddress("192.168.1.100", 24)).toBe("192.168.1.255");
  });

  it("counts hosts", () => {
    expect(SubnetCalc.hostCount(24)).toBe(254);
    expect(SubnetCalc.hostCount(32)).toBe(1);
  });

  it("checks if IP is in CIDR", () => {
    expect(SubnetCalc.contains("192.168.1.0/24", "192.168.1.50")).toBe(true);
    expect(SubnetCalc.contains("192.168.1.0/24", "192.168.2.1")).toBe(false);
  });

  it("detects private IPs", () => {
    expect(SubnetCalc.isPrivate("192.168.1.1")).toBe(true);
    expect(SubnetCalc.isPrivate("10.0.0.1")).toBe(true);
    expect(SubnetCalc.isPrivate("8.8.8.8")).toBe(false);
  });

  it("validates IPs", () => {
    expect(SubnetCalc.isValidIp("192.168.1.1")).toBe(true);
    expect(SubnetCalc.isValidIp("256.1.1.1")).toBe(false);
    expect(SubnetCalc.isValidIp("abc")).toBe(false);
  });

  it("calculates first and last host", () => {
    expect(SubnetCalc.firstHost("192.168.1.0", 24)).toBe("192.168.1.1");
    expect(SubnetCalc.lastHost("192.168.1.0", 24)).toBe("192.168.1.254");
  });

  it("returns full subnet info", () => {
    const info = SubnetCalc.info("192.168.1.100/24");
    expect(info.network).toBe("192.168.1.0");
    expect(info.broadcast).toBe("192.168.1.255");
    expect(info.hosts).toBe(254);
  });
});
