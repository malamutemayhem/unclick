import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildReliabilityDispatchRequest,
  wakeDispatchId,
} from "./event-wake-router.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(scriptDir, "event-wake-router.mjs");
const repoRoot = dirname(scriptDir);

describe("event wake router reliability dispatch", () => {
  it("creates stable dispatch IDs from wake event IDs", () => {
    const first = wakeDispatchId("wake-workflow_run-workflow-run-123-abc");
    const second = wakeDispatchId("wake-workflow_run-workflow-run-123-abc");

    assert.equal(first, second);
    assert.match(first, /^dispatch_[a-f0-9]{32}$/);
  });

  it("marks wake handoffs as ACK-required WakePass dispatches", () => {
    const request = buildReliabilityDispatchRequest({
      eventId: "wake-workflow_run-workflow-run-123-abc",
      decision: {
        owner: "🤖",
        reason: "PR checks completed green for TestPass PR Check on PR #310",
        urgency: "high",
      },
      triage: { used: false },
      result: { message_id: "msg-123" },
      event: {
        action: "completed",
        workflow_run: {
          id: 123,
          html_url: "https://github.com/acme/repo/actions/runs/123",
        },
      },
      ackSeconds: 600,
    });

    assert.equal(request.source, "wakepass");
    assert.equal(request.target_agent_id, "🤖");
    assert.equal(request.task_ref, "wake-workflow_run-workflow-run-123-abc");
    assert.equal(request.payload.ack_required, true);
    assert.equal(request.payload.handoff_message_id, "msg-123");
    assert.equal(request.payload.ack_fail_after_seconds, 600);
    assert.equal(request.payload.wake_owner, "🤖");
    assert.equal(request.payload.github_subject, "workflow-run-123");
  });

  it("defaults missed-ACK handoff leases to ten minutes", () => {
    const request = buildReliabilityDispatchRequest({
      eventId: "wake-workflow_run-workflow-run-456-def",
      decision: {
        owner: "🤖",
        reason: "PR checks completed green",
        urgency: "high",
      },
      triage: { used: false },
      result: { message_id: "msg-456" },
      event: { workflow_run: { id: 456 } },
    });

    assert.equal(request.time_bucket_seconds, 600);
    assert.equal(request.payload.ack_fail_after_seconds, 600);
  });

  it("runs the wake path in dry-run mode without crashing", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "wake-router-"));
    const eventPath = join(tempDir, "event.json");
    const ledgerDir = join(tempDir, "ledger");
    writeFileSync(
      eventPath,
      JSON.stringify({
        action: "completed",
        workflow_run: {
          id: 123,
          name: "TestPass PR Check",
          status: "completed",
          conclusion: "success",
          html_url: "https://github.com/acme/repo/actions/runs/123",
          created_at: "2026-04-30T14:00:00Z",
          updated_at: "2026-04-30T14:05:00Z",
          pull_requests: [{ number: 316 }],
        },
      }),
    );

    try {
      const result = spawnSync(process.execPath, [scriptPath], {
        cwd: repoRoot,
        env: {
          ...process.env,
          GITHUB_EVENT_NAME: "workflow_run",
          GITHUB_EVENT_PATH: eventPath,
          WAKE_LEDGER_DIR: ledgerDir,
          WAKE_ROUTER_DRY_RUN: "true",
        },
        encoding: "utf8",
      });

      assert.equal(result.status, 0, result.stderr || result.stdout);
      assert.match(result.stdout, /reliability_dispatch_dry_run/);
      assert.doesNotMatch(result.stderr, /ReferenceError/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
