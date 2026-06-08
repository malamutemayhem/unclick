import { describe, it, expect } from "vitest";
import {
  isValidIPv4, isValidIPv6, isPrivateIPv4,
  ipv4ToNumber, numberToIPv4, isInSubnet,
} from "../ip-utils.js";

describe("ip-utils", () => {
  it("validates IPv4 addresses", () => {
    expect(isValidIPv4("192.168.1.1")).toBe(true);
    expect(isValidIPv4("0.0.0.0")).toBe(true);
    expect(isValidIPv4("255.255.255.255")).toBe(true);
    expect(isValidIPv4("256.1.1.1")).toBe(false);
    expect(isValidIPv4("1.2.3")).toBe(false);
    expect(isValidIPv4("1.2.3.4.5")).toBe(false);
    expect(isValidIPv4("01.02.03.04")).toBe(false);
  });

  it("validates IPv6 addresses", () => {
    expect(isValidIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
    expect(isValidIPv6("::1")).toBe(true);
    expect(isValidIPv6("fe80::1")).toBe(true);
    expect(isValidIPv6("not-an-ip")).toBe(false);
    expect(isValidIPv6(":::1")).toBe(false);
  });

  it("detects private IPv4 ranges", () => {
    expect(isPrivateIPv4("10.0.0.1")).toBe(true);
    expect(isPrivateIPv4("172.16.0.1")).toBe(true);
    expect(isPrivateIPv4("172.31.255.255")).toBe(true);
    expect(isPrivateIPv4("192.168.1.1")).toBe(true);
    expect(isPrivateIPv4("127.0.0.1")).toBe(true);
    expect(isPrivateIPv4("8.8.8.8")).toBe(false);
    expect(isPrivateIPv4("172.32.0.1")).toBe(false);
  });

  it("converts IPv4 to number and back", () => {
    expect(ipv4ToNumber("192.168.1.1")).toBe(3232235777);
    expect(numberToIPv4(3232235777)).toBe("192.168.1.1");
    expect(numberToIPv4(ipv4ToNumber("10.0.0.1"))).toBe("10.0.0.1");
  });

  it("checks subnet membership", () => {
    expect(isInSubnet("192.168.1.100", "192.168.1.0/24")).toBe(true);
    expect(isInSubnet("192.168.2.1", "192.168.1.0/24")).toBe(false);
    expect(isInSubnet("10.0.0.5", "10.0.0.0/8")).toBe(true);
  });
});
