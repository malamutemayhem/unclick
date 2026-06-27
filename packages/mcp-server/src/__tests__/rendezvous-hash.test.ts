import { describe, it, expect } from "vitest";
import { RendezvousHash } from "../rendezvous-hash.js";

describe("RendezvousHash", () => {
  it("getNode returns a node for any key", () => {
    const rh = new RendezvousHash(["a", "b", "c"]);
    const node = rh.getNode("test-key");
    expect(["a", "b", "c"]).toContain(node);
  });

  it("getNode returns undefined for empty ring", () => {
    const rh = new RendezvousHash();
    expect(rh.getNode("key")).toBeUndefined();
  });

  it("same key always maps to same node", () => {
    const rh = new RendezvousHash(["x", "y", "z"]);
    const first = rh.getNode("stable-key");
    const second = rh.getNode("stable-key");
    expect(first).toBe(second);
  });

  it("addNode and removeNode work", () => {
    const rh = new RendezvousHash();
    rh.addNode("node1");
    rh.addNode("node2");
    expect(rh.nodeCount()).toBe(2);
    rh.removeNode("node1");
    expect(rh.nodeCount()).toBe(1);
  });

  it("getTopN returns ranked nodes", () => {
    const rh = new RendezvousHash(["a", "b", "c", "d"]);
    const top = rh.getTopN("key", 2);
    expect(top.length).toBe(2);
  });

  it("distribution assigns keys across nodes", () => {
    const rh = new RendezvousHash(["n1", "n2", "n3"]);
    const keys = Array.from({ length: 300 }, (_, i) => `key-${i}`);
    const dist = rh.distribution(keys);
    for (const count of dist.values()) {
      expect(count).toBeGreaterThan(0);
    }
  });

  it("addNode does not add duplicates", () => {
    const rh = new RendezvousHash(["a"]);
    rh.addNode("a");
    expect(rh.nodeCount()).toBe(1);
  });

  it("getNodes returns copy of nodes", () => {
    const rh = new RendezvousHash(["x", "y"]);
    expect(rh.getNodes()).toEqual(["x", "y"]);
  });
});
