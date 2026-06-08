import { describe, it, expect } from "vitest";
import { ConsistentHash } from "../consistent-hash.js";

describe("consistent-hash", () => {
  it("distributes keys across nodes", () => {
    const ring = new ConsistentHash<string>();
    ring.add("server-a");
    ring.add("server-b");
    ring.add("server-c");
    const counts: Record<string, number> = { "server-a": 0, "server-b": 0, "server-c": 0 };
    for (let i = 0; i < 3000; i++) {
      const node = ring.get(`key-${i}`)!;
      counts[node]++;
    }
    expect(counts["server-a"]).toBeGreaterThan(100);
    expect(counts["server-b"]).toBeGreaterThan(100);
    expect(counts["server-c"]).toBeGreaterThan(100);
  });

  it("same key always maps to same node", () => {
    const ring = new ConsistentHash<string>();
    ring.add("a");
    ring.add("b");
    const first = ring.get("mykey");
    const second = ring.get("mykey");
    expect(first).toBe(second);
  });

  it("remove shifts keys to remaining nodes", () => {
    const ring = new ConsistentHash<string>();
    ring.add("a");
    ring.add("b");
    ring.remove("a");
    expect(ring.get("anything")).toBe("b");
    expect(ring.size).toBe(1);
  });

  it("get returns undefined when empty", () => {
    const ring = new ConsistentHash<string>();
    expect(ring.get("key")).toBeUndefined();
  });

  it("getN returns multiple distinct nodes", () => {
    const ring = new ConsistentHash<string>();
    ring.add("a");
    ring.add("b");
    ring.add("c");
    const nodes = ring.getN("key", 2);
    expect(nodes.length).toBe(2);
    expect(new Set(nodes).size).toBe(2);
  });

  it("getN caps at total node count", () => {
    const ring = new ConsistentHash<string>();
    ring.add("a");
    ring.add("b");
    const nodes = ring.getN("key", 5);
    expect(nodes.length).toBe(2);
  });

  it("adding same node twice is idempotent", () => {
    const ring = new ConsistentHash<string>();
    ring.add("a");
    ring.add("a");
    expect(ring.size).toBe(1);
    expect(ring.nodes).toEqual(["a"]);
  });

  it("nodes lists all added nodes", () => {
    const ring = new ConsistentHash<string>();
    ring.add("x");
    ring.add("y");
    expect(ring.nodes.sort()).toEqual(["x", "y"]);
  });
});
