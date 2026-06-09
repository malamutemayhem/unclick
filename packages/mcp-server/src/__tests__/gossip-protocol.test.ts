import { describe, it, expect } from "vitest";
import { GossipCluster } from "../gossip-protocol.js";

describe("GossipCluster", () => {
  it("adds nodes", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    expect(cluster.nodeCount).toBe(2);
  });

  it("sets and gets local state", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.setLocal("a", "key", 42);
    expect(cluster.getLocal("a", "key")).toBe(42);
  });

  it("connects nodes", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.connect("a", "b");
    expect(cluster.nodeIds()).toContain("a");
    expect(cluster.nodeIds()).toContain("b");
  });

  it("gossip propagates state", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.connect("a", "b");
    cluster.setLocal("a", "x", 100);
    cluster.gossipRoundDeterministic();
    expect(cluster.getLocal("b", "x")).toBe(100);
  });

  it("converges across cluster", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.addNode("c");
    cluster.connect("a", "b");
    cluster.connect("b", "c");
    cluster.setLocal("a", "data", "hello");
    const rounds = cluster.converge();
    expect(rounds).toBeLessThanOrEqual(3);
    expect(cluster.getLocal("c", "data")).toBe("hello");
  });

  it("newer version wins", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.connect("a", "b");
    cluster.setLocal("a", "k", "old");
    cluster.gossipRoundDeterministic();
    cluster.setLocal("a", "k", "new");
    cluster.gossipRoundDeterministic();
    expect(cluster.getLocal("b", "k")).toBe("new");
  });

  it("isConverged detects convergence", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.connect("a", "b");
    cluster.setLocal("a", "x", 1);
    expect(cluster.isConverged("x")).toBe(false);
    cluster.gossipRoundDeterministic();
    expect(cluster.isConverged("x")).toBe(true);
  });

  it("removeNode cleans up", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.addNode("b");
    cluster.connect("a", "b");
    cluster.removeNode("b");
    expect(cluster.nodeCount).toBe(1);
  });

  it("getState returns current state", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.setLocal("a", "x", 1);
    cluster.setLocal("a", "y", 2);
    const state = cluster.getState("a");
    expect(state.get("x")).toBe(1);
    expect(state.get("y")).toBe(2);
  });

  it("log tracks events", () => {
    const cluster = new GossipCluster();
    cluster.addNode("a");
    cluster.setLocal("a", "x", 1);
    expect(cluster.getLog().length).toBeGreaterThan(0);
    cluster.clearLog();
    expect(cluster.getLog().length).toBe(0);
  });
});
