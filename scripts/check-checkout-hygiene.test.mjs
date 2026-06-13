// scripts/check-checkout-hygiene.test.mjs

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  normalizePath,
  detectSyncRoot,
  parseRemotes,
  gatherExtraRoots,
  evaluateCheckoutHygiene,
  render,
  SYNC_ROOT_MARKERS,
} from "./check-checkout-hygiene.mjs";

describe("normalizePath", () => {
  test("lowercases and converts backslashes", () => {
    assert.equal(normalizePath("C:\\G\\UnClick\\Repos"), "c:/g/unclick/repos");
  });
  test("tolerates null", () => {
    assert.equal(normalizePath(null), "");
  });
});

describe("detectSyncRoot", () => {
  test("Windows Google Drive 'Other computers' backup path (the real C:\\G case)", () => {
    const p = "Z:\\Other computers\\My laptop\\G\\CV\\_unclick-drafts\\unclick";
    assert.equal(detectSyncRoot(p), "Google Drive (computers backup)");
  });
  test("Google Drive My Drive (macOS)", () => {
    assert.equal(
      detectSyncRoot("/Users/dev/Library/CloudStorage/GoogleDrive-x/My Drive/code/unclick"),
      "Google Drive",
    );
  });
  test("Google Drive shared shortcut", () => {
    assert.equal(
      detectSyncRoot("/Users/dev/Google Drive/.shortcut-targets-by-id/abc/unclick"),
      "Google Drive",
    );
  });
  test("OneDrive", () => {
    assert.equal(detectSyncRoot("C:\\Users\\dev\\OneDrive\\repos\\unclick"), "OneDrive");
  });
  test("OneDrive for Business", () => {
    assert.equal(detectSyncRoot("C:/Users/dev/OneDrive - Acme/repos/unclick"), "OneDrive");
  });
  test("Dropbox", () => {
    assert.equal(detectSyncRoot("/home/dev/Dropbox/unclick"), "Dropbox");
  });
  test("iCloud Drive", () => {
    assert.equal(
      detectSyncRoot("/Users/dev/Library/Mobile Documents/com~apple~CloudDocs/unclick"),
      "iCloud Drive",
    );
  });
  test("pCloud", () => {
    assert.equal(detectSyncRoot("/home/dev/pCloudDrive/unclick"), "pCloud");
  });
  test("safe non-synced path returns null", () => {
    assert.equal(detectSyncRoot("/home/dev/src/unclick"), null);
    assert.equal(detectSyncRoot("C:\\src\\unclick"), null);
  });
  test("matches when path begins with the marker (no leading slash)", () => {
    assert.equal(detectSyncRoot("Dropbox/unclick"), "Dropbox");
  });
  test("custom extra root matches a bare drive prefix", () => {
    assert.equal(
      detectSyncRoot("C:\\G\\UnClick\\repos\\unclick", ["C:\\G"]),
      "custom sync root",
    );
  });
  test("custom extra root does not false-positive elsewhere", () => {
    assert.equal(detectSyncRoot("C:\\src\\unclick", ["C:\\G"]), null);
  });
  test("every marker is well formed", () => {
    for (const m of SYNC_ROOT_MARKERS) {
      assert.ok(m.provider && m.pattern, `marker missing fields: ${JSON.stringify(m)}`);
      assert.equal(m.pattern, m.pattern.toLowerCase(), "patterns must be lowercase");
    }
  });
});

describe("gatherExtraRoots", () => {
  test("merges cli roots and env (comma/semicolon)", () => {
    const roots = gatherExtraRoots({
      cliRoots: ["C:\\G"],
      env: { UNCLICK_EXTRA_SYNC_ROOTS: "Z:\\Other computers; D:\\Sync" },
    });
    assert.deepEqual(roots, ["C:\\G", "Z:\\Other computers", "D:\\Sync"]);
  });
  test("empty env yields just cli roots", () => {
    assert.deepEqual(gatherExtraRoots({ cliRoots: ["C:\\G"], env: {} }), ["C:\\G"]);
  });
});

