import type { SlopPassFinding, SlopPassGitContext } from "../types.js";

interface LineEntry {
  number: number;
  text: string;
  key: string;
}

function splitLines(blob: string): LineEntry[] {
  return blob.replace(/\r\n/g, "\n").split("\n").map((text, index) => ({
    number: index + 1,
    text,
    key: text.trim(),
  }));
}

function comparableLineSet(blob: string): Set<string> {
  return new Set(
    splitLines(blob)
      .map((line) => line.key)
      .filter(Boolean),
  );
}

function groupContiguous(lines: LineEntry[]): LineEntry[][] {
  const groups: LineEntry[][] = [];
  for (const line of lines) {
    const current = groups[groups.length - 1];
    const previous = current?.[current.length - 1];
    if (current && previous && line.number === previous.number + 1) {
      current.push(line);
    } else {
      groups.push([line]);
    }
  }
  return groups;
}

function evidenceSnippet(lines: LineEntry[]): string {
  const shown = lines.slice(0, 8).map((line) => line.text.trimEnd());
  const suffix = lines.length > shown.length ? `\n... plus ${lines.length - shown.length} more line(s)` : "";
  return `${shown.join("\n")}${suffix}`;
}

export function detectStaleOverwrites(gitContext: SlopPassGitContext): SlopPassFinding[] {
  const findings: SlopPassFinding[] = [];

  for (const [file, blobs] of Object.entries(gitContext.files)) {
    const baseLines = comparableLineSet(blobs.base_blob);
    const prHeadLines = comparableLineSet(blobs.pr_head_blob);
    const missingMainOnlyLines = splitLines(blobs.main_blob).filter(
      (line) => line.key && !baseLines.has(line.key) && !prHeadLines.has(line.key),
    );

    for (const group of groupContiguous(missingMainOnlyLines)) {
      const first = group[0];
      const last = group[group.length - 1];
      const range = `${first.number}${first.number === last.number ? "" : `-${last.number}`}`;
      const snippet = evidenceSnippet(group);

      findings.push({
        title: "Current main lines are missing from the PR head",
        category: "vcs_integration_risk",
        severity: "critical",
        why_it_matters:
          "The PR appears to start from an older file version and would drop lines that landed on main after the PR base. A clean textual merge can still erase current work.",
        evidence: `${file}:${range} exists in current main but not in the PR base or PR head:\n${snippet}`,
        suggested_fix:
          "Rebase or merge current main, preserve these lines intentionally, then rerun SlopPass with fresh git_context.",
        confidence_note:
          "Deterministic 3-way line comparison. It catches missing main-only lines but still needs human review for intentional rewrites.",
        file,
        line: first.number,
        cross_branch_evidence: {
          base_sha: gitContext.base_sha,
          head_sha: gitContext.head_sha,
          file,
          line_range: [first.number, last.number],
        },
      });
    }
  }

  return findings;
}
