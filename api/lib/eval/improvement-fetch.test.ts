import { describe, it, expect } from "vitest";
import {
  groupCommentsByTodo,
  rowsToAdapterInputs,
  type RawTodoRow,
  type RawCommentRow,
} from "./improvement-fetch.js";
import { scoreLiveJobs } from "./live-score.js";
import type { XPassReceiptSlice } from "../score-trace.js";

const NOW = Date.parse("2026-06-01T00:00:00.000Z");

const freshPass: XPassReceiptSlice = {
  kind: "xpass_receipt_v1",
  verdict: "pass",
  provenance: { head_sha: "h1" },
  staleness: { stale_checks: [], unscoped_checks: [], target_sha: "h1" },
};

describe("groupCommentsByTodo", () => {
  it("groups by target and infers PASS proof from text", () => {
    const grouped = groupCommentsByTodo([
      { target_id: "t1", author_agent_id: "rev", text: "PR #12 merged, checks green" },
      { target_id: "t1", author_agent_id: "x", text: "blocker: missing proof" },
      { target_id: "t2", author_agent_id: "y", text: "just chatting" },
    ]);
    expect(grouped.get("t1")?.[0].is_pass_proof).toBe(true);
    expect(grouped.get("t1")?.[1].is_pass_proof).toBe(false); // blocker negates
    expect(grouped.get("t2")?.[0].is_pass_proof).toBe(false);
  });

  it("honors an explicit is_pass_proof flag over inference", () => {
    const grouped = groupCommentsByTodo([
      { target_id: "t1", author_agent_id: "rev", text: "no proof keywords", is_pass_proof: true },
    ]);
    expect(grouped.get("t1")?.[0].is_pass_proof).toBe(true);
  });

  it("skips comments with no target", () => {
    const grouped = groupCommentsByTodo([{ target_id: null, author_agent_id: "x", text: "PR #1" }]);
    expect(grouped.size).toBe(0);
  });
});

describe("rowsToAdapterInputs -> scoreLiveJobs (end to end, pure)", () => {
  it("scores a verified job: done + independent PASS comment + fresh receipt", () => {
    const todos: RawTodoRow[] = [
      {
        id: "ok",
        status: "done",
        created_by_agent_id: "builder",
        assigned_to_agent_id: "builder",
        completed_at: new Date(NOW).toISOString(),
        updated_at: new Date(NOW).toISOString(),
        xpass_receipt: freshPass,
        current_head_sha: "h1",
        completion_code: "allowed",
      },
    ];
    const comments: RawCommentRow[] = [
      { target_id: "ok", author_agent_id: "reviewer", text: "tests passed, PR #9 merged" },
    ];
    const report = scoreLiveJobs(rowsToAdapterInputs(todos, comments, NOW));
    expect(report.summary.verified).toBe(1);
    expect(report.summary.falseGreen).toBe(0);
  });

  it("flags a false-green job: done but no proof comment and no receipt", () => {
    const todos: RawTodoRow[] = [
      {
        id: "fake",
        status: "done",
        created_by_agent_id: "builder",
        assigned_to_agent_id: "builder",
        completed_at: new Date(NOW).toISOString(),
        updated_at: new Date(NOW).toISOString(),
      },
    ];
    const report = scoreLiveJobs(rowsToAdapterInputs(todos, [], NOW));
    expect(report.falseGreenJobIds).toEqual(["fake"]);
  });

  it("detects stale ownership from an idle updated_at fallback", () => {
    const old = new Date(NOW - 48 * 60 * 60 * 1000).toISOString();
    const todos: RawTodoRow[] = [
      {
        id: "stuck",
        status: "in_progress",
        created_by_agent_id: "builder",
        assigned_to_agent_id: "builder",
        completed_at: null,
        updated_at: old, // becomes last_real_action_at fallback
      },
    ];
    const report = scoreLiveJobs(rowsToAdapterInputs(todos, [], NOW));
    expect(report.staleJobIds).toEqual(["stuck"]);
  });
});
