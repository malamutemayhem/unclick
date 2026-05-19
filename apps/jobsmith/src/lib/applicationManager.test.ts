import { describe, expect, it } from "vitest";

import { buildDecisionCards, buildManagedApplicationRun, buildWelcomePacket } from "./applicationManager";

const ruleSummary = {
  totalRules: 229,
  categories: ["ATS", "VOICE", "APPLICATION"],
  bySeverity: { ERROR: 24, WARN: 120, INFO: 85 },
  needsRefresh: 3,
};

describe("JobSmith application manager welcome packet", () => {
  it("orients a fresh AI seat before inputs are available", () => {
    const packet = buildWelcomePacket({
      corpusReady: false,
      jobText: "",
      draftReady: false,
      ruleSummary,
    });

    expect(packet.title).toBe("AI Welcome Packet");
    expect(packet.status).toBe("loading_inputs");
    expect(packet.purpose).toContain("manages a job application run");
    expect(packet.missingInputs).toContain("Loaded CV corpus and voice profile");
    expect(packet.missingInputs).toContain("Full job ad or role brief");
    expect(packet.safestNextMove).toContain("corpus");
    expect(packet.stopConditions).toContain("Do not submit an application");
  });

  it("names visible inputs and asks for the next smallest move", () => {
    const packet = buildWelcomePacket({
      corpusReady: true,
      corpusStats: {
        coverLetters: 4,
        jobsApplied: 7,
        roleTypes: ["Creative Lead", "Brand Strategy"],
        pastBrands: ["Malamute Mayhem", "UnClick"],
      },
      jobText: "",
      draftReady: false,
      ruleSummary,
    });

    expect(packet.status).toBe("needs_job_ad");
    expect(packet.availableInputs[0]).toBe("CV corpus: 4 cover letters and 7 prior applications");
    expect(packet.availableInputs).toContain("Rule pack v1: 229 rules across 3 categories");
    expect(packet.missingInputs).toEqual(["Full job ad or role brief", "Generated application packet artifact"]);
    expect(packet.safestNextMove).toContain("Paste the full job ad");
  });

  it("moves from generate-ready to draft-ready without claiming submit-ready", () => {
    const readyPacket = buildWelcomePacket({
      corpusReady: true,
      corpusStats: {
        coverLetters: 4,
        jobsApplied: 7,
        roleTypes: [],
        pastBrands: [],
      },
      jobText: "Senior product designer role for a sports wagering app.",
      draftReady: false,
      ruleSummary,
    });

    expect(readyPacket.status).toBe("ready_to_generate");
    expect(readyPacket.availableInputs).toContain("Job ad: 9 words pasted");
    expect(readyPacket.safestNextMove).toContain("Generate the starter draft");

    const draftPacket = buildWelcomePacket({
      corpusReady: true,
      corpusStats: {
        coverLetters: 4,
        jobsApplied: 7,
        roleTypes: [],
        pastBrands: [],
      },
      jobText: "Senior product designer role for a sports wagering app.",
      draftReady: true,
      ruleSummary,
    });

    expect(draftPacket.status).toBe("draft_ready");
    expect(draftPacket.missingInputs).toEqual([]);
    expect(draftPacket.availableInputs).toContain("Draft artifact: application packet generated for review");
    expect(draftPacket.safestNextMove).toContain("missing proof");
    expect(draftPacket.stopConditions).toContain("Do not claim submit-ready while blockers or missing inputs remain");
  });

  it("treats routed application-run fields as the intake source", () => {
    const partialPacket = buildWelcomePacket({
      corpusReady: true,
      applicationRun: {
        company: "Sportsbet",
        role: "Product Design Lead",
        jobSource: "https://example.com/sportsbet-role",
        sourceBackedClaim: "",
        proofNote: "",
      },
      jobText: "",
      draftReady: false,
      ruleSummary,
    });

    expect(partialPacket.status).toBe("needs_job_ad");
    expect(partialPacket.availableInputs).toContain("Company: Sportsbet");
    expect(partialPacket.availableInputs).toContain("Role: Product Design Lead");
    expect(partialPacket.missingInputs).toEqual([
      "Source-backed claim",
      "Proof note",
      "Generated application packet artifact",
    ]);

    const readyPacket = buildWelcomePacket({
      corpusReady: true,
      applicationRun: {
        company: "Sportsbet",
        role: "Product Design Lead",
        jobSource: "https://example.com/sportsbet-role",
        sourceBackedClaim: "Led a wagering-safe UX redesign.",
        proofNote: "Portfolio case study backs the claim.",
      },
      jobText: "",
      draftReady: true,
      ruleSummary,
    });

    expect(readyPacket.status).toBe("draft_ready");
    expect(readyPacket.availableInputs).toContain("Source-backed claim captured");
    expect(readyPacket.availableInputs).toContain("Proof note captured");
    expect(readyPacket.missingInputs).toEqual([]);
  });
});

