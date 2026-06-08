import { describe, it, expect } from "vitest";
import { NetworkSimulator } from "../network-sim.js";

describe("NetworkSimulator", () => {
  it("delivers packet over direct link", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addBidirectionalLink("A", "B", 1);
    sim.send("A", "B", "hello");
    sim.tick();
    const received = sim.getReceived("B");
    expect(received.length).toBe(1);
    expect(received[0].payload).toBe("hello");
  });

  it("respects latency", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addBidirectionalLink("A", "B", 3);
    sim.send("A", "B", "data");
    sim.tick();
    expect(sim.getReceived("B").length).toBe(0);
    sim.tickN(2);
    expect(sim.getReceived("B").length).toBe(1);
  });

  it("routes through intermediate nodes", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addNode("C");
    sim.addBidirectionalLink("A", "B", 1);
    sim.addBidirectionalLink("B", "C", 1);
    sim.send("A", "C", "routed");
    sim.tickN(2);
    expect(sim.getReceived("C").length).toBe(1);
  });

  it("records hops", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addNode("C");
    sim.addBidirectionalLink("A", "B", 1);
    sim.addBidirectionalLink("B", "C", 1);
    sim.send("A", "C", "trace");
    sim.tickN(2);
    const pkt = sim.getReceived("C")[0];
    expect(pkt.hops).toContain("A");
    expect(pkt.hops).toContain("B");
    expect(pkt.hops).toContain("C");
  });

  it("drops packets when TTL expires", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addNode("C");
    sim.addBidirectionalLink("A", "B", 1);
    sim.addBidirectionalLink("B", "C", 1);
    sim.send("A", "C", "short", 1);
    sim.tickN(2);
    expect(sim.getReceived("C").length).toBe(0);
  });

  it("tracks in-flight packets", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.addBidirectionalLink("A", "B", 5);
    sim.send("A", "B", "x");
    expect(sim.inFlightCount()).toBe(1);
    sim.tickN(5);
    expect(sim.inFlightCount()).toBe(0);
  });

  it("tracks time", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    expect(sim.getTime()).toBe(0);
    sim.tickN(10);
    expect(sim.getTime()).toBe(10);
  });

  it("handles missing route", () => {
    const sim = new NetworkSimulator(42);
    sim.addNode("A");
    sim.addNode("B");
    sim.send("A", "B", "lost");
    sim.tick();
    expect(sim.getReceived("B").length).toBe(0);
    expect(sim.getDropped("A")).toBe(1);
  });
});
