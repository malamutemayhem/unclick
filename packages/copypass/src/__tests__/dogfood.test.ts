import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { createDeterministicCopyPassReport } from "../verdict-pack.js";

function repoPath(pathFromRoot: string): string {
  return fileURLToPath(new URL(`../../../../${pathFromRoot}`, import.meta.url));
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
    expect(report.findings).toEqual([]);
    expect(report.verdict).toBe("pass");
  });
});
