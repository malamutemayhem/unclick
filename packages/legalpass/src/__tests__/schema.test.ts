import { describe, expect, it } from "vitest";
import {
  LegalPassFixtureDocumentSchema,
  LegalPassHatDefinitionSchema,
  LegalPassReceiptSchema,
  LegalPassReportSchema,
} from "../schema.js";

const MINIMAL_EVIDENCE = {
  kind: "fixture" as const,
  label: "Public fixture",
  summary: "Checked public fixture text.",
};

function minimalReport(overrides: Record<string, unknown> = {}) {
  return {
    target: { name: "Example", url: "https://example.com" },
    generated_at: "2026-05-09T18:10:00.000Z",
    mode: "fixture",
    jurisdictions: ["AU"],
    overall_score: 0,
    verdict: "blocked",
    hats: [
      {
        hat_id: "privacy-policy",
        label: "Privacy Policy",
        score: 0,
        verdict: "fail",
        findings: [
          {
            id: "privacy-policy.contact.missing-fixture-signal",
            hat_id: "privacy-policy",
            severity: "high",
            title: "Contact path fixture signal missing",
            summary: "The public fixture text did not include the configured signal.",
            evidence: [MINIMAL_EVIDENCE],
          },
        ],
        comments: ["Evaluated one public fixture document."],
      },
    ],
    scanner_source: {
      kind: "fixture",
      mode: "fixture",
      shared_check_ids: [],
    },
    disclaimers: ["LegalPass is an issue-spotter only."],
    ...overrides,
  };
}

describe("LegalPass phase-one schema", () => {
  it("parses public fixture documents with safe defaults", () => {
    const document = LegalPassFixtureDocumentSchema.parse({
      id: "privacy-fixture",
      kind: "privacy-policy",
      title: "Privacy Policy Fixture",
      text: "We collect account data and provide a privacy contact.",
    });

    expect(document.public_only).toBe(true);
  });

  it("rejects non-http source URLs in public evidence fixtures", () => {
    expect(() =>
      LegalPassFixtureDocumentSchema.parse({
        id: "privacy-fixture",
        kind: "privacy-policy",
        title: "Privacy Policy Fixture",
        source_url: "ftp://example.com/privacy",
        text: "We collect account data and provide a privacy contact.",
      }),
    ).toThrow(/http/);
  });

  it("requires report disclaimers", () => {
    expect(() =>
      LegalPassReportSchema.parse({
        target: { name: "Example", url: "https://example.com" },
        generated_at: "2026-05-09T18:10:00.000Z",
        mode: "plan-only",
        jurisdictions: ["AU"],
        overall_score: 0,
        verdict: "unknown",
        hats: [],
        scanner_source: {
          kind: "manual",
          mode: "plan-only",
          shared_check_ids: [],
        },
        disclaimers: [],
      }),
    ).toThrow();
  });

  it("parses scoped LegalPass receipts with issue-spotter boundaries", () => {
    const receipt = LegalPassReceiptSchema.parse({
      kind: "legalpass_receipt_v1",
      status: "WARN",
      run_id: "legalpass_abc123",
      pack_id: "legalpass-mvp-v0",
      target: { name: "Example", url: "https://example.com/legal" },
      target_sha: "abc123",
      generated_at: "2026-05-09T18:10:00.000Z",
      mode: "fixture",
      jurisdictions: ["AU"],
      summary: {
        total: 1,
        check: 0,
        fail: 1,
        na: 0,
        other: 0,
        pending: 0,
        pass_rate: 0,
      },
      disclaimer_present: true,
      safety: {
        issue_spotter_only: true,
        no_legal_advice: true,
        no_transactional_instrument: true,
      },
      evidence_sources: [MINIMAL_EVIDENCE],
      action_needed: ["Practitioner review may be warranted before relying on this material."],
      boundaries: [
        "LegalPass is an issue-spotter and information tool only.",
        "LegalPass does not provide legal advice or create a lawyer-client relationship.",
      ],
    });

    expect(receipt.kind).toBe("legalpass_receipt_v1");
    expect(receipt.safety.no_legal_advice).toBe(true);
  });

  it("requires every finding to carry evidence", () => {
    const parsed = LegalPassReportSchema.safeParse(minimalReport({
      hats: [
        {
          hat_id: "privacy-policy",
          label: "Privacy Policy",
          score: 0,
          verdict: "fail",
          findings: [
            {
              id: "privacy-policy.contact.missing-fixture-signal",
              hat_id: "privacy-policy",
              severity: "high",
              title: "Contact path fixture signal missing",
              summary: "The public fixture text did not include the configured signal.",
              evidence: [],
            },
          ],
          comments: ["Evaluated one public fixture document."],
        },
      ],
    }));

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((issue) => issue.path.join(".").includes("evidence"))).toBe(true);
    }
  });

  it("rejects duplicate hat and finding ids in reports", () => {
    const duplicateHat = LegalPassReportSchema.safeParse(minimalReport({
      hats: [
        minimalReport().hats[0],
        {
          ...minimalReport().hats[0],
          findings: [
            {
              ...minimalReport().hats[0].findings[0],
              id: "privacy-policy.data-use.missing-fixture-signal",
            },
          ],
        },
      ],
    }));
    expect(duplicateHat.success).toBe(false);

    const duplicateFinding = LegalPassReportSchema.safeParse(minimalReport({
      hats: [
        {
          ...minimalReport().hats[0],
          findings: [
            minimalReport().hats[0].findings[0],
            minimalReport().hats[0].findings[0],
          ],
        },
      ],
    }));
    expect(duplicateFinding.success).toBe(false);
  });

  it("rejects duplicate check ids in hat definitions", () => {
    const parsed = LegalPassHatDefinitionSchema.safeParse({
      id: "privacy-policy",
      label: "Privacy Policy",
      summary: "Issue-spots public privacy policy signals.",
      target_documents: ["privacy-policy"],
      jurisdictions: ["AU"],
      checks: [
        {
          id: "privacy-contact",
          label: "Privacy contact",
          severity: "high",
          evidence_kinds: ["fixture"],
          fixture_terms: ["contact"],
          issue_spotting_note: "Review starts with a contact path.",
        },
        {
          id: "privacy-contact",
          label: "Privacy contact duplicate",
          severity: "medium",
          evidence_kinds: ["fixture"],
          fixture_terms: ["privacy"],
          issue_spotting_note: "Duplicate ids make evidence routing ambiguous.",
        },
      ],
    });

    expect(parsed.success).toBe(false);
  });
});
