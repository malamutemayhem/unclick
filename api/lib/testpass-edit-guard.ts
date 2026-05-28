export interface TestPassEditItemRow {
  id: string;
  run_id: string;
  check_id?: string | null;
  title?: string | null;
  verdict?: string | null;
}

export interface TestPassOverrideSignal {
  api_key_hash: string;
  tool: "testpass";
  action: "fail_to_pass_override";
  severity: "action_needed";
  summary: string;
  deep_link: string;
  payload: {
    source: "testpass_edit_item";
    anomaly: true;
    auto_merge_gate: "hold";
    run_id: string;
    item_id: string;
    check_id: string | null;
    title: string | null;
    previous_verdict: "fail";
    new_verdict: "check";
    actor_user_id: string;
    notes: string;
  };
}

export function isTestPassFailToPassOverride(previousVerdict: unknown, nextDbVerdict: string): boolean {
  return String(previousVerdict ?? "").toLowerCase() === "fail" && nextDbVerdict === "check";
}

export function buildTestPassFailToPassOverrideSignal(input: {
  apiKeyHash: string;
  actorUserId: string;
  runId: string;
  item: TestPassEditItemRow;
  notes: string;
}): TestPassOverrideSignal {
  return {
    api_key_hash: input.apiKeyHash,
    tool: "testpass",
    action: "fail_to_pass_override",
    severity: "action_needed",
    summary: `TestPass fail-to-pass override requested for run ${input.runId}.`,
    deep_link: `/admin/testpass/runs/${input.runId}`,
    payload: {
      source: "testpass_edit_item",
      anomaly: true,
      auto_merge_gate: "hold",
      run_id: input.runId,
      item_id: input.item.id,
      check_id: input.item.check_id ?? null,
      title: input.item.title ?? null,
      previous_verdict: "fail",
      new_verdict: "check",
      actor_user_id: input.actorUserId,
      notes: input.notes,
    },
  };
}
