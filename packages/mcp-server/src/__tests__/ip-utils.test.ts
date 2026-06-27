import { describe, it, expect } from "vitest";
import { isIPv4, isIPv6, isPrivateIP, ipToNumber, numberToIp, isInSubnet, subnetRange, expandIPv6 } from "../ip-utils.js";

describe("ip-utils", () => {
  describe("isIPv4", () => {
    it("valid", () => { expect(isIPv4("192.168.1.1")).toBe(true); });
    it("invalid", () => { expect(isIPv4("256.1.1.1")).toBe(false); });
    it("too few parts", () => { expect(isIPv4("1.2.3")).toBe(false); });
    it("leading zeros", () => { expect(isIPv4("01.02.03.04")).toBe(false); });
  });
  describe("isIPv6", () => {
    it("valid full", () => { expect(isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true); });
    it("valid short", () => { expect(isIPv6("::1")).toBe(true); });
    it("invalid", () => { expect(isIPv6("not-an-ip")).toBe(false); });
  });
  describe("isPrivateIP", () => {
    it("10.x", () => { expect(isPrivateIP("10.0.0.1")).toBe(true); });
    it("172.16.x", () => { expect(isPrivateIP("172.16.0.1")).toBe(true); });
    it("192.168.x", () => { expect(isPrivateIP("192.168.1.1")).toBe(true); });
    it("127.x", () => { expect(isPrivateIP("127.0.0.1")).toBe(true); });
    it("public", () => { expect(isPrivateIP("8.8.8.8")).toBe(false); });
  });
  describe("ipToNumber / numberToIp", () => {
    it("round-trips", () => { expect(numberToIp(ipToNumber("192.168.1.1"))).toBe("192.168.1.1"); });
    it("converts correctly", () => { expect(ipToNumber("0.0.0.1")).toBe(1); });
  });
  describe("isInSubnet", () => {
    it("in subnet", () => { expect(isInSubnet("192.168.1.50", "192.168.1.0/24")).toBe(true); });
    it("not in subnet", () => { expect(isInSubnet("192.168.2.1", "192.168.1.0/24")).toBe(false); });
  });
  describe("subnetRange", () => {
    it("calculates range", () => {
      const r = subnetRange("192.168.1.0/24");
      expect(r.start).toBe("192.168.1.0");
      expect(r.end).toBe("192.168.1.255");
      expect(r.count).toBe(256);
    });
  });
  describe("expandIPv6", () => {
    it("expands ::1", () => {
      expect(expandIPv6("::1")).toBe("0000:0000:0000:0000:0000:0000:0000:0001");
    });
  });
});
