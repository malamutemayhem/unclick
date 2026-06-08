import { describe, it, expect } from "vitest";
import {
  isValidIPv4, isValidIPv6, isPrivateIPv4,
  ipv4ToNumber, numberToIPv4, isInSubnet,
  expandIPv6, compressIPv6
} from "../ip-utils.js";

describe("ip-utils", () => {
  it("isValidIPv4", () => {
    expect(isValidIPv4("192.168.1.1")).toBe(true);
    expect(isValidIPv4("0.0.0.0")).toBe(true);
    expect(isValidIPv4("255.255.255.255")).toBe(true);
    expect(isValidIPv4("256.0.0.0")).toBe(false);
    expect(isValidIPv4("1.2.3")).toBe(false);
    expect(isValidIPv4("01.02.03.04")).toBe(false);
  });

  it("isValidIPv6", () => {
    expect(isValidIPv6("::1")).toBe(true);
    expect(isValidIPv6("2001:db8::1")).toBe(true);
    expect(isValidIPv6("fe80:0000:0000:0000:0000:0000:0000:0001")).toBe(true);
    expect(isValidIPv6(":::1")).toBe(false);
  });

  it("isPrivateIPv4", () => {
    expect(isPrivateIPv4("10.0.0.1")).toBe(true);
    expect(isPrivateIPv4("172.16.0.1")).toBe(true);
    expect(isPrivateIPv4("192.168.0.1")).toBe(true);
    expect(isPrivateIPv4("127.0.0.1")).toBe(true);
    expect(isPrivateIPv4("8.8.8.8")).toBe(false);
  });

  it("ipv4ToNumber and numberToIPv4 round-trip", () => {
    const ip = "192.168.1.100";
    expect(numberToIPv4(ipv4ToNumber(ip))).toBe(ip);
  });

  it("isInSubnet", () => {
    expect(isInSubnet("192.168.1.100", "192.168.1.0/24")).toBe(true);
    expect(isInSubnet("192.168.2.1", "192.168.1.0/24")).toBe(false);
    expect(isInSubnet("10.0.5.1", "10.0.0.0/8")).toBe(true);
  });

  it("expandIPv6", () => {
    expect(expandIPv6("::1")).toBe("0000:0000:0000:0000:0000:0000:0000:0001");
    expect(expandIPv6("2001:db8::1")).toBe("2001:0db8:0000:0000:0000:0000:0000:0001");
  });

  it("compressIPv6", () => {
    expect(compressIPv6("2001:0db8:0000:0000:0000:0000:0000:0001")).toBe("2001:db8::1");
  });
});
