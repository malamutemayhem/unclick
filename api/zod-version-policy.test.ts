import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

// Dependency migration guard for the planned, NOT-auto-bump zod v3 -> v4 move.
//
// The repo intentionally runs a split: packages/mcp-server is on zod v4 (its
// MCP tool schemas were ported), while every other workspace stays on zod v3.
// A blind Dependabot bump of any v3 workspace to v4 would change validation
// semantics under it. This test pins the documented split so such a bump trips
// CI with a pointer to the migration plan instead of merging silently.
//
// When the real migration happens, update docs/zod-v4-migration-decision.md and
// move the upgraded workspace into V4_WORKSPACES below in the same PR.

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// The one workspace deliberately on zod v4 today.
const V4_WORKSPACES = new Set(["packages/mcp-server"]);

function majorFromRange(range: string): number | null {
  const match = String(range).match(/(\d+)\./);
  return match ? Number(match[1]) : null;
}

function zodRange(pkg: Record<string, unknown>): string | null {
  const deps = (pkg.dependencies as Record<string, string> | undefined) ?? {};
  const dev = (pkg.devDependencies as Record<string, string> | undefined) ?? {};
  return deps.zod ?? dev.zod ?? null;
}

/** Workspace package.json locations: root + packages/* + apps/*. */
function collectWorkspacePackageJsons(): Array<{ rel: string; pkg: Record<string, unknown> }> {
  const out: Array<{ rel: string; pkg: Record<string, unknown> }> = [];
  const add = (rel: string) => {
    const abs = join(REPO_ROOT, rel, "package.json");
    if (existsSync(abs)) {
      out.push({ rel, pkg: JSON.parse(readFileSync(abs, "utf8")) });
    }
  };

  add(".");
  for (const group of ["packages", "apps"]) {
    const groupDir = join(REPO_ROOT, group);
    if (!existsSync(groupDir)) continue;
    for (const entry of readdirSync(groupDir, { withFileTypes: true })) {
      if (entry.isDirectory()) add(`${group}/${entry.name}`);
    }
  }
  return out;
}

describe("zod version policy (planned v3 -> v4 migration guard)", () => {
  const workspaces = collectWorkspacePackageJsons().filter(({ pkg }) => zodRange(pkg) !== null);

  it("finds the documented split: at least one v3 island and one v4 island", () => {
    const majors = new Set(
      workspaces.map(({ pkg }) => majorFromRange(zodRange(pkg) as string)).filter((m): m is number => m !== null),
    );
    expect(majors.has(3)).toBe(true);
    expect(majors.has(4)).toBe(true);
  });

  it("keeps packages/mcp-server on zod v4", () => {
    const mcp = workspaces.find(({ rel }) => rel === "packages/mcp-server");
    expect(mcp, "packages/mcp-server should declare zod").toBeTruthy();
    expect(majorFromRange(zodRange(mcp!.pkg) as string)).toBe(4);
  });

  it("keeps every other workspace on zod v3 until the migration ships", () => {
    const offenders = workspaces
      .filter(({ rel }) => !V4_WORKSPACES.has(rel))
      .map(({ rel, pkg }) => ({ rel, major: majorFromRange(zodRange(pkg) as string) }))
      .filter(({ major }) => major !== 3);

    expect(
      offenders,
      `Unexpected zod major outside the v4 island. If this is the planned migration, update ` +
        `docs/zod-v4-migration-decision.md and add the workspace to V4_WORKSPACES in the same PR. ` +
        `Offenders: ${JSON.stringify(offenders)}`,
    ).toEqual([]);
  });
});
