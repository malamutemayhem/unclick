import { describe, expect, it } from "vitest";

import { buildWelcomePacket } from "./applicationManager";

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
