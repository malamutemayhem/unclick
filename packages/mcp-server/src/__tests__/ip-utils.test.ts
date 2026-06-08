import { describe, it, expect } from "vitest";
import { isValidIPv4, isValidIPv6, ipv4ToLong, longToIPv4, isPrivateIPv4, ipInCIDR, expandCIDR } from "../ip-utils.js";

describe("IPv4 validation", () => {
  it("valid IPs", () => {
    expect(isValidIPv4("192.168.1.1")).toBe(true);
    expect(isValidIPv4("0.0.0.0")).toBe(true);
    expect(isValidIPv4("255.255.255.255")).toBe(true);
  });

  it("invalid IPs", () => {
    expect(isValidIPv4("256.1.1.1")).toBe(false);
    expect(isValidIPv4("1.1.1")).toBe(false);
    expect(isValidIPv4("01.1.1.1")).toBe(false);
    expect(isValidIPv4("abc")).toBe(false);
  });
});

describe("IPv6 validation", () => {
  it("valid IPv6", () => {
    expect(isValidIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(isValidIPv6("::1")).toBe(true);
  });

  it("invalid IPv6", () => {
    expect(isValidIPv6("not-an-ip")).toBe(false);
  });
});

describe("ipv4ToLong/longToIPv4", () => {
  it("roundtrips", () => {
    expect(longToIPv4(ipv4ToLong("192.168.1.1"))).toBe("192.168.1.1");
    expect(longToIPv4(ipv4ToLong("10.0.0.1"))).toBe("10.0.0.1");
  });

  it("specific values", () => {
    expect(ipv4ToLong("0.0.0.0")).toBe(0);
    expect(ipv4ToLong("0.0.0.1")).toBe(1);
  });
});

describe("isPrivateIPv4", () => {
  it("detects private ranges", () => {
    expect(isPrivateIPv4("10.0.0.1")).toBe(true);
    expect(isPrivateIPv4("172.16.0.1")).toBe(true);
    expect(isPrivateIPv4("192.168.1.1")).toBe(true);
    expect(isPrivateIPv4("8.8.8.8")).toBe(false);
  });
});

describe("CIDR", () => {
  it("ipInCIDR", () => {
    expect(ipInCIDR("192.168.1.50", "192.168.1.0/24")).toBe(true);
    expect(ipInCIDR("192.168.2.1", "192.168.1.0/24")).toBe(false);
  });

  it("expandCIDR", () => {
    const r = expandCIDR("192.168.1.0/24");
    expect(r.first).toBe("192.168.1.0");
    expect(r.last).toBe("192.168.1.255");
    expect(r.count).toBe(256);
  });
});
