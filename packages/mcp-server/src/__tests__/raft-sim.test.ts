import { describe, it, expect } from "vitest";
import { RaftNode } from "../raft-sim.js";

describe("RaftNode", () => {
  it("starts as follower", () => {
    const node = new RaftNode("n1");
    expect(node.role).toBe("follower");
    expect(node.term).toBe(0);
  });

  it("startElection transitions to candidate", () => {
    const node = new RaftNode("n1");
    const req = node.startElection();
    expect(node.role).toBe("candidate");
    expect(node.term).toBe(1);
    expect(req.candidateId).toBe("n1");
    expect(node.votes).toBe(1);
  });

  it("handleVoteRequest grants vote for valid request", () => {
    const voter = new RaftNode("n2");
    const resp = voter.handleVoteRequest({
      term: 1,
      candidateId: "n1",
      lastLogIndex: 0,
      lastLogTerm: 0,
    });
    expect(resp.granted).toBe(true);
  });

  it("handleVoteRequest rejects old term", () => {
    const voter = new RaftNode("n2");
    voter.startElection();
    const resp = voter.handleVoteRequest({
      term: 0,
      candidateId: "n1",
      lastLogIndex: 0,
      lastLogTerm: 0,
    });
    expect(resp.granted).toBe(false);
  });

  it("becomes leader with majority votes", () => {
    const node = new RaftNode("n1", 3);
    node.startElection();
    node.receiveVote({ term: 1, granted: true });
    expect(node.role).toBe("leader");
  });

  it("appendEntry works only as leader", () => {
    const follower = new RaftNode("n1");
    expect(follower.appendEntry("set x 1")).toBeNull();

    const leader = new RaftNode("n2", 3);
    leader.startElection();
    leader.receiveVote({ term: 1, granted: true });
    const entry = leader.appendEntry("set x 1");
    expect(entry).not.toBeNull();
    expect(entry!.command).toBe("set x 1");
    expect(leader.logLength).toBe(1);
  });

  it("handleAppendEntries appends entries", () => {
    const follower = new RaftNode("n2");
    const resp = follower.handleAppendEntries({
      term: 1,
      leaderId: "n1",
      prevLogIndex: 0,
      prevLogTerm: 0,
      entries: [{ term: 1, index: 1, command: "set x 1" }],
      leaderCommit: 0,
    });
    expect(resp.success).toBe(true);
    expect(follower.logLength).toBe(1);
  });

  it("handleAppendEntries rejects lower term", () => {
    const follower = new RaftNode("n2");
    follower.handleVoteRequest({ term: 2, candidateId: "n3", lastLogIndex: 0, lastLogTerm: 0 });
    const resp = follower.handleAppendEntries({
      term: 1,
      leaderId: "n1",
      prevLogIndex: 0,
      prevLogTerm: 0,
      entries: [],
      leaderCommit: 0,
    });
    expect(resp.success).toBe(false);
  });

  it("applyCommitted returns commands", () => {
    const leader = new RaftNode("n1", 3);
    leader.startElection();
    leader.receiveVote({ term: 1, granted: true });
    leader.appendEntry("cmd1");
    leader.appendEntry("cmd2");
    leader.advanceCommit(2);
    const applied = leader.applyCommitted();
    expect(applied).toEqual(["cmd1", "cmd2"]);
    expect(leader.applied).toBe(2);
  });

  it("getLog returns copy", () => {
    const leader = new RaftNode("n1", 3);
    leader.startElection();
    leader.receiveVote({ term: 1, granted: true });
    leader.appendEntry("cmd1");
    const log = leader.getLog();
    expect(log).toHaveLength(1);
  });

  it("steps down when receiving higher term", () => {
    const node = new RaftNode("n1", 3);
    node.startElection();
    node.receiveVote({ term: 5, granted: false });
    expect(node.role).toBe("follower");
    expect(node.term).toBe(5);
  });
});
