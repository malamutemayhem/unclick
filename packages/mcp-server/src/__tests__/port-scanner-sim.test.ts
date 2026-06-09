import { describe, it, expect } from "vitest";
import { PortScannerSim } from "../port-scanner-sim.js";

describe("PortScannerSim", () => {
  it("scanPort returns filtered for unknown host", () => {
    const scanner = new PortScannerSim();
    const result = scanner.scanPort("10.0.0.1", 80);
    expect(result.state).toBe("filtered");
  });

  it("scanPort returns closed for unset port", () => {
    const scanner = new PortScannerSim();
    scanner.addHost("10.0.0.1");
    const result = scanner.scanPort("10.0.0.1", 12345);
    expect(result.state).toBe("closed");
  });

  it("scanPort detects open port", () => {
    const scanner = new PortScannerSim();
    scanner.setPort("10.0.0.1", 80, "open");
    const result = scanner.scanPort("10.0.0.1", 80);
    expect(result.state).toBe("open");
    expect(result.service).toBe("http");
  });

  it("setOpenPorts sets multiple ports", () => {
    const scanner = new PortScannerSim();
    scanner.setOpenPorts("10.0.0.1", [22, 80, 443]);
    expect(scanner.scanPort("10.0.0.1", 22).state).toBe("open");
    expect(scanner.scanPort("10.0.0.1", 80).state).toBe("open");
    expect(scanner.scanPort("10.0.0.1", 443).state).toBe("open");
  });

  it("scanRange scans port range", () => {
    const scanner = new PortScannerSim();
    scanner.setOpenPorts("10.0.0.1", [80, 81]);
    const result = scanner.scanRange("10.0.0.1", 79, 82);
    expect(result.ports).toHaveLength(4);
    expect(result.openCount).toBe(2);
    expect(result.closedCount).toBe(2);
  });

  it("scanCommon scans well-known ports", () => {
    const scanner = new PortScannerSim();
    scanner.setOpenPorts("10.0.0.1", [22, 443]);
    const result = scanner.scanCommon("10.0.0.1");
    expect(result.openCount).toBe(2);
    expect(result.ports.length).toBeGreaterThan(5);
  });

  it("getOpenPorts returns sorted open ports", () => {
    const scanner = new PortScannerSim();
    scanner.setOpenPorts("10.0.0.1", [443, 80, 22]);
    const open = scanner.getOpenPorts("10.0.0.1");
    expect(open).toHaveLength(3);
    expect(open[0].port).toBe(22);
    expect(open[1].port).toBe(80);
    expect(open[2].port).toBe(443);
  });

  it("getOpenPorts returns empty for unknown host", () => {
    const scanner = new PortScannerSim();
    expect(scanner.getOpenPorts("10.0.0.1")).toHaveLength(0);
  });

  it("banner included in results", () => {
    const scanner = new PortScannerSim();
    scanner.setPort("10.0.0.1", 22, "open", "OpenSSH_8.9");
    const result = scanner.scanPort("10.0.0.1", 22);
    expect(result.banner).toBe("OpenSSH_8.9");
  });

  it("hostCount tracks hosts", () => {
    const scanner = new PortScannerSim();
    scanner.addHost("10.0.0.1");
    scanner.addHost("10.0.0.2");
    expect(scanner.hostCount).toBe(2);
  });

  it("listHosts returns all hosts", () => {
    const scanner = new PortScannerSim();
    scanner.addHost("10.0.0.1");
    scanner.addHost("10.0.0.2");
    expect(scanner.listHosts()).toHaveLength(2);
  });

  it("getServiceName returns known services", () => {
    const scanner = new PortScannerSim();
    expect(scanner.getServiceName(22)).toBe("ssh");
    expect(scanner.getServiceName(443)).toBe("https");
    expect(scanner.getServiceName(99999)).toBeUndefined();
  });

  it("format produces readable output", () => {
    const scanner = new PortScannerSim();
    scanner.setOpenPorts("10.0.0.1", [22, 80]);
    const result = scanner.scanCommon("10.0.0.1");
    const output = scanner.format(result);
    expect(output).toContain("10.0.0.1");
    expect(output).toContain("open");
    expect(output).toContain("ssh");
  });

  it("filtered port detection", () => {
    const scanner = new PortScannerSim();
    scanner.setPort("10.0.0.1", 80, "filtered");
    expect(scanner.scanPort("10.0.0.1", 80).state).toBe("filtered");
  });
});
