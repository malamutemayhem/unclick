// scripts/salvage-worktrees.test.mjs

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  sanitizeBranchSegment,
  pad2,
  nowStamp,
  summarizeStatus,
  classifyWorktree,
  buildSalvagePlan,
  assertNonDestructive,
  renderPlanMarkdown,
  DESTRUCTIVE_TOKENS,
} from "./salvage-worktrees.mjs";

describe("sanitizeBranchSegment", () => {
  test("flattens slashes to dashes (matches the proven safety-branch naming)", () => {
    assert.equal(
      sanitizeBranchSegment("codex/queuepush-walkin-routing-labels"),
      "codex-queuepush-walkin-routing-labels",
    );
  });
  test("strips ref-unsafe characters", () => {
    assert.equal(sanitizeBranchSegment("feat/foo~bar^baz:qux?"), "feat-foo-bar-baz-qux");
  });
  test("falls back to 'detached' for empty input", () => {
    assert.equal(sanitizeBranchSegment(""), "detached");
    assert.equal(sanitizeBranchSegment(null), "detached");
  });
});

describe("pad2 / nowStamp", () => {
  test("pad2 zero-pads", () => {
    assert.equal(pad2(1), "01");
    assert.equal(pad2(12), "12");
  });
  test("nowStamp formats YYYYMMDD-HHMMSS in UTC", () => {
    const d = new Date(Date.UTC(2026, 4, 29, 10, 2, 5)); // 2026-05-29 10:02:05Z
    assert.equal(nowStamp(d), "20260529-100205");
  });
});

describe("summarizeStatus", () => {
  test("counts tracked vs untracked", () => {
    const text = [" M src/a.ts", "A  src/b.ts", " D src/c.ts", "R  old -> new", "?? junk.tmp"].join("\n");
    const c = summarizeStatus(text);
    assert.equal(c.total, 5);
    assert.equal(c.untracked, 1);
    assert.equal(c.dirty, 4);
    assert.equal(c.deleted, 1);
    assert.equal(c.renamed, 1);
    assert.equal(c.added, 1);
  });
  test("empty status is fully clean", () => {
    const c = summarizeStatus("");
    assert.equal(c.total, 0);
    assert.equal(c.dirty, 0);
  });
});

describe("classifyWorktree", () => {
  test("clean checkout on a pushed branch is not at risk", () => {
    const r = classifyWorktree({
      path: "/repos/clean",
      branch: "main",
      detached: false,
      upstream: "origin/main",
      ahead: 0,
      status: summarizeStatus(""),
      stashCount: 0,
      onRemote: true,
    });
    assert.equal(r.atRisk, false);
    assert.equal(r.state, "clean");
  });

  test("uncommitted changes mark dirty + at risk", () => {
    const r = classifyWorktree({
      path: "/repos/dirty",
      branch: "codex/queuepush-walkin-routing-labels",
      detached: false,
      upstream: null,
      ahead: 0,
      status: summarizeStatus(" M a.ts\n?? b.tmp"),
      stashCount: 0,
      onRemote: true,
    });
    assert.equal(r.atRisk, true);
    assert.equal(r.state, "dirty");
    assert.match(r.reasons.join(" "), /uncommitted/);
  });

  test("ahead of upstream marks unpushed", () => {
    const r = classifyWorktree({
      path: "/repos/ahead",
      branch: "feat/x",
      detached: false,
      upstream: "origin/feat/x",
      ahead: 3,
      status: summarizeStatus(""),
      stashCount: 0,
      onRemote: true,
    });
    assert.equal(r.state, "unpushed");
    assert.equal(r.atRisk, true);
  });

  test("branch with no upstream and not on any remote is unpushed", () => {
    const r = classifyWorktree({
      path: "/repos/local-only",
      branch: "scratch/autopilot-closer-routing",
      detached: false,
      upstream: null,
      ahead: 0,
      status: summarizeStatus(""),
      stashCount: 0,
      onRemote: false,
    });
    assert.equal(r.state, "unpushed");
    assert.equal(r.atRisk, true);
  });

  test("detached HEAD is at risk", () => {
    const r = classifyWorktree({
      path: "/repos/detached",
      branch: "",
      detached: true,
      upstream: null,
      ahead: 0,
      status: summarizeStatus(""),
      stashCount: 0,
      onRemote: true,
    });
    assert.equal(r.state, "detached");
    assert.equal(r.atRisk, true);
  });

  test("stash-only checkout is at risk", () => {
    const r = classifyWorktree({
      path: "/repos/stash",
      branch: "main",
      detached: false,
      upstream: "origin/main",
      ahead: 0,
      status: summarizeStatus(""),
      stashCount: 2,
      onRemote: true,
    });
    assert.equal(r.state, "stash-only");
    assert.equal(r.atRisk, true);
  });
});

