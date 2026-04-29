import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { runSlopPass } from "../runner/index.js";

function collectSourceFiles(dir: string): Array<{ path: string; content: string }> {
  const files: Array<{ path: string; content: string }> = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "__tests__") continue;
      files.push(...collectSourceFiles(full));
    } else if (entry.endsWith(".ts")) {
      files.push({
        path: relative(process.cwd(), full).replace(/\\/g, "/"),
        content: readFileSync(full, "utf8"),
      });
    }
  }
  return files;
}

describe("SlopPass dogfoods on itself", () => {
  it("can inspect its own source and return a scoped artifact", async () => {
    const root = join(fileURLToPath(new URL("..", import.meta.url)));
    const files = collectSourceFiles(root);
    const result = await runSlopPass({
      target: { kind: "files", label: "@unclick/sloppass self-check", files: files.map((file) => file.path) },
      files,
    });

    expect(result.target.label).toBe("@unclick/sloppass self-check");
    expect(result.scope.files_reviewed.length).toBeGreaterThan(0);
    expect(result.summary.coverage_note).toContain("Unknown runtime paths stay unknown");
    expect(result.disclaimer.headline).toContain("not a guarantee");
  });
});
