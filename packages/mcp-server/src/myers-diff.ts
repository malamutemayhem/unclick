export interface DiffEdit {
  type: "equal" | "insert" | "delete";
  value: string;
  oldLine?: number;
  newLine?: number;
}

export function diff(a: string[], b: string[]): DiffEdit[] {
  const n = a.length;
  const m = b.length;
  const max = n + m;

  if (max === 0) return [];

  const vSize = 2 * max + 1;
  const v = new Array(vSize).fill(0);
  const trace: number[][] = [];

  for (let d = 0; d <= max; d++) {
    trace.push([...v]);
    for (let k = -d; k <= d; k += 2) {
      let x: number;
      if (k === -d || (k !== d && v[k - 1 + max] < v[k + 1 + max])) {
        x = v[k + 1 + max];
      } else {
        x = v[k - 1 + max] + 1;
      }
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x++;
        y++;
      }
      v[k + max] = x;
      if (x >= n && y >= m) {
        return backtrack(trace, a, b, max);
      }
    }
  }
  return backtrack(trace, a, b, max);
}

function backtrack(trace: number[][], a: string[], b: string[], max: number): DiffEdit[] {
  const edits: DiffEdit[] = [];
  let x = a.length;
  let y = b.length;

  for (let d = trace.length - 1; d >= 0; d--) {
    const v = trace[d];
    const k = x - y;
    let prevK: number;

    if (k === -d || (k !== d && v[k - 1 + max] < v[k + 1 + max])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }

    const prevX = v[prevK + max];
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      x--;
      y--;
      edits.unshift({ type: "equal", value: a[x], oldLine: x, newLine: y });
    }

    if (d > 0) {
      if (x === prevX) {
        edits.unshift({ type: "insert", value: b[prevY], newLine: prevY });
        y = prevY;
      } else {
        edits.unshift({ type: "delete", value: a[prevX], oldLine: prevX });
        x = prevX;
      }
    }
  }
  return edits;
}

export function diffLines(oldText: string, newText: string): DiffEdit[] {
  return diff(oldText.split("\n"), newText.split("\n"));
}

export function diffChars(oldText: string, newText: string): DiffEdit[] {
  return diff(oldText.split(""), newText.split(""));
}

export function unifiedDiff(
  oldText: string,
  newText: string,
  options: { context?: number; oldFile?: string; newFile?: string } = {}
): string {
  const context = options.context ?? 3;
  const oldFile = options.oldFile ?? "a";
  const newFile = options.newFile ?? "b";
  const edits = diffLines(oldText, newText);

  if (edits.every((e) => e.type === "equal")) return "";

  const lines: string[] = [];
  lines.push(`--- ${oldFile}`);
  lines.push(`+++ ${newFile}`);

  const hunks = buildHunks(edits, context);
  for (const hunk of hunks) {
    lines.push(hunk.header);
    lines.push(...hunk.lines);
  }

  return lines.join("\n");
}

interface Hunk {
  header: string;
  lines: string[];
}

function buildHunks(edits: DiffEdit[], context: number): Hunk[] {
  const hunks: Hunk[] = [];
  const changes: number[] = [];
  for (let i = 0; i < edits.length; i++) {
    if (edits[i].type !== "equal") changes.push(i);
  }
  if (changes.length === 0) return [];

  let hunkStart = Math.max(0, changes[0] - context);
  let groups: number[][] = [[]];

  for (const idx of changes) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup.length > 0 && idx - lastGroup[lastGroup.length - 1] > context * 2) {
      groups.push([idx]);
    } else {
      lastGroup.push(idx);
    }
  }

  for (const group of groups) {
    const start = Math.max(0, group[0] - context);
    const end = Math.min(edits.length, group[group.length - 1] + context + 1);

    let oldStart = 1;
    let newStart = 1;
    let oldCount = 0;
    let newCount = 0;
    const hunkLines: string[] = [];

    for (let i = 0; i < start; i++) {
      if (edits[i].type === "equal" || edits[i].type === "delete") oldStart++;
      if (edits[i].type === "equal" || edits[i].type === "insert") newStart++;
    }

    for (let i = start; i < end; i++) {
      const edit = edits[i];
      switch (edit.type) {
        case "equal":
          hunkLines.push(` ${edit.value}`);
          oldCount++;
          newCount++;
          break;
        case "delete":
          hunkLines.push(`-${edit.value}`);
          oldCount++;
          break;
        case "insert":
          hunkLines.push(`+${edit.value}`);
          newCount++;
          break;
      }
    }

    hunks.push({
      header: `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`,
      lines: hunkLines,
    });
  }

  return hunks;
}

export function applyPatch(original: string, edits: DiffEdit[]): string {
  const result: string[] = [];
  for (const edit of edits) {
    if (edit.type === "equal" || edit.type === "insert") {
      result.push(edit.value);
    }
  }
  return result.join("\n");
}

export function editDistance(a: string[], b: string[]): number {
  const edits = diff(a, b);
  return edits.filter((e) => e.type !== "equal").length;
}

export function lcs(a: string[], b: string[]): string[] {
  return diff(a, b).filter((e) => e.type === "equal").map((e) => e.value);
}
