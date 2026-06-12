import { describe, it, expect } from "vitest";
import { laneOfAssignee, humanAssigneeName, parseLaneFilter, matchesLane } from "./jobLanes";

describe("jobLanes", () => {
  it("classifies human-prefixed assignees as the human lane", () => {
    expect(laneOfAssignee("human-chris")).toBe("human");
    expect(laneOfAssignee("human:james")).toBe("human");
    expect(laneOfAssignee("HUMAN-operator")).toBe("human");
    expect(laneOfAssignee("human")).toBe("human");
  });

  it("classifies agents and unassigned as the agent lane", () => {
    expect(laneOfAssignee("claude-cowork-pc")).toBe("agent");
    expect(laneOfAssignee("chatgpt-codex-worker2")).toBe("agent");
    expect(laneOfAssignee(null)).toBe("agent");
    expect(laneOfAssignee(undefined)).toBe("agent");
    expect(laneOfAssignee("")).toBe("agent");
    // "humanoid-bot" must not leak into the human lane
    expect(laneOfAssignee("humanoid-bot")).toBe("agent");
  });

  it("derives a person name from the assignee id", () => {
    expect(humanAssigneeName("human-chris")).toBe("Chris");
    expect(humanAssigneeName("human:james_smith")).toBe("James Smith");
    expect(humanAssigneeName("human")).toBe("Human");
  });

  it("parses lane filters safely from query params", () => {
    expect(parseLaneFilter("human")).toBe("human");
    expect(parseLaneFilter("agent")).toBe("agent");
    expect(parseLaneFilter("banana")).toBe("all");
    expect(parseLaneFilter(null)).toBe("all");
  });

  it("matchesLane filters by lane and passes everything for all", () => {
    expect(matchesLane("human-chris", "human")).toBe(true);
    expect(matchesLane("human-chris", "agent")).toBe(false);
    expect(matchesLane("claude-seat", "agent")).toBe(true);
    expect(matchesLane(null, "human")).toBe(false);
    expect(matchesLane(null, "all")).toBe(true);
  });
});