describe("JobSmith application manager decision cards", () => {
  it("turns review-needed rules into owned decision cards with proof needs", () => {
    const cards = buildDecisionCards({
      reviewNeeded: [
        {
          ruleId: "JS-COVER-08",
          name: "Cover letter structure",
          category: "COVER",
          severity: "WARN",
          action: "flags",
          checkType: "human_review",
          needsRefresh: false,
        },
        {
          ruleId: "JS-TRUTH-05",
          name: "Verify employment dates",
          category: "TRUTH",
          severity: "ERROR",
          action: "blocks",
          checkType: "semantic_check",
          needsRefresh: false,
        },
      ],
      findings: [],
      missingInputs: [],
      artifactsReady: true,
    });

    expect(cards).toHaveLength(2);
    expect(cards[0]).toMatchObject({
      id: "decision-card-js-truth-05",
      owner: "human",
      status: "blocked",
      proofNeeded: "A human PASS/BLOCKER decision with source evidence is required before submit-ready.",
    });
    expect(cards[1]).toMatchObject({
      id: "decision-card-js-cover-08",
      owner: "human",
      status: "needs_decision",
      suggestedAction: "Review and either revise the draft or record an accepted risk.",
    });
  });

  it("adds product blockers when inputs or artifacts are missing", () => {
    const cards = buildDecisionCards({
      reviewNeeded: [],
      findings: [],
      missingInputs: ["Full job ad", "Proof note"],
      artifactsReady: false,
    });

    expect(cards.map((card) => card.ruleId)).toEqual(["jobsmith-artifacts", "jobsmith-missing-inputs"]);
    expect(cards.every((card) => card.status === "blocked")).toBe(true);
    expect(cards[1].reason).toContain("Full job ad");
    expect(cards[1].reason).toContain("Proof note");
  });

  it("keeps deterministic error findings as submit-ready blockers", () => {
    const cards = buildDecisionCards({
      reviewNeeded: [
        {
          ruleId: "JS-AIDETECT-04",
          name: "No em dash",
          category: "AIDETECT",
          severity: "ERROR",
          action: "blocks",
          checkType: "regex",
          needsRefresh: false,
        },
      ],
      findings: [
        {
          ruleId: "JS-AIDETECT-04",
          name: "No em dash",
          category: "AIDETECT",
          severity: "ERROR",
          action: "blocks",
          message: "Do not use em dashes in final documents.",
          match: "\u2014",
          start: 16,
          end: 17,
          checkType: "regex",
          needsRefresh: false,
        },
      ],
      missingInputs: [],
      artifactsReady: true,
    });

    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({
      owner: "jobsmith",
      status: "blocked",
      reason: "Do not use em dashes in final documents.",
      proofNeeded: 'Resolve or justify the matched text: "\u2014".',
    });
  });
});

describe("JobSmith managed application run", () => {
  it("keeps the Sportsbet replay out of submit-ready while owner review is open", () => {
    const reviewNeeded = [
      {
        ruleId: "JS-TRUTH-05",
        name: "Verify employment dates",
        category: "TRUTH",
        severity: "WARN" as const,
        action: "flags" as const,
        checkType: "semantic_check" as const,
        needsRefresh: false,
      },
    ];
    const decisionCards = buildDecisionCards({
      reviewNeeded,
      findings: [],
      missingInputs: [],
      artifactsReady: true,
    });

    const report = buildManagedApplicationRun({
      runId: "sportsbet-replay-2026-05-19",
      company: "Sportsbet",
      role: "Product Design Lead",
      jobSource: "https://example.com/sportsbet-role",
      sourceBackedClaim: "Led a wagering-safe product workflow with documented stakeholder proof.",
      proofNote: "Portfolio case study backs the claim.",
      ruleResult: {
        totalRules: 229,
        findings: [],
        reviewNeeded,
        blocked: false,
      },
      decisionCards,
      artifacts: [
        {
          id: "sportsbet-starter-pack",
          label: "Sportsbet starter packet",
          kind: "starter_packet",
          ready: true,
          proof: "browser-local packet generated in replay",
        },
      ],
      proof: [
        {
          id: "sportsbet-replay-vitest",
          label: "Sportsbet managed-run replay",
          kind: "test",
          uri: "vitest://apps/jobsmith/src/lib/applicationManager.test.ts",
        },
      ],
    });

    expect(report.runId).toBe("sportsbet-replay-2026-05-19");
    expect(report.status).toBe("review_needed");
    expect(report.submitReady).toBe(false);
    expect(report.rulesPassed).toBe(228);
    expect(report.reviewNeededCount).toBe(1);
    expect(report.artifacts).toHaveLength(1);
    expect(report.proof[0]).toMatchObject({ id: "sportsbet-replay-vitest", kind: "test" });
    expect(report.steps.map((step) => [step.id, step.status])).toEqual([
      ["intake", "ready"],
      ["artifacts", "ready"],
      ["rules", "ready"],
      ["review", "review_needed"],
      ["proof", "ready"],
    ]);
    expect(report.nextSafeAction).toContain("decision cards");
  });

  it("requires run proof before a clean application report can be submit-ready", () => {
    const baseRun = {
      runId: "clean-run",
      company: "Example Studio",
      role: "Senior Product Designer",
      jobSource: "https://example.com/jobs/designer",
      sourceBackedClaim: "Shipped a source-backed product redesign.",
      proofNote: "Portfolio case study and CV notes show the redesign proof.",
      ruleResult: {
        totalRules: 229,
        findings: [],
        reviewNeeded: [],
        blocked: false,
      },
      decisionCards: [],
      artifacts: [
        {
          id: "starter-pack",
          label: "Starter packet",
          kind: "starter_packet" as const,
          ready: true,
          proof: "starter packet rendered",
        },
      ],
    };

    expect(buildManagedApplicationRun({ ...baseRun, proof: [] })).toMatchObject({
      status: "proof_needed",
      submitReady: false,
      nextSafeAction: "Attach screenshot, API, or test proof for the managed run.",
    });

    expect(
      buildManagedApplicationRun({
        ...baseRun,
        proof: [{ id: "api-proof", label: "API replay proof", kind: "api", uri: "api://jobsmith/runs/clean-run" }],
      }),
    ).toMatchObject({
      status: "submit_ready",
      submitReady: true,
      rulesPassed: 229,
      blockers: [],
    });
  });
});
