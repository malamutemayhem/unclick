import { describe, it, expect } from "vitest";
import { isValidIPv4, isValidIPv6, ipToNumber, numberToIp, isInCIDR, isPrivate } from "../ip-utils.js";

describe("ip-utils", () => {
  it("validates IPv4", () => {
    expect(isValidIPv4("192.168.1.1")).toBe(true);
    expect(isValidIPv4("0.0.0.0")).toBe(true);
    expect(isValidIPv4("255.255.255.255")).toBe(true);
    expect(isValidIPv4("256.1.1.1")).toBe(false);
    expect(isValidIPv4("1.2.3")).toBe(false);
    expect(isValidIPv4("abc")).toBe(false);
  });

  it("validates IPv6", () => {
    expect(isValidIPv6("::1")).toBe(true);
    expect(isValidIPv6("2001:db8::1")).toBe(true);
    expect(isValidIPv6("2001:0db8:0000:0000:0000:0000:0000:0001")).toBe(true);
    expect(isValidIPv6("xyz")).toBe(false);
  });

  it("ipToNumber and numberToIp roundtrip", () => {
    expect(numberToIp(ipToNumber("192.168.1.1"))).toBe("192.168.1.1");
    expect(numberToIp(ipToNumber("10.0.0.1"))).toBe("10.0.0.1");
    expect(numberToIp(ipToNumber("0.0.0.0"))).toBe("0.0.0.0");
  });

  it("isInCIDR", () => {
    expect(isInCIDR("192.168.1.100", "192.168.1.0/24")).toBe(true);
    expect(isInCIDR("192.168.2.1", "192.168.1.0/24")).toBe(false);
    expect(isInCIDR("10.1.2.3", "10.0.0.0/8")).toBe(true);
  });

  it("isPrivate", () => {
    expect(isPrivate("192.168.1.1")).toBe(true);
    expect(isPrivate("10.0.0.1")).toBe(true);
    expect(isPrivate("172.16.0.1")).toBe(true);
    expect(isPrivate("127.0.0.1")).toBe(true);
    expect(isPrivate("8.8.8.8")).toBe(false);
  });
});
