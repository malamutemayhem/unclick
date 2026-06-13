// Parallel-build guard: machine-detectable checks for the recurring frictions
// the XGate 10-builder run exposed (see docs/xgate-build-retro.md).
//
// Three pure checks any fleet integration step or the completion policy can call:
//   - requireTestFloor       : new logic files must have a co-located test (gap #2)
//   - checkPrScope           : changed files must stay in the declared scope,
//                              dogfooding the XGate ScopeGate idea (gap #3)
//   - detectDuplicatePaths   : the same new path created by >1 parallel branch (gap #5)
//
// Pure: no IO, no git, no network. Callers supply the file lists (from git diff
// or a PR API). This keeps the logic unit-testable and reusable.

// ---------------------------------------------------------------------------
// Shared path helpers (mirror the XGate ScopeGate normalization so behaviour
// matches the gate UnClick already ships).
// ---------------------------------------------------------------------------

function normalizePath(input: string): string {
  const slash = input.replace(/\\/g, "/").trim();
  const noLead = slash.replace(/^\.\/+/, "").replace(/^\/+/, "");
  const noTrail = noLead.length > 1 && noLead.endsWith("/") ? noLead.slice(0, -1) : noLead;
  return noTrail;
}

// ---------------------------------------------------------------------------
// 1. Test floor: a new logic file must ship with a co-located test.
// ---------------------------------------------------------------------------

export interface TestFloorResult {
  ok: boolean;
  /** Logic files added with no co-located *.test.* sibling. */
  missingTests: string[];
  /** Logic files that did have a test (for reporting). */
  covered: string[];
}

const LOGIC_ROOTS = ["api/", "src/", "packages/", "apps/"];
const TEST_RE = /\.(test|spec)\.(ts|tsx|js|jsx|mjs)$/;
const CODE_RE = /\.(ts|tsx|js|jsx|mjs)$/;

/** Files that carry no testable logic and are exempt from the floor. */
function isExempt(p: string): boolean {
  if (TEST_RE.test(p)) return true;
  const base = p.split("/").pop() ?? p;
  if (/\.d\.ts$/.test(p)) return true;
  if (/\.(config|setup)\.(ts|js|mjs)$/.test(base)) return true;
  if (/(^|\/)(types|index|schema|constants|fixtures)\.tsx?$/.test(p)) return true;
  if (p.includes(".generated.")) return true;
  if (/\.(json|md|sql|css|yaml|yml|svg|png|jpg)$/.test(p)) return true;
  // React pages/components are logic, but pure type/style files above are not.
  return false;
}

function isLogicFile(p: string): boolean {
  const n = normalizePath(p);
  if (!CODE_RE.test(n)) return false;
  if (!LOGIC_ROOTS.some((r) => n.startsWith(r))) return false;
  return !isExempt(n);
}

/** A logic file's expected co-located test paths (same dir, same base). */
function expectedTestPaths(logicPath: string): string[] {
  const n = normalizePath(logicPath);
  const stem = n.replace(CODE_RE, "");
  return ["test", "spec"].flatMap((kind) =>
    ["ts", "tsx", "js", "jsx", "mjs"].map((ext) => `${stem}.${kind}.${ext}`),
  );
}

/**
 * Flag new logic files that shipped without a co-located test. `changedFiles`
 * is the full set of added/modified paths (e.g. from `git diff --name-only`);
 * the test can live in the same changeset.
 */
export function requireTestFloor(changedFiles: string[]): TestFloorResult {
  const all = new Set(changedFiles.map(normalizePath));
  const missingTests: string[] = [];
  const covered: string[] = [];

  for (const raw of changedFiles) {
    const p = normalizePath(raw);
    if (!isLogicFile(p)) continue;
    const hasTest = expectedTestPaths(p).some((t) => all.has(t));
    if (hasTest) covered.push(p);
    else missingTests.push(p);
  }

  return { ok: missingTests.length === 0, missingTests, covered };
}

// ---------------------------------------------------------------------------
// 2. PR scope: changed files must stay inside the declared owned globs.
//    Dogfoods the XGate ScopeGate at PR granularity.
// ---------------------------------------------------------------------------

export interface PrScopeResult {
  ok: boolean;
  /** Changed files outside every owned glob. */
  outOfScope: string[];
}

/** Minimal glob match: supports `*` (within a segment) and `**` (any depth). */
function globToRegExp(glob: string): RegExp {
  const g = normalizePath(glob);
  let re = "^";
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === "*") {
      if (g[i + 1] === "*") {
        re += ".*";
        i++;
        if (g[i + 1] === "/") i++; // consume trailing slash of **/
      } else {
        re += "[^/]*";
      }
    } else if ("\\^$.|?+()[]{}".includes(c)) {
      re += "\\" + c;
    } else {
      re += c;
    }
  }
  re += "$";
  return new RegExp(re);
}

/**
 * Check that every changed file matches at least one owned glob. A directory
 * prefix (ending in `/`) is treated as `prefix/**`. Empty ownedGlobs => every
 * file is out of scope (fail closed), matching XGate's deny-by-default stance.
 */
export function checkPrScope(changedFiles: string[], ownedGlobs: string[]): PrScopeResult {
  const matchers = ownedGlobs.map((g) => {
    // Detect directory intent on the RAW glob: normalizePath strips the trailing
    // slash, so check it before normalizing. A directory prefix means prefix/**.
    const isDir = g.replace(/\\/g, "/").trim().endsWith("/");
    const n = normalizePath(g);
    return globToRegExp(isDir ? `${n}/**` : n);
  });
  const outOfScope: string[] = [];
  for (const raw of changedFiles) {
    const p = normalizePath(raw);
    if (!matchers.some((m) => m.test(p))) outOfScope.push(p);
  }
  return { ok: outOfScope.length === 0, outOfScope };
}

// ---------------------------------------------------------------------------
// 3. Duplicate paths: the same new path created by more than one branch.
// ---------------------------------------------------------------------------

export interface BranchFiles {
  branch: string;
  /** New paths this branch adds (e.g. `git diff --name-only --diff-filter=A`). */
  addedFiles: string[];
}

export interface DuplicatePathResult {
  ok: boolean;
  /** path -> the branches that each created it. */
  collisions: Array<{ path: string; branches: string[] }>;
}

/** Report any new path created by more than one parallel branch. */
export function detectDuplicatePaths(branches: BranchFiles[]): DuplicatePathResult {
  const byPath = new Map<string, Set<string>>();
  for (const b of branches) {
    for (const raw of b.addedFiles) {
      const p = normalizePath(raw);
      const set = byPath.get(p) ?? new Set<string>();
      set.add(b.branch);
      byPath.set(p, set);
    }
  }
  const collisions: Array<{ path: string; branches: string[] }> = [];
  for (const [path, branchSet] of byPath) {
    if (branchSet.size > 1) collisions.push({ path, branches: [...branchSet].sort() });
  }
  collisions.sort((a, b) => a.path.localeCompare(b.path));
  return { ok: collisions.length === 0, collisions };
}
