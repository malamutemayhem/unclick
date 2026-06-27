import { describe, it, expect } from "vitest";
import { ArpTable } from "../arp-table.js";

describe("ArpTable", () => {
  it("adds and looks up entries", () => {
    const arp = new ArpTable();
    arp.add("192.168.1.1", "AA:BB:CC:DD:EE:FF");
    expect(arp.lookup("192.168.1.1")).toBe("aa:bb:cc:dd:ee:ff");
  });

  it("returns null for missing", () => {
    const arp = new ArpTable();
    expect(arp.lookup("10.0.0.1")).toBeNull();
  });

  it("removes entries", () => {
    const arp = new ArpTable();
    arp.add("192.168.1.1", "AA:BB:CC:DD:EE:FF");
    expect(arp.remove("192.168.1.1")).toBe(true);
    expect(arp.lookup("192.168.1.1")).toBeNull();
  });

  it("has checks presence", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "11:22:33:44:55:66");
    expect(arp.has("10.0.0.1")).toBe(true);
    expect(arp.has("10.0.0.2")).toBe(false);
  });

  it("resolve returns full entry", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "11:22:33:44:55:66", "static");
    const entry = arp.resolve("10.0.0.1");
    expect(entry).not.toBeNull();
    expect(entry!.type).toBe("static");
    expect(entry!.ip).toBe("10.0.0.1");
  });

  it("clear removes all entries", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "AA:BB:CC:DD:EE:FF");
    arp.add("10.0.0.2", "11:22:33:44:55:66");
    arp.clear();
    expect(arp.size).toBe(0);
  });

  it("clear by type", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "AA:BB:CC:DD:EE:FF", "dynamic");
    arp.add("10.0.0.2", "11:22:33:44:55:66", "static");
    arp.clear("dynamic");
    expect(arp.size).toBe(1);
    expect(arp.has("10.0.0.2")).toBe(true);
  });

  it("list returns all entries", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "AA:BB:CC:DD:EE:FF");
    arp.add("10.0.0.2", "11:22:33:44:55:66");
    expect(arp.list()).toHaveLength(2);
  });

  it("reverseLookup finds by MAC", () => {
    const arp = new ArpTable();
    arp.add("10.0.0.1", "AA:BB:CC:DD:EE:FF");
    arp.add("10.0.0.2", "AA:BB:CC:DD:EE:FF");
    const ips = arp.reverseLookup("AA:BB:CC:DD:EE:FF");
    expect(ips).toContain("10.0.0.1");
    expect(ips).toContain("10.0.0.2");
  });

  it("getSubnet filters by prefix", () => {
    const arp = new ArpTable();
    arp.add("192.168.1.1", "AA:BB:CC:DD:EE:01");
    arp.add("192.168.1.2", "AA:BB:CC:DD:EE:02");
    arp.add("10.0.0.1", "11:22:33:44:55:66");
    const sub = arp.getSubnet("192.168.1");
    expect(sub).toHaveLength(2);
  });

  it("size tracks count", () => {
    const arp = new ArpTable();
    expect(arp.size).toBe(0);
    arp.add("10.0.0.1", "AA:BB:CC:DD:EE:FF");
    expect(arp.size).toBe(1);
  });
});