describe("parseRemotes", () => {
  test("dedupes fetch/push lines into { name, url }", () => {
    const text = [
      "origin\thttps://github.com/malamutemayhem/unclick (fetch)",
      "origin\thttps://github.com/malamutemayhem/unclick (push)",
    ].join("\n");
    assert.deepEqual(parseRemotes(text), [
      { name: "origin", url: "https://github.com/malamutemayhem/unclick" },
    ]);
  });
  test("empty input yields empty list", () => {
    assert.deepEqual(parseRemotes(""), []);
  });
  test("captures multiple remotes", () => {
    const text = [
      "origin\thttps://github.com/x/y (fetch)",
      "upstream\thttps://github.com/a/b (fetch)",
    ].join("\n");
    const names = parseRemotes(text).map((r) => r.name);
    assert.deepEqual(names, ["origin", "upstream"]);
  });
});

describe("evaluateCheckoutHygiene", () => {
  const origin = [{ name: "origin", url: "https://github.com/malamutemayhem/unclick" }];

  test("safe checkout: non-synced path with origin", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "/home/dev/src/unclick",
      gitDir: "/home/dev/src/unclick/.git",
      remotes: origin,
    });
    assert.equal(r.ok, true);
    assert.equal(r.level, "safe");
    assert.deepEqual(r.findings, []);
  });

  test("working tree under sync root flags DRIVE-SYNC-001", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "C:/Users/dev/Dropbox/unclick",
      gitDir: "C:/Users/dev/Dropbox/unclick/.git",
      remotes: origin,
    });
    // .git is also under the sync root here, so the worse 002 fires.
    assert.equal(r.ok, false);
    assert.ok(r.findings.some((f) => f.code === "DRIVE-SYNC-002"));
  });

  test("only working tree (not .git) under sync root flags 001 not 002", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "C:/Users/dev/Dropbox/unclick",
      gitDir: "/home/dev/.gitdirs/unclick.git",
      remotes: origin,
    });
    const codes = r.findings.map((f) => f.code);
    assert.ok(codes.includes("DRIVE-SYNC-001"));
    assert.ok(!codes.includes("DRIVE-SYNC-002"));
  });

  test("orphan clone with no remotes flags ORPHAN-CLONE-001 (high)", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "/home/dev/src/unclick",
      gitDir: "/home/dev/src/unclick/.git",
      remotes: [],
    });
    const orphan = r.findings.find((f) => f.code === "ORPHAN-CLONE-001");
    assert.ok(orphan);
    assert.equal(orphan.severity, "high");
  });

  test("remotes present but no origin flags ORPHAN-CLONE-001 (medium)", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "/home/dev/src/unclick",
      gitDir: "/home/dev/src/unclick/.git",
      remotes: [{ name: "upstream", url: "https://github.com/a/b" }],
    });
    const orphan = r.findings.find((f) => f.code === "ORPHAN-CLONE-001");
    assert.ok(orphan);
    assert.equal(orphan.severity, "medium");
  });

  test("combined: synced .git AND no origin reports two findings", () => {
    const r = evaluateCheckoutHygiene({
      checkoutPath: "Z:/Other computers/My laptop/G/unclick",
      gitDir: "Z:/Other computers/My laptop/G/unclick/.git",
      remotes: [],
    });
    const codes = r.findings.map((f) => f.code).sort();
    assert.deepEqual(codes, ["DRIVE-SYNC-002", "ORPHAN-CLONE-001"]);
  });
});

describe("render", () => {
  test("renders OK line when safe", () => {
    const out = render({ ok: true, level: "safe", findings: [] });
    assert.match(out, /Checkout hygiene OK/);
  });
  test("renders findings and runbook pointers when warning", () => {
    const out = render({
      ok: false,
      level: "warn",
      findings: [{ code: "DRIVE-SYNC-001", severity: "medium", message: "tree under Dropbox" }],
    });
    assert.match(out, /DRIVE-SYNC-001/);
    assert.match(out, /worktree-salvage-runbook\.md/);
  });
});
