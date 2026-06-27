import { describe, it, expect } from "vitest";
import { IPv4Address, SubnetCalculator } from "../ip-subnet.js";

describe("IPv4Address", () => {
  it("parses valid address", () => {
    const ip = new IPv4Address("192.168.1.1");
    expect(ip.toString()).toBe("192.168.1.1");
  });

  it("converts to and from integer", () => {
    const ip = new IPv4Address("10.0.0.1");
    const num = ip.toInt();
    const back = IPv4Address.fromInt(num);
    expect(back.toString()).toBe("10.0.0.1");
  });

  it("detects private addresses", () => {
    expect(new IPv4Address("10.0.0.1").isPrivate()).toBe(true);
    expect(new IPv4Address("172.16.0.1").isPrivate()).toBe(true);
    expect(new IPv4Address("192.168.0.1").isPrivate()).toBe(true);
    expect(new IPv4Address("8.8.8.8").isPrivate()).toBe(false);
  });

  it("detects loopback", () => {
    expect(new IPv4Address("127.0.0.1").isLoopback()).toBe(true);
    expect(new IPv4Address("192.168.1.1").isLoopback()).toBe(false);
  });

  it("compares equality", () => {
    const a = new IPv4Address("10.0.0.1");
    const b = new IPv4Address("10.0.0.1");
    const c = new IPv4Address("10.0.0.2");
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it("throws on invalid address", () => {
    expect(() => new IPv4Address("999.0.0.0")).toThrow();
    expect(() => new IPv4Address("abc")).toThrow();
  });
});

describe("SubnetCalculator", () => {
  it("calculates /24 network", () => {
    const sub = new SubnetCalculator("192.168.1.0/24");
    expect(sub.networkAddress()).toBe("192.168.1.0");
    expect(sub.broadcastAddress()).toBe("192.168.1.255");
    expect(sub.subnetMask()).toBe("255.255.255.0");
    expect(sub.hostCount()).toBe(254);
  });

  it("calculates /16 network", () => {
    const sub = new SubnetCalculator("10.0.0.0/16");
    expect(sub.hostCount()).toBe(65534);
    expect(sub.firstHost()).toBe("10.0.0.1");
    expect(sub.lastHost()).toBe("10.0.255.254");
  });

  it("checks address containment", () => {
    const sub = new SubnetCalculator("192.168.1.0/24");
    expect(sub.contains("192.168.1.100")).toBe(true);
    expect(sub.contains("192.168.2.1")).toBe(false);
  });

  it("returns CIDR notation", () => {
    const sub = new SubnetCalculator("10.0.5.100/8");
    expect(sub.toCIDR()).toBe("10.0.0.0/8");
  });

  it("detects overlapping subnets", () => {
    expect(SubnetCalculator.overlaps("10.0.0.0/24", "10.0.0.0/16")).toBe(true);
    expect(SubnetCalculator.overlaps("10.0.0.0/24", "10.1.0.0/24")).toBe(false);
  });

  it("handles /32 single host", () => {
    const sub = new SubnetCalculator("10.0.0.1/32");
    expect(sub.hostCount()).toBe(1);
    expect(sub.totalAddresses()).toBe(1);
  });
});
