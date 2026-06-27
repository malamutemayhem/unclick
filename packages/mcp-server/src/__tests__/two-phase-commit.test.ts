import { describe, it, expect } from "vitest";
import { TwoPhaseCoordinator, ThreePhaseCoordinator } from "../two-phase-commit.js";

describe("TwoPhaseCoordinator", () => {
  it("commits when all participants agree", () => {
    const coord = new TwoPhaseCoordinator("tx1");
    coord.addParticipant("p1");
    coord.addParticipant("p2");
    const result = coord.run();
    expect(result).toBe("commit");
    expect(coord.getParticipantState("p1")).toBe("committed");
    expect(coord.getParticipantState("p2")).toBe("committed");
  });

  it("aborts when one participant fails", () => {
    const coord = new TwoPhaseCoordinator("tx2");
    coord.addParticipant("p1", true);
    coord.addParticipant("p2", false);
    const result = coord.run();
    expect(result).toBe("abort");
    expect(coord.getParticipantState("p1")).toBe("aborted");
    expect(coord.getParticipantState("p2")).toBe("aborted");
  });

  it("prepare returns vote map", () => {
    const coord = new TwoPhaseCoordinator("tx3");
    coord.addParticipant("p1", true);
    coord.addParticipant("p2", false);
    const votes = coord.prepare();
    expect(votes.get("p1")).toBe(true);
    expect(votes.get("p2")).toBe(false);
  });

  it("tracks coordinator state", () => {
    const coord = new TwoPhaseCoordinator("tx4");
    expect(coord.coordinatorState).toBe("init");
    coord.addParticipant("p1");
    coord.run();
    expect(coord.coordinatorState).toBe("done");
  });

  it("transactionId and participantCount", () => {
    const coord = new TwoPhaseCoordinator("tx5");
    coord.addParticipant("p1");
    coord.addParticipant("p2");
    coord.addParticipant("p3");
    expect(coord.transactionId).toBe("tx5");
    expect(coord.participantCount).toBe(3);
  });

  it("getParticipantIds returns all ids", () => {
    const coord = new TwoPhaseCoordinator("tx6");
    coord.addParticipant("a");
    coord.addParticipant("b");
    expect(coord.getParticipantIds()).toEqual(["a", "b"]);
  });

  it("getParticipantState returns null for unknown", () => {
    const coord = new TwoPhaseCoordinator("tx7");
    expect(coord.getParticipantState("unknown")).toBeNull();
  });
});

describe("ThreePhaseCoordinator", () => {
  it("commits when all agree", () => {
    const coord = new ThreePhaseCoordinator();
    coord.addParticipant("p1");
    coord.addParticipant("p2");
    const result = coord.run();
    expect(result).toBe("commit");
    expect(coord.coordinatorState).toBe("committed");
  });

  it("aborts when one disagrees", () => {
    const coord = new ThreePhaseCoordinator();
    coord.addParticipant("p1", true);
    coord.addParticipant("p2", false);
    const result = coord.run();
    expect(result).toBe("abort");
    expect(coord.coordinatorState).toBe("aborted");
  });

  it("canCommit returns vote map", () => {
    const coord = new ThreePhaseCoordinator();
    coord.addParticipant("p1", true);
    coord.addParticipant("p2", false);
    const votes = coord.canCommit();
    expect(votes.get("p1")).toBe(true);
    expect(votes.get("p2")).toBe(false);
  });

  it("doCommit fails if not pre-committed", () => {
    const coord = new ThreePhaseCoordinator();
    coord.addParticipant("p1");
    expect(coord.doCommit()).toBe(false);
  });

  it("participantCount", () => {
    const coord = new ThreePhaseCoordinator();
    coord.addParticipant("p1");
    coord.addParticipant("p2");
    expect(coord.participantCount).toBe(2);
  });
});
