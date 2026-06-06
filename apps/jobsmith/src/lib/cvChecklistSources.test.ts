import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

import {
  getCvChecklistSource,
  getExpectedCvChecklistFileNames,
  JOBSMITH_CV_CHECKLIST_SOURCES,
  JOBSMITH_RULE_CATEGORIES,
  JOBSMITH_RULE_PACK_HANDOFF,
} from "./cvChecklistSources";

const jobsmithRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("JobSmith CV checklist CopyRoom manifest", () => {
  test("declares the five exact source files Chris supplied", () => {
    expect(getExpectedCvChecklistFileNames()).toEqual([
      "cv-checklists_1.md",
      "cv-checklists_1a.md",
      "cv-checklists_1b.md",
      "cv-checklists_2.md",
      "cv-checklists_3.md",
    ]);
  });

  test("keeps source file names and hashes unique", () => {
    const names = new Set(JOBSMITH_CV_CHECKLIST_SOURCES.map((source) => source.fileName));
    const hashes = new Set(JOBSMITH_CV_CHECKLIST_SOURCES.map((source) => source.sha256));
    expect(names.size).toBe(JOBSMITH_CV_CHECKLIST_SOURCES.length);
    expect(hashes.size).toBe(JOBSMITH_CV_CHECKLIST_SOURCES.length);
  });

  test("copied source files are present and unchanged", async () => {
    for (const source of JOBSMITH_CV_CHECKLIST_SOURCES) {
      const absolutePath = path.join(jobsmithRoot, source.repoPath.replace("apps/jobsmith/", ""));
      const content = await fs.readFile(absolutePath);
      const hash = createHash("sha256").update(content).digest("hex");
      expect(hash).toBe(source.sha256);
      expect(content.byteLength).toBe(source.bytes);
    }
  });

  test("tracks the FYI handoff proof gap instead of hiding it", () => {
    const severityTotal =
      JOBSMITH_RULE_PACK_HANDOFF.reportedSeverityCounts.error +
      JOBSMITH_RULE_PACK_HANDOFF.reportedSeverityCounts.warn +
      JOBSMITH_RULE_PACK_HANDOFF.reportedSeverityCounts.info;

    expect(JOBSMITH_RULE_PACK_HANDOFF.reportedRuleCount).toBe(40);
    expect(severityTotal).toBe(39);
    expect(JOBSMITH_RULE_PACK_HANDOFF.reconciliationNeeded).toBe(true);
    expect(JOBSMITH_RULE_PACK_HANDOFF.reconciliationNote).toMatch(/40-rule encoding/);
  });

  test("keeps the expanded 13-category rule map ready for the engine", () => {
    expect(JOBSMITH_RULE_CATEGORIES).toEqual([
      "ats",
      "age",
      "truth",
      "voice",
      "ai-detect",
      "cover",
      "linkedin",
      "visual",
      "metadata",
      "privacy",
      "role-specific",
      "interview-prep",
      "application-strategy",
    ]);
  });

  test("looks up a copied source by file name", () => {
    expect(getCvChecklistSource("cv-checklists_1b.md")?.round).toBe("round-1b");
    expect(getCvChecklistSource("missing.md")).toBeUndefined();
  });
});
