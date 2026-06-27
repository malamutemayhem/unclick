import { describe, it, expect } from "vitest";
import { DHCPServer } from "../dhcp-server.js";

describe("DHCPServer", () => {
  const config = {
    subnet: "192.168.1",
    rangeStart: 100,
    rangeEnd: 110,
    leaseDuration: 3600,
    gateway: "192.168.1.1",
    dns: ["8.8.8.8"],
  };

  it("assigns IP from pool", () => {
    const dhcp = new DHCPServer(config);
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01");
    expect(ip).toBe("192.168.1.100");
  });

  it("assigns unique IPs to different MACs", () => {
    const dhcp = new DHCPServer(config);
    const ip1 = dhcp.discover("AA:BB:CC:DD:EE:01");
    const ip2 = dhcp.discover("AA:BB:CC:DD:EE:02");
    expect(ip1).not.toBe(ip2);
  });

  it("returns same IP for same MAC", () => {
    const dhcp = new DHCPServer(config);
    const ip1 = dhcp.discover("AA:BB:CC:DD:EE:01");
    const ip2 = dhcp.discover("AA:BB:CC:DD:EE:01");
    expect(ip1).toBe(ip2);
  });

  it("release frees IP", () => {
    const dhcp = new DHCPServer(config);
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01")!;
    expect(dhcp.release(ip)).toBe(true);
    expect(dhcp.activeLeases).toBe(0);
  });

  it("renew extends lease", () => {
    const dhcp = new DHCPServer(config);
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01")!;
    expect(dhcp.renew(ip)).toBe(true);
  });

  it("renew fails on released lease", () => {
    const dhcp = new DHCPServer(config);
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01")!;
    dhcp.release(ip);
    expect(dhcp.renew(ip)).toBe(false);
  });

  it("reservations honored", () => {
    const dhcp = new DHCPServer(config);
    dhcp.reserve("AA:BB:CC:DD:EE:01", "192.168.1.105");
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01");
    expect(ip).toBe("192.168.1.105");
  });

  it("getLease returns lease info", () => {
    const dhcp = new DHCPServer(config);
    dhcp.discover("AA:BB:CC:DD:EE:01", "workstation");
    const lease = dhcp.getLease("192.168.1.100");
    expect(lease).not.toBeNull();
    expect(lease!.mac).toBe("AA:BB:CC:DD:EE:01");
    expect(lease!.hostname).toBe("workstation");
  });

  it("getLeaseByMac works", () => {
    const dhcp = new DHCPServer(config);
    dhcp.discover("AA:BB:CC:DD:EE:01");
    const lease = dhcp.getLeaseByMac("AA:BB:CC:DD:EE:01");
    expect(lease).not.toBeNull();
  });

  it("availableIPs tracks pool", () => {
    const dhcp = new DHCPServer(config);
    const initial = dhcp.availableIPs;
    dhcp.discover("AA:BB:CC:DD:EE:01");
    expect(dhcp.availableIPs).toBe(initial - 1);
  });

  it("pool exhaustion returns null", () => {
    const small = { ...config, rangeStart: 100, rangeEnd: 101 };
    const dhcp = new DHCPServer(small);
    dhcp.discover("AA:BB:CC:DD:EE:01");
    dhcp.discover("AA:BB:CC:DD:EE:02");
    expect(dhcp.discover("AA:BB:CC:DD:EE:03")).toBeNull();
  });

  it("listLeases returns all", () => {
    const dhcp = new DHCPServer(config);
    dhcp.discover("AA:BB:CC:DD:EE:01");
    dhcp.discover("AA:BB:CC:DD:EE:02");
    expect(dhcp.listLeases()).toHaveLength(2);
  });

  it("removeReservation clears it", () => {
    const dhcp = new DHCPServer(config);
    dhcp.reserve("AA:BB:CC:DD:EE:01", "192.168.1.105");
    dhcp.removeReservation("AA:BB:CC:DD:EE:01");
    const ip = dhcp.discover("AA:BB:CC:DD:EE:01");
    expect(ip).toBe("192.168.1.100");
  });
});
