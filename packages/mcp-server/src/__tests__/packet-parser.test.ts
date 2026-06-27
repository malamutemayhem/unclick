import { describe, it, expect } from "vitest";
import {
  PacketBuilder,
  parseEtherType,
  parseProtocol,
  formatMac,
  isValidMac,
  isValidIpv4,
  ipToInt,
  intToIp,
} from "../packet-parser.js";

describe("PacketBuilder", () => {
  it("builds a packet with defaults", () => {
    const pkt = new PacketBuilder().build();
    expect(pkt.srcMac).toBe("00:00:00:00:00:00");
    expect(pkt.dstMac).toBe("ff:ff:ff:ff:ff:ff");
    expect(pkt.etherType).toBe(0x0800);
    expect(pkt.protocol).toBe(6);
    expect(pkt.ttl).toBe(64);
  });

  it("builds with custom values", () => {
    const pkt = new PacketBuilder()
      .setSrcMac("aa:bb:cc:dd:ee:ff")
      .setDstMac("11:22:33:44:55:66")
      .setSrcIp("192.168.1.1")
      .setDstIp("10.0.0.1")
      .setSrcPort(80)
      .setDstPort(12345)
      .setTTL(128)
      .setProtocol(17)
      .setFlags(["SYN"])
      .build();

    expect(pkt.srcIp).toBe("192.168.1.1");
    expect(pkt.dstIp).toBe("10.0.0.1");
    expect(pkt.srcPort).toBe(80);
    expect(pkt.dstPort).toBe(12345);
    expect(pkt.ttl).toBe(128);
    expect(pkt.flags).toEqual(["SYN"]);
  });

  it("includes payload length", () => {
    const pkt = new PacketBuilder().setPayload([1, 2, 3, 4, 5]).build();
    expect(pkt.payloadLength).toBe(5);
  });

  it("generates raw bytes", () => {
    const pkt = new PacketBuilder().build();
    expect(pkt.raw.length).toBeGreaterThan(0);
  });
});

describe("parseEtherType", () => {
  it("identifies IPv4", () => expect(parseEtherType(0x0800)).toBe("IPv4"));
  it("identifies ARP", () => expect(parseEtherType(0x0806)).toBe("ARP"));
  it("identifies IPv6", () => expect(parseEtherType(0x86dd)).toBe("IPv6"));
  it("handles unknown", () => expect(parseEtherType(0x9999)).toMatch(/Unknown/));
});

describe("parseProtocol", () => {
  it("identifies TCP", () => expect(parseProtocol(6)).toBe("TCP"));
  it("identifies UDP", () => expect(parseProtocol(17)).toBe("UDP"));
  it("identifies ICMP", () => expect(parseProtocol(1)).toBe("ICMP"));
  it("handles unknown", () => expect(parseProtocol(255)).toMatch(/Unknown/));
});

describe("formatMac", () => {
  it("formats with colons", () => {
    expect(formatMac("AABBCCDDEEFF")).toBe("aa:bb:cc:dd:ee:ff");
  });
});

describe("isValidMac", () => {
  it("accepts valid MAC", () => expect(isValidMac("aa:bb:cc:dd:ee:ff")).toBe(true));
  it("rejects short MAC", () => expect(isValidMac("aa:bb:cc")).toBe(false));
  it("rejects bad chars", () => expect(isValidMac("gg:hh:ii:jj:kk:ll")).toBe(false));
});

describe("isValidIpv4", () => {
  it("accepts valid IP", () => expect(isValidIpv4("192.168.1.1")).toBe(true));
  it("rejects out of range", () => expect(isValidIpv4("256.0.0.1")).toBe(false));
  it("rejects incomplete", () => expect(isValidIpv4("10.0.0")).toBe(false));
});

describe("ipToInt / intToIp", () => {
  it("round-trips", () => {
    expect(intToIp(ipToInt("192.168.1.1"))).toBe("192.168.1.1");
  });

  it("handles 0.0.0.0", () => {
    expect(ipToInt("0.0.0.0")).toBe(0);
    expect(intToIp(0)).toBe("0.0.0.0");
  });

  it("handles 255.255.255.255", () => {
    expect(ipToInt("255.255.255.255")).toBe(4294967295);
    expect(intToIp(4294967295)).toBe("255.255.255.255");
  });
});
