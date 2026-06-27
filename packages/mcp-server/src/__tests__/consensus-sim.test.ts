import { describe, it, expect } from "vitest";
import { RaftCluster } from "../consensus-sim.js";

describe("RaftCluster", () => {
  function threeNodeCluster(): RaftCluster {
    const cluster = new RaftCluster();
    cluster.addNode("n1");
    cluster.addNode("n2");
    cluster.addNode("n3");
    return cluster;
  }

  it("adds nodes as followers", () => {
    const cluster = threeNodeCluster();
    expect(cluster.nodeCount()).toBe(3);
    expect(cluster.getNode("n1")!.role).toBe("follower");
  });

  it("elects a leader", () => {
    const cluster = threeNodeCluster();
    expect(cluster.startElection("n1")).toBe(true);
    expect(cluster.getNode("n1")!.role).toBe("leader");
    expect(cluster.leader()).toBe("n1");
  });

  it("increments term on election", () => {
    const cluster = threeNodeCluster();
    cluster.startElection("n1");
    expect(cluster.getNode("n1")!.term).toBe(1);
  });

  it("appends entries from leader", () => {
    const cluster = threeNodeCluster();
    cluster.startElection("n1");
    expect(cluster.appendEntry("n1", "SET x=1")).toBe(true);
    expect(cluster.committedEntries("n1")).toEqual(["SET x=1"]);
  });

  it("replicates to followers", () => {
    const cluster = threeNodeCluster();
    cluster.startElection("n1");
    cluster.appendEntry("n1", "SET x=1");
    expect(cluster.committedEntries("n2")).toEqual(["SET x=1"]);
  });

  it("rejects append from non-leader", () => {
    const cluster = threeNodeCluster();
    expect(cluster.appendEntry("n2", "SET x=1")).toBe(false);
  });

  it("handles network partition", () => {
    const cluster = new RaftCluster();
    cluster.addNode("n1");
    cluster.addNode("n2");
    cluster.addNode("n3");
    cluster.addNode("n4");
    cluster.addNode("n5");

    cluster.startElection("n1");
    cluster.partition("n4");
    cluster.partition("n5");

    expect(cluster.appendEntry("n1", "cmd1")).toBe(true);

    const n4 = cluster.getNode("n4")!;
    expect(n4.commitIndex).toBe(-1);
  });

  it("heals partition", () => {
    const cluster = threeNodeCluster();
    cluster.startElection("n1");
    cluster.partition("n3");
    cluster.appendEntry("n1", "cmd1");
    expect(cluster.getNode("n3")!.log.length).toBe(0);

    cluster.heal("n3");
    cluster.appendEntry("n1", "cmd2");
    expect(cluster.getNode("n3")!.log.length).toBe(1);
  });

  it("prevents election without majority", () => {
    const cluster = new RaftCluster();
    cluster.addNode("n1");
    cluster.addNode("n2");
    cluster.addNode("n3");
    cluster.partition("n2");
    cluster.partition("n3");
    expect(cluster.startElection("n1")).toBe(false);
  });

  it("multiple entries accumulate", () => {
    const cluster = threeNodeCluster();
    cluster.startElection("n1");
    cluster.appendEntry("n1", "a");
    cluster.appendEntry("n1", "b");
    cluster.appendEntry("n1", "c");
    expect(cluster.committedEntries("n1")).toEqual(["a", "b", "c"]);
  });

  it("returns null leader when none elected", () => {
    const cluster = threeNodeCluster();
    expect(cluster.leader()).toBeNull();
  });
});