describe("buildSalvagePlan", () => {
  const inventory = [
    classifyWorktree({
      path: "C:/G/UnClick/repos/unclick-agent-native-endpoints",
      branch: "codex/queuepush-walkin-routing-labels",
      detached: false,
      upstream: null,
      ahead: 0,
      status: summarizeStatus(" M a.ts\n?? b.tmp"),
      stashCount: 0,
      onRemote: true,
    }),
    classifyWorktree({
      path: "C:/G/UnClick/repos/clean-one",
      branch: "main",
      detached: false,
      upstream: "origin/main",
      ahead: 0,
      status: summarizeStatus(""),
      stashCount: 0,
      onRemote: true,
    }),
  ];

  test("only at-risk worktrees get preserve items; clean ones are listed", () => {
    const plan = buildSalvagePlan(inventory, { timestamp: "20260602-101112", outDir: "./out" });
    assert.equal(plan.atRiskCount, 1);
    assert.equal(plan.cleanCount, 1);
    assert.equal(plan.items.length, 1);
    assert.equal(plan.items[0].branchName, "safety/local-sync-20260602-101112/01-codex-queuepush-walkin-routing-labels");
  });

  test("each item pushes to a safety branch and writes a bundle", () => {
    const plan = buildSalvagePlan(inventory, { timestamp: "20260602-101112", outDir: "./out" });
    const cmds = plan.items[0].commands.join("\n");
    assert.match(cmds, /bundle create/);
    assert.match(cmds, /push origin "HEAD:refs\/heads\/safety\/local-sync-/);
    assert.match(cmds, /ls-files --others --exclude-standard/);
  });

  test("plan contains zero destructive commands", () => {
    const plan = buildSalvagePlan(inventory, { timestamp: "20260602-101112", outDir: "./out" });
    // Should not throw.
    assert.equal(assertNonDestructive(plan), true);
    const all = plan.items.flatMap((i) => i.commands).join("\n").toLowerCase();
    for (const tok of DESTRUCTIVE_TOKENS) {
      assert.ok(!all.includes(tok), `plan unexpectedly contains destructive token: ${tok}`);
    }
  });

  test("empty inventory yields an empty, valid plan", () => {
    const plan = buildSalvagePlan([], { timestamp: "20260602-101112" });
    assert.equal(plan.atRiskCount, 0);
    assert.equal(plan.items.length, 0);
  });

  test("a worktree path containing a destructive word does not trip the guard", () => {
    const dirty = classifyWorktree({
      path: "C:/G/UnClick/repos/reset-clean-merge-checkout",
      branch: "feat/restore-nav",
      detached: false,
      upstream: null,
      ahead: 0,
      status: summarizeStatus(" M a.ts"),
      stashCount: 0,
      onRemote: true,
    });
    // Should not throw even though the path and branch contain reset/clean/merge/restore.
    const plan = buildSalvagePlan([dirty], { timestamp: "20260602-101112", outDir: "./out" });
    assert.equal(plan.items.length, 1);
    assert.equal(assertNonDestructive(plan), true);
  });
});

describe("assertNonDestructive", () => {
  test("throws if a destructive command is injected", () => {
    const bad = { items: [{ commands: ['git -C "x" reset --hard origin/main'] }] };
    assert.throws(() => assertNonDestructive(bad), /destructive/i);
  });
});

describe("renderPlanMarkdown", () => {
  test("renders namespace and safety branch", () => {
    const plan = buildSalvagePlan(
      buildSalvagePlan([], {}).items.length ? [] : [
        classifyWorktree({
          path: "/repos/dirty",
          branch: "feat/x",
          detached: false,
          upstream: null,
          ahead: 1,
          status: summarizeStatus(" M a.ts"),
          stashCount: 0,
          onRemote: true,
        }),
      ],
      { timestamp: "20260602-101112", outDir: "./out" },
    );
    const md = renderPlanMarkdown(plan);
    assert.match(md, /Worktree salvage plan 20260602-101112/);
    assert.match(md, /safety\/local-sync-20260602-101112/);
  });

  test("empty plan says nothing to preserve", () => {
    const md = renderPlanMarkdown(buildSalvagePlan([], { timestamp: "x" }));
    assert.match(md, /No at-risk worktrees/);
  });
});
