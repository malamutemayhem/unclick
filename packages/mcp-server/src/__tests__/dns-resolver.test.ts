import { describe, it, expect } from "vitest";
import { DNSZone, DNSCache, DNSResolver } from "../dns-resolver.js";

describe("DNSZone", () => {
  it("adds and queries records", () => {
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "93.184.216.34");
    const records = zone.query("example.com", "A");
    expect(records.length).toBe(1);
    expect(records[0].value).toBe("93.184.216.34");
  });

  it("returns empty for missing records", () => {
    const zone = new DNSZone("example.com");
    expect(zone.query("missing.com", "A")).toEqual([]);
  });

  it("adds MX records with priority", () => {
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "MX", "mail.example.com", 3600, 10);
    const records = zone.query("example.com", "MX");
    expect(records[0].priority).toBe(10);
  });

  it("removes records", () => {
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "1.2.3.4");
    expect(zone.removeRecord("example.com", "A")).toBe(true);
    expect(zone.query("example.com", "A")).toEqual([]);
  });

  it("counts records", () => {
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "1.2.3.4");
    zone.addRecord("example.com", "AAAA", "::1");
    expect(zone.recordCount()).toBe(2);
  });
});

describe("DNSCache", () => {
  it("stores and retrieves records", () => {
    const cache = new DNSCache();
    cache.put({ name: "a.com", type: "A", value: "1.1.1.1", ttl: 60, expires: Date.now() + 60000 });
    expect(cache.get("a.com", "A").length).toBe(1);
  });

  it("returns empty for uncached", () => {
    const cache = new DNSCache();
    expect(cache.get("miss.com", "A")).toEqual([]);
  });

  it("invalidates entries", () => {
    const cache = new DNSCache();
    cache.put({ name: "a.com", type: "A", value: "1.1.1.1", ttl: 60, expires: Date.now() + 60000 });
    cache.invalidate("a.com", "A");
    expect(cache.get("a.com", "A")).toEqual([]);
  });

  it("clears all entries", () => {
    const cache = new DNSCache();
    cache.put({ name: "a.com", type: "A", value: "1.1.1.1", ttl: 60, expires: Date.now() + 60000 });
    cache.clear();
    expect(cache.totalEntries()).toBe(0);
  });
});

describe("DNSResolver", () => {
  it("resolves from zone", () => {
    const resolver = new DNSResolver();
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "93.184.216.34");
    resolver.addZone(zone);
    const results = resolver.resolve("example.com", "A");
    expect(results.length).toBe(1);
    expect(results[0].value).toBe("93.184.216.34");
  });

  it("follows CNAME chains", () => {
    const resolver = new DNSResolver();
    const zone = new DNSZone("example.com");
    zone.addRecord("www.example.com", "CNAME", "example.com");
    zone.addRecord("example.com", "A", "93.184.216.34");
    resolver.addZone(zone);
    const results = resolver.resolve("www.example.com", "A");
    expect(results.length).toBe(1);
    expect(results[0].value).toBe("93.184.216.34");
  });

  it("caches results", () => {
    const resolver = new DNSResolver();
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "1.2.3.4");
    resolver.addZone(zone);
    resolver.resolve("example.com", "A");
    expect(resolver.cacheSize()).toBe(1);
  });

  it("clears cache", () => {
    const resolver = new DNSResolver();
    const zone = new DNSZone("example.com");
    zone.addRecord("example.com", "A", "1.2.3.4");
    resolver.addZone(zone);
    resolver.resolve("example.com", "A");
    resolver.clearCache();
    expect(resolver.cacheSize()).toBe(0);
  });
});
