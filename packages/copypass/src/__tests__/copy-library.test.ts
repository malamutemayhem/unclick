import { describe, expect, it } from "vitest";
import { detectCopyPassFindings } from "../copy-library.js";
import type { CopyPassCopyBlock } from "../schema.js";

describe("CopyPass copy library", () => {
  it("flags vague hero copy, missing CTA, trust gaps, unsupported claims, and placeholders", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text: "Welcome to the best all-in-one solution. Coming soon.",
        public_only: true,
      },
    ];

    const checkIds = detectCopyPassFindings(blocks).map((finding) => finding.check_id);

    expect(checkIds).toContain("value-prop-clarity");
    expect(checkIds).toContain("cta-presence");
    expect(checkIds).toContain("proof-trust-gap");
    expect(checkIds).toContain("unsupported-superiority");
    expect(checkIds).toContain("placeholder-copy");
  });

  it("redacts sensitive fixture fragments from evidence", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "feature",
        kind: "feature",
        text: "TODO: replace this API key sk-test-secret-value with final copy.",
        public_only: true,
      },
    ];

    const [finding] = detectCopyPassFindings(blocks);

    expect(finding.evidence).toBe("[redacted-sensitive-copy-fragment]");
  });

  it("flags AI-slop language, misleading urgency, UI honesty gaps, and offer contradictions", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text:
          "Autopilot is fully automated and will unlock a seamless workflow. Act now before it's gone.",
        public_only: true,
      },
      {
        id: "pricing",
        kind: "pricing",
        text: "Free forever. Paid only after setup fee. This insane deal is a no-brainer.",
        public_only: true,
      },
    ];

    const checkIds = detectCopyPassFindings(blocks).map((finding) => finding.check_id);

    expect(checkIds).toContain("ai-slop-language");
    expect(checkIds).toContain("misleading-urgency");
    expect(checkIds).toContain("ui-honesty-gap");
    expect(checkIds).toContain("audience-tone-fit");
    expect(checkIds).toContain("internal-consistency");
  });

  it("uses whole-term matching to avoid substring false positives", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text:
          "Smartly written operator notes help reviewers lead with evidence and proof. Start a review.",
        public_only: true,
      },
    ];

    expect(detectCopyPassFindings(blocks)).toEqual([]);
  });

  it("does not flag neutralized guarantee language", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "legal",
        kind: "legal",
        text:
          "This review does not guarantee legal approval, revenue, rankings, or conversion performance.",
        public_only: true,
      },
    ];

    expect(detectCopyPassFindings(blocks)).toEqual([]);
  });

  it("flags detector-evasion claims as a high-risk positioning issue", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "claim",
        kind: "feature",
        text: "Rewrite AI text into undetectable AI that can pass Turnitin every time.",
        public_only: true,
      },
    ];

    const [finding] = detectCopyPassFindings(blocks).filter(
      (item) => item.check_id === "detector-evasion-claim",
    );

    expect(finding?.severity).toBe("high");
    expect(finding?.suggested_fix).toContain("quality");
  });

  it("flags social-proof claims without evidence", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text: "Trusted by thousands of teams and rated five-star by founders.",
        public_only: true,
      },
    ];

    const checkIds = detectCopyPassFindings(blocks).map((finding) => finding.check_id);

    expect(checkIds).toContain("testimonial-proof-gap");
  });

  it("flags unsupported human-authorship claims", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "feature",
        kind: "feature",
        text: "Turn AI drafts into 100% human-written copy with one click.",
        public_only: true,
      },
    ];

    const [finding] = detectCopyPassFindings(blocks).filter(
      (item) => item.check_id === "authorship-transparency",
    );

    expect(finding?.severity).toBe("high");
    expect(finding?.suggested_fix).toContain("human-written");
  });

  it("does not treat explicit banned-phrase documentation as live risky copy", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "legalpass-guardrail-doc",
        kind: "doc",
        label: "LegalPass banned phrases",
        source_path: "docs/legalpass-product-brief.md",
        text:
          "Verdict-linter guardrail examples: banned phrases include `100% compliant`, " +
          "`risk-free`, `AI lawyer`, `rank #1`, `last chance`, `trusted by`, `100% human`, and `fully automated`. " +
          "Allowed framing includes `may warrant review` and `qualified practitioner review may be warranted`.",
        public_only: true,
      },
    ];

    expect(detectCopyPassFindings(blocks)).toEqual([]);
  });

  it("still flags the same risky words in live public claim copy", () => {
    const blocks: CopyPassCopyBlock[] = [
      {
        id: "legalpass-hero",
        kind: "hero",
        text:
          "LegalPass is the best AI lawyer, 100% compliant, risk-free, fully automated, and guaranteed to rank #1.",
        public_only: true,
      },
    ];

    const checkIds = detectCopyPassFindings(blocks).map((finding) => finding.check_id);

    expect(checkIds).toContain("unsupported-superiority");
    expect(checkIds).toContain("risky-guarantee-language");
    expect(checkIds).toContain("ui-honesty-gap");
  });

  it("flags a display heading that risks a one-word hanger, and clears it once bound", () => {
    const risky: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text: "Guardrails check every risky action before your AI acts.",
        public_only: true,
      },
    ];
    expect(detectCopyPassFindings(risky).map((finding) => finding.check_id)).toContain(
      "display-copy-widow",
    );

    // A non-breaking space binding the last two words clears the risk.
    const bound: CopyPassCopyBlock[] = [
      {
        id: "hero",
        kind: "hero",
        text: "Guardrails check every risky action before your AI\u00A0acts.",
        public_only: true,
      },
    ];
    expect(detectCopyPassFindings(bound).map((finding) => finding.check_id)).not.toContain(
      "display-copy-widow",
    );

    // Short headings are too small to wrap into a hanger.
    const shortHeading: CopyPassCopyBlock[] = [
      { id: "hero", kind: "hero", text: "Memory that lasts.", public_only: true },
    ];
    expect(detectCopyPassFindings(shortHeading).map((finding) => finding.check_id)).not.toContain(
      "display-copy-widow",
    );
  });
});
