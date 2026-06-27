import { describe, it, expect } from "vitest";
import { NatTable } from "../nat-table.js";

describe("NatTable", () => {
  it("translates internal to external", () => {
    const nat = new NatTable("203.0.113.1");
    const entry = nat.translate("192.168.1.10", 8080);
    expect(entry.internalIp).toBe("192.168.1.10");
    expect(entry.internalPort).toBe(8080);
    expect(entry.externalIp).toBe("203.0.113.1");
    expect(entry.externalPort).toBe(10000);
    expect(entry.protocol).toBe("tcp");
  });

  it("reuses mapping for same internal endpoint", () => {
    const nat = new NatTable("203.0.113.1");
    const e1 = nat.translate("192.168.1.10", 8080);
    const e2 = nat.translate("192.168.1.10", 8080);
    expect(e1.externalPort).toBe(e2.externalPort);
  });

  it("assigns different ports for different internals", () => {
    const nat = new NatTable("203.0.113.1");
    const e1 = nat.translate("192.168.1.10", 8080);
    const e2 = nat.translate("192.168.1.10", 9090);
    expect(e1.externalPort).not.toBe(e2.externalPort);
  });

  it("reverse translates back to internal", () => {
    const nat = new NatTable("203.0.113.1");
    const entry = nat.translate("192.168.1.10", 8080);
    const result = nat.reverseTranslate("203.0.113.1", entry.externalPort);
    expect(result).not.toBeNull();
    expect(result!.internalIp).toBe("192.168.1.10");
    expect(result!.internalPort).toBe(8080);
  });

  it("reverse translate returns null for unknown", () => {
    const nat = new NatTable("203.0.113.1");
    expect(nat.reverseTranslate("203.0.113.1", 99999)).toBeNull();
  });

  it("remove deletes mapping", () => {
    const nat = new NatTable("203.0.113.1");
    const entry = nat.translate("192.168.1.10", 8080);
    expect(nat.remove("192.168.1.10", 8080)).toBe(true);
    expect(nat.reverseTranslate("203.0.113.1", entry.externalPort)).toBeNull();
    expect(nat.size).toBe(0);
  });

  it("remove returns false for missing", () => {
    const nat = new NatTable("203.0.113.1");
    expect(nat.remove("10.0.0.1", 1234)).toBe(false);
  });

  it("static mapping uses specified external port", () => {
    const nat = new NatTable("203.0.113.1");
    nat.addStaticMapping("192.168.1.10", 80, 80);
    const entry = nat.getEntry("192.168.1.10", 80);
    expect(entry).not.toBeNull();
    expect(entry!.externalPort).toBe(80);
    expect(entry!.ttl).toBe(Infinity);
  });

  it("static mapping is reverse-translatable", () => {
    const nat = new NatTable("203.0.113.1");
    nat.addStaticMapping("192.168.1.10", 443, 443);
    const result = nat.reverseTranslate("203.0.113.1", 443);
    expect(result).not.toBeNull();
    expect(result!.internalIp).toBe("192.168.1.10");
  });

  it("size tracks entries", () => {
    const nat = new NatTable("203.0.113.1");
    expect(nat.size).toBe(0);
    nat.translate("192.168.1.10", 8080);
    expect(nat.size).toBe(1);
    nat.translate("192.168.1.10", 9090);
    expect(nat.size).toBe(2);
  });

  it("list returns all entries", () => {
    const nat = new NatTable("203.0.113.1");
    nat.translate("192.168.1.10", 8080);
    nat.translate("192.168.1.11", 8080);
    const entries = nat.list();
    expect(entries).toHaveLength(2);
  });

  it("getEntry returns null for missing", () => {
    const nat = new NatTable("203.0.113.1");
    expect(nat.getEntry("10.0.0.1", 1234)).toBeNull();
  });

  it("clear removes all entries", () => {
    const nat = new NatTable("203.0.113.1");
    nat.translate("192.168.1.10", 8080);
    nat.translate("192.168.1.11", 9090);
    nat.clear();
    expect(nat.size).toBe(0);
  });

  it("byInternalIp filters entries", () => {
    const nat = new NatTable("203.0.113.1");
    nat.translate("192.168.1.10", 8080);
    nat.translate("192.168.1.10", 9090);
    nat.translate("192.168.1.11", 8080);
    expect(nat.byInternalIp("192.168.1.10")).toHaveLength(2);
    expect(nat.byInternalIp("192.168.1.11")).toHaveLength(1);
  });

  it("udp and tcp are separate mappings", () => {
    const nat = new NatTable("203.0.113.1");
    const tcp = nat.translate("192.168.1.10", 53, "tcp");
    const udp = nat.translate("192.168.1.10", 53, "udp");
    expect(tcp.externalPort).not.toBe(udp.externalPort);
    expect(nat.size).toBe(2);
  });

  it("custom start port", () => {
    const nat = new NatTable("203.0.113.1", 20000);
    const entry = nat.translate("192.168.1.10", 8080);
    expect(entry.externalPort).toBe(20000);
  });
});
