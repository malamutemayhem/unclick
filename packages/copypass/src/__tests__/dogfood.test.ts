import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { createDeterministicCopyPassReport } from "../verdict-pack.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../");

function repoPath(pathFromRoot: string): string {
  return resolve(REPO_ROOT, pathFromRoot);
}

describe("CopyPass dogfood", () => {
  it("reviews its own product brief and admin catalog as a real deterministic run", async () => {
    const [brief, catalog] = await Promise.all([
      readFile(repoPath("docs/copypass-product-brief.md"), "utf8"),
      readFile(repoPath("src/pages/admin/copypass/CopyPassCatalog.tsx"), "utf8"),
    ]);

    const report = createDeterministicCopyPassReport({
      target: {
        kind: "artifact",
        label: "CopyPass product brief plus admin catalog",
        source: "repo dogfood",
      },
      blocks: [
        {
          id: "product-brief",
          kind: "doc",
          label: "CopyPass product brief",
          text: brief,
          source_path: "docs/copypass-product-brief.md",
        },
        {
          id: "admin-catalog",
          kind: "component",
          label: "CopyPass admin catalog",
          text: catalog,
          source_path: "src/pages/admin/copypass/CopyPassCatalog.tsx",
        },
      ],
    });

    expect(report.mode).toBe("deterministic");
    expect(report.disclaimer.compact).toContain("Scoped review only");
    expect(report.not_checked.map((item) => item.label)).toContain(
      "Legal, brand, or factual approval",
    );
    expect(report.not_checked.map((item) => item.label)).toContain(
      "Humaniser, template, or voice-profile rewrite",
    );
    expect(report.findings).toEqual([]);
    expect(report.verdict).toBe("pass");
  });

  it("reviews LegalPass guardrail files without mistaking quoted examples for shipped copy", async () => {
    const [verdictLinter, disclaimerBanner] = await Promise.all([
      readFile(repoPath("packages/legalpass/src/passguard/verdict-linter.ts"), "utf8"),
      readFile(repoPath("packages/legalpass/src/passguard/disclaimer-banner.ts"), "utf8"),
    ]);

    const report = createDeterministicCopyPassReport({
      target: {
        kind: "artifact",
        label: "LegalPass guardrails",
        source: "cross-pass dogfood",
      },
      blocks: [
        {
          id: "legalpass-verdict-linter",
          kind: "doc",
          label: "LegalPass forbidden phrase registry",
          text: verdictLinter,
          source_path: "packages/legalpass/src/passguard/verdict-linter.ts",
          public_only: false,
        },
        {
          id: "legalpass-disclaimer-banner",
          kind: "legal",
          label: "LegalPass disclaimer banner",
          text: disclaimerBanner,
          source_path: "packages/legalpass/src/passguard/disclaimer-banner.ts",
        },
      ],
    });

    expect(report.mode).toBe("deterministic");
    expect(report.blocks_reviewed).toEqual([
      "legalpass-verdict-linter",
      "legalpass-disclaimer-banner",
    ]);
    expect(report.findings).toEqual([]);
    expect(report.verdict).toBe("pass");
  });
});
