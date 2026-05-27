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
});
