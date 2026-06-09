import { describe, it, expect } from "vitest";
import { parseIPv4, formatIPv4, isPrivateIP, isLoopback, ipToInt, intToIP, cidrContains, cidrRange, subnetMask, PacketBuilder, RoutingTable } from "../ip-packet.js";

describe("IPv4 utilities", () => {
  it("parses valid IP", () => {
    expect(parseIPv4("192.168.1.1")).toEqual([192, 168, 1, 1]);
  });

  it("throws on invalid IP", () => {
    expect(() => parseIPv4("999.0.0.1")).toThrow();
    expect(() => parseIPv4("abc")).toThrow();
  });

  it("formats IP from octets", () => {
    expect(formatIPv4([10, 0, 0, 1])).toBe("10.0.0.1");
  });

  it("identifies private IPs", () => {
    expect(isPrivateIP("10.0.0.1")).toBe(true);
    expect(isPrivateIP("172.16.0.1")).toBe(true);
    expect(isPrivateIP("192.168.0.1")).toBe(true);
    expect(isPrivateIP("8.8.8.8")).toBe(false);
  });

  it("identifies loopback", () => {
    expect(isLoopback("127.0.0.1")).toBe(true);
    expect(isLoopback("127.255.255.255")).toBe(true);
    expect(isLoopback("10.0.0.1")).toBe(false);
  });

  it("converts IP to int and back", () => {
    const ip = "192.168.1.100";
    expect(intToIP(ipToInt(ip))).toBe(ip);
  });

  it("ipToInt produces correct value", () => {
    expect(ipToInt("0.0.0.1")).toBe(1);
    expect(ipToInt("0.0.1.0")).toBe(256);
  });
});

describe("CIDR", () => {
  it("cidrContains checks membership", () => {
    expect(cidrContains("192.168.1.0/24", "192.168.1.100")).toBe(true);
    expect(cidrContains("192.168.1.0/24", "192.168.2.1")).toBe(false);
  });

  it("cidrRange computes start/end/count", () => {
    const range = cidrRange("10.0.0.0/24");
    expect(range.start).toBe("10.0.0.0");
    expect(range.end).toBe("10.0.0.255");
    expect(range.count).toBe(256);
  });

  it("subnetMask generates correct mask", () => {
    expect(subnetMask(24)).toBe("255.255.255.0");
    expect(subnetMask(16)).toBe("255.255.0.0");
    expect(subnetMask(8)).toBe("255.0.0.0");
  });
});

describe("PacketBuilder", () => {
  it("builds packet header", () => {
    const header = new PacketBuilder()
      .setSrc("192.168.1.1")
      .setDst("10.0.0.1")
      .setTTL(128)
      .setProtocol(6)
      .setPayload([1, 2, 3])
      .build();
    expect(header.version).toBe(4);
    expect(header.srcIP).toBe("192.168.1.1");
    expect(header.dstIP).toBe("10.0.0.1");
    expect(header.ttl).toBe(128);
    expect(header.totalLength).toBe(23);
    expect(header.checksum).toBeGreaterThan(0);
  });
});

describe("RoutingTable", () => {
  it("looks up routes with longest prefix match", () => {
    const rt = new RoutingTable();
    rt.addRoute("0.0.0.0/0", "10.0.0.1", "eth0");
    rt.addRoute("192.168.1.0/24", "192.168.1.1", "eth1");
    rt.addRoute("192.168.1.128/25", "192.168.1.129", "eth2");

    const r1 = rt.lookup("192.168.1.200");
    expect(r1!.iface).toBe("eth2");

    const r2 = rt.lookup("192.168.1.50");
    expect(r2!.iface).toBe("eth1");

    const r3 = rt.lookup("8.8.8.8");
    expect(r3!.iface).toBe("eth0");
  });

  it("returns null for no match with no default", () => {
    const rt = new RoutingTable();
    rt.addRoute("192.168.1.0/24", "gw", "eth0");
    expect(rt.lookup("10.0.0.1")).toBeNull();
  });

  it("tracks route count", () => {
    const rt = new RoutingTable();
    rt.addRoute("10.0.0.0/8", "gw", "eth0");
    rt.addRoute("172.16.0.0/12", "gw", "eth1");
    expect(rt.routeCount).toBe(2);
  });
});
