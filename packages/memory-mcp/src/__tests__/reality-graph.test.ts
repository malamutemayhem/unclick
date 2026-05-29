import { describe, expect, it } from "vitest";
import {
  assessRealityClaim,
  createRealityGraph,
  scoreMemoryGovernorCandidate,
  type RealityGraph,
} from "../reality-graph.js";

describe("Reality Graph", () => {
  it("turns a done claim into a contradiction when live proof disagrees", () => {
    const graph: RealityGraph = createRealityGraph({
      nodes: [
        {
          id: "claim:memory-library-fixed",
          kind: "claim",
          label: "Memory Library taxonomy was fixed",
          confidence: 0.7,
          last_confirmed_at: "2026-05-17T06:40:00Z",
        },
        {
          id: "screen:library-empty",
          kind: "screen",
          label: "Live Memory Library still shows no snapshots",
          source: {
            source_kind: "screenshot",
            source_id: "screenshot-2026-05-17-library-empty",
            source_uri: "/admin/memory?tab=library",
          },
        },
        {
          id: "job:reopen-memory-library",
          kind: "job",
          label: "Reopen Memory Library taxonomy proof job",
        },
      ],
      edges: [
        {
          id: "edge:screen-contradicts-claim",
          from: "screen:library-empty",
          to: "claim:memory-library-fixed",
          kind: "contradicts",
          confidence: 1,
        },
        {
          id: "edge:claim-routes-job",
          from: "claim:memory-library-fixed",
          to: "job:reopen-memory-library",
          kind: "routes_to",
        },
      ],
    });

    const assessment = assessRealityClaim(graph, "claim:memory-library-fixed", {
      now: new Date("2026-05-17T10:00:00Z"),
    });

    expect(assessment.status).toBe("contradicted");
    expect(assessment.trust_score).toBeLessThan(0.35);
    expect(assessment.next_action).toContain("reopen or create a job");
  });

  it("supports a claim when proof has a source receipt", () => {
    const graph: RealityGraph = createRealityGraph({
      nodes: [
        {
          id: "claim:uxpass-before-after",
          kind: "claim",
          label: "UXPass requires before and after screenshots",
          confidence: 0.75,
          last_confirmed_at: "2026-05-17T09:00:00Z",
        },
        {
          id: "proof:screenshot-gate-test",
          kind: "test",
          label: "Screenshot gate test passed",
          source: {
            source_kind: "test",
            source_id: "vitest:uxpass-screenshot-gate",
          },
        },
      ],
      edges: [
        {
          id: "edge:test-verifies-claim",
          from: "proof:screenshot-gate-test",
          to: "claim:uxpass-before-after",
          kind: "verifies",
          confidence: 0.95,
        },
      ],
    });

    const assessment = assessRealityClaim(graph, "claim:uxpass-before-after", {
      now: new Date("2026-05-17T10:00:00Z"),
    });

    expect(assessment.status).toBe("supported");
    expect(assessment.proof_strength).toBe("strong");
    expect(assessment.trust_score).toBeGreaterThan(0.75);
  });

  it("flags old supported memories as stale before strong recall", () => {
    const graph: RealityGraph = createRealityGraph({
      nodes: [
        {
          id: "memory:old-routing-rule",
          kind: "memory",
          label: "Old routing rule",
          confidence: 0.85,
          last_confirmed_at: "2026-03-01T00:00:00Z",
        },
        {
          id: "proof:old-comment",
          kind: "proof",
          label: "Old Boardroom comment",
          source: {
            source_kind: "boardroom",
            source_id: "comment-old-routing-rule",
          },
        },
      ],
      edges: [
        {
          id: "edge:old-proof-supports-memory",
          from: "proof:old-comment",
          to: "memory:old-routing-rule",
          kind: "supports",
        },
      ],
    });

    const assessment = assessRealityClaim(graph, "memory:old-routing-rule", {
      now: new Date("2026-05-17T10:00:00Z"),
      staleAfterDays: 30,
    });

    expect(assessment.status).toBe("stale");
    expect(assessment.next_action).toContain("re-check");
  });

  it("scores Memory Governor candidates by proof, freshness, contradictions, and duplicates", () => {
    const trusted = scoreMemoryGovernorCandidate(
      {
        id: "fact:trusted",
        label: "Trusted fact",
        confidence: 0.8,
        proof_strength: "strong",
        last_confirmed_at: "2026-05-17T09:00:00Z",
        access_count: 12,
      },
      { now: new Date("2026-05-17T10:00:00Z") },
    );

    const polluted = scoreMemoryGovernorCandidate(
      {
        id: "fact:polluted",
        label: "Polluted fact",
        confidence: 0.8,
        proof_strength: "none",
        contradiction_count: 1,
        duplicate_count: 4,
      },
      { now: new Date("2026-05-17T10:00:00Z") },
    );

    expect(trusted.score).toBeGreaterThan(polluted.score);
    expect(polluted.reasons).toContain("No proof receipt attached.");
    expect(polluted.reasons).toContain("Has contradiction signals.");
  });
});
