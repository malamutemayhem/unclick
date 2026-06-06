import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, it } from "node:test";

import {
  buildContinuousImprovementSignals,
  buildContinuousImprovementWatchReceipt,
} from "./pinballwake-continuous-improvement-watch.mjs";

const execFileAsync = promisify(execFile);

describe("PinballWake Continuous Improvement Watch", () => {
  it("stays quiet when no background signal crosses the threshold", () => {
    const receipt = buildContinuousImprovementWatchReceipt({
      now: "2026-05-29T00:00:00.000Z",
      input: { signals: [] },
    });

    assert.equal(receipt.status, "idle");
    assert.equal(receipt.result, "idle");
    assert.equal(receipt.signal_count, 0);
  });

  it("turns dirty PR state into a front-of-line improvement packet", () => {
    const receipt = buildContinuousImprovementWatchReceipt({
      now: "2026-05-29T00:00:00.000Z",
      input: {
        github_prs: [
          {
            number: 1083,
            title: "chore(deps): bump fast-xml-parser",
            mergeStateStatus: "DIRTY",
            updatedAt: "2026-05-28T00:00:00.000Z",
            url: "https://github.com/malamutemayhem/unclick/pull/1083",
            statusCheckRollup: [],
          },
        ],
      },
    });

    assert.equal(receipt.status, "action_needed");
    assert.equal(receipt.result, "front_of_line_build");
    assert.equal(receipt.improvement_kind, "merge_flow");
    assert.match(receipt.packet.chip, /Improve merge flow/);
    assert(receipt.xpass_gate_result.advisory.includes("CommonSensePass"));
  });

  it("routes failed proof to proof flow improvement", () => {
    const signals = buildContinuousImprovementSignals({
      now: "2026-05-29T00:00:00.000Z",
      githubPrs: [
        {
          number: 1151,
          title: "fix(testpass): wait for preview",
          mergeStateStatus: "CLEAN",
          updatedAt: "2026-05-28T23:00:00.000Z",
          statusCheckRollup: [
            { __typename: "CheckRun", name: "TestPass smoke run", status: "COMPLETED", conclusion: "FAILURE" },
          ],
        },
      ],
    });

    assert.equal(signals.length, 1);
    assert.equal(signals[0].type, "proof_failure");

    const receipt = buildContinuousImprovementWatchReceipt({
      now: "2026-05-29T00:00:00.000Z",
      input: { signals },
    });

    assert.equal(receipt.status, "action_needed");
    assert.equal(receipt.improvement_kind, "proof_flow");
  });

  it("holds duplicate-covered work instead of creating a new job", () => {
    const receipt = buildContinuousImprovementWatchReceipt({
      now: "2026-05-29T00:00:00.000Z",
      input: {
        signals: [
          {
            type: "merge_resistance",
            title: "PR #200 dirty again",
            detail: "merge flow is dirty and blocked",
            severity: "high",
            count: 3,
            coveredByOpenTodo: "todo-200",
          },
        ],
      },
    });

    assert.equal(receipt.status, "held");
    assert.equal(receipt.result, "hold");
    assert.equal(receipt.job, null);
    assert.equal(receipt.receipt.commonsensepass.verdict, "SUPPRESS");
  });

  it("CLI writes a public-safe receipt", async () => {
    const dir = path.join(process.cwd(), ".codex-tmp", "continuous-improvement-watch-test");
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
    const output = path.join(dir, "receipt.json");
    const input = JSON.stringify({
      signals: [
        {
          type: "stale_draft",
          title: "Draft waits on repeated manual nudge",
          detail: "waiting and missing proof",
          severity: "high",
          count: 2,
        },
      ],
    });

    try {
      await execFileAsync(process.execPath, [
        "scripts/pinballwake-continuous-improvement-watch.mjs",
        `--output=${output}`,
        "--now=2026-05-29T00:00:00.000Z",
      ], {
        cwd: process.cwd(),
        env: {
          ...process.env,
          CONTINUOUS_IMPROVEMENT_INPUT_JSON: input,
        },
      });

      const receipt = JSON.parse(await readFile(output, "utf8"));
      assert.equal(receipt.kind, "continuous_improvement_watch_receipt");
      assert.equal(receipt.status, "action_needed");
      assert.equal(receipt.packet.worker, "forge");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
