import { describe, it, expect } from "vitest";
import { AccessLogAnalyzer } from "../access-log-analyzer.js";

describe("AccessLogAnalyzer", () => {
  function addSampleEntries(analyzer: AccessLogAnalyzer) {
    analyzer.add({ ip: "10.0.0.1", method: "GET", path: "/api/users", status: 200, bytes: 500, timestamp: 1000 });
    analyzer.add({ ip: "10.0.0.1", method: "GET", path: "/api/users", status: 200, bytes: 500, timestamp: 1001 });
    analyzer.add({ ip: "10.0.0.2", method: "POST", path: "/api/users", status: 201, bytes: 300, timestamp: 1002 });
    analyzer.add({ ip: "10.0.0.3", method: "GET", path: "/api/products", status: 404, bytes: 100, timestamp: 1003 });
    analyzer.add({ ip: "10.0.0.1", method: "DELETE", path: "/api/users/1", status: 500, bytes: 50, timestamp: 1004 });
  }

  it("counts entries", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    expect(a.count()).toBe(5);
  });

  it("finds top paths", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    const top = a.topPaths(2);
    expect(top[0].path).toBe("/api/users");
    expect(top[0].count).toBe(3);
  });

  it("finds top IPs", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    const top = a.topIPs(1);
    expect(top[0].ip).toBe("10.0.0.1");
    expect(top[0].count).toBe(3);
  });

  it("computes status distribution", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    const dist = a.statusDistribution();
    expect(dist.get(200)).toBe(2);
    expect(dist.get(404)).toBe(1);
  });

  it("computes error rate", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    expect(a.errorRate()).toBe(0.4);
  });

  it("totals bytes", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    expect(a.totalBytes()).toBe(1450);
  });

  it("computes method distribution", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    const dist = a.methodDistribution();
    expect(dist.get("GET")).toBe(3);
    expect(dist.get("POST")).toBe(1);
  });

  it("counts unique IPs", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    expect(a.uniqueIPs()).toBe(3);
  });

  it("filters entries", () => {
    const a = new AccessLogAnalyzer();
    addSampleEntries(a);
    const errors = a.filter((e) => e.status >= 400);
    expect(errors.length).toBe(2);
  });

  it("handles empty analyzer", () => {
    const a = new AccessLogAnalyzer();
    expect(a.errorRate()).toBe(0);
    expect(a.requestsPerSecond()).toBe(0);
  });
});
