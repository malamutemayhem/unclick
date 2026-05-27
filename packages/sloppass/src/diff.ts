import type { SlopPassSourceFile } from "./types.js";

interface DiffHunk {
  path: string;
  startLine: number;
  lines: string[];
  addedCount: number;
}

function parseNewPath(line: string): string | null {
  const raw = line.replace(/^\+\+\+\s+/, "").trim();
  if (!raw || raw === "/dev/null") return null;
  return raw.replace(/^b\//, "");
}

function parseNewStart(line: string): number | null {
  const match = /\+(\d+)(?:,\d+)?/.exec(line);
  if (!match) return null;
  return Number.parseInt(match[1] ?? "", 10);
}

function pushHunk(hunks: DiffHunk[], hunk: DiffHunk | null): void {
  if (!hunk || hunk.addedCount === 0) return;
  hunks.push(hunk);
}

export function sourceFilesFromUnifiedDiff(diff: string): SlopPassSourceFile[] {
  const hunks: DiffHunk[] = [];
  let currentPath: string | null = null;
  let currentHunk: DiffHunk | null = null;

  for (const line of diff.split(/\r?\n/)) {
    if (line.startsWith("+++ ")) {
      pushHunk(hunks, currentHunk);
      currentHunk = null;
      currentPath = parseNewPath(line);
      continue;
    }

    if (line.startsWith("@@")) {
      pushHunk(hunks, currentHunk);
      const startLine = parseNewStart(line);
      if (!currentPath || startLine === null) {
        currentHunk = null;
        continue;
      }
      currentHunk = { path: currentPath, startLine, lines: [], addedCount: 0 };
      continue;
    }

    if (!currentHunk) continue;

    if (line.startsWith("+") && !line.startsWith("+++")) {
      const addedLine = line.slice(1);
      currentHunk.lines.push(addedLine);
      if (addedLine.trim().length > 0) currentHunk.addedCount += 1;
      continue;
    }

    if (line.startsWith("-") && !line.startsWith("---")) {
      continue;
    }

    if (line.startsWith(" ")) {
      currentHunk.lines.push("");
    }
  }

  pushHunk(hunks, currentHunk);

  return hunks.map((hunk) => ({
    path: hunk.path,
    content: hunk.lines.join("\n"),
    start_line: hunk.startLine,
  }));
}
